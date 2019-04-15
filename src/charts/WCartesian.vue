<script>
import VueTypes from 'vue-types'
import { scaleLinear } from 'd3'
import { pick, includes, debounce } from 'lodash'
import { Slots } from '../utils'

export default {
    name: 'WCartesian',
    props: {
        dataset: VueTypes.array.def([]),
        responsive: VueTypes.bool.def(false),
        height: VueTypes.number.def(400),
        width: VueTypes.number.def(600),
        bound: VueTypes.array.def([]),
        gap: VueTypes.oneOfType([
            VueTypes.number,
            VueTypes.arrayOf(VueTypes.number).def([0, 0, 0, 0]),
        ]).def(0),
        colors: VueTypes.array.def([
            '#3fb1e3',
            '#6be6c1',
            '#626c91',
            '#a0a7e6',
            '#c4ebad',
            '#96dee8',
        ]),
    },
    provide () {
        return {
            Cartesian: this,
        }
    },
    data () {
        return {
            chartReady: !this.responsive,
            datakeys: [],
            activeCartesians: [],
            legends: [],
            activePoint: {
                cartesianIndex: null,
                pointIndex: null,
            },
            space: [0, 0, 0, 0],
            parentWidth: null,
        }
    },
    computed: {
        yScale () {
            return scaleLinear()
                .domain([this.bounds.min, this.bounds.max])
                .range([this.canvas.y1 - this.padding[2], this.canvas.y0 + this.padding[0]])
        },
        xScale () {
            return scaleLinear()
                .domain([0, this.dataset.length - 1])
                .range([this.canvas.x0 + this.padding[3], this.canvas.x1 - this.padding[1]])
        },
        bounds () {
            if (this.datakeys.length) {
                const [boundMin, boundMax] = this.bound
                return {
                    min: this.getBound(boundMin),
                    max: this.getBound(boundMax, 'max'),
                }
            }

            return {
                max: 0,
                min: 0,
            }
        },
        viewWidth () {
            return this.parentWidth || this.width
        },
        canvas () {
            const { viewWidth, height, space: margin } = this
            const x0 = margin[3]
            const y0 = margin[0]
            const y1 = height - margin[2]
            const x1 = viewWidth - margin[1]

            return {
                x0,
                y0,
                width: x1 - x0,
                height: y1 - y0,
                x1,
                y1,
            }
        },
        padding () {
            if (Array.isArray(this.gap)) return this.gap
            return Array(4).fill(this.gap)
        },
    },

    mounted () {
        if (this.responsive) {
            this.resize()
            if (typeof window !== 'undefined') {
                window.addEventListener('resize', debounce(this.resize, 220))
            }
        }
    },
    unmounted () {
        if (this.responsive && typeof window !== 'undefined') window.removeEventListener('resize')
    },
    methods: {
        activatePoint ({ cartesianIndex = null, pointIndex = null }, event) {
            this.activePoint = {
                cartesianIndex,
                pointIndex,
                event,
            }
        },
        addSpace (space = []) {
            space.forEach((val, i) => {
                this.space[i] = Math.max(val, this.space[i] || 0)
            })
        },
        resize () {
            if (this.$el) {
                const { width } = this.$el.getBoundingClientRect()
                this.parentWidth = width
            }
            this.setChartReady()
        },
        getBound (val, type = 'min') {
            if (typeof val === 'number') return val

            const isMin = type === 'min'
            const values = this.dataset.reduce((acc, d) => {
                const picked = pick(d, this.datakeys)
                return [...acc, ...Object.values(picked)]
            }, [])

            const result = isMin ? Math.min(...values) : Math.max(...values)
            if (typeof val === 'function') return val(result)

            return result
        },
        setChartReady () {
            this.chartReady = true
            this.$emit('onChartReady')
        },
    },
    render (h) {
        const slots = this.$slots.default || []
        const datakeys = [] // We need get slots datakey prop to calculate max and min values for the scales
        const cartesians = [] // We need inject necessary props to cartesian slots
        const others = []
        const axis = []
        const plugins = []

        // Props
        const activeCartesians = []
        const legends = []

        slots.forEach((slot) => {
            const options = slot.componentOptions
            if (!options) {
                others.push(slot)
                return
            }
            const sealed = options.Ctor.sealedOptions
            if (!sealed) {
                return
            }
            const { datakey, legend } = options.propsData
            const cartesiansLength = cartesians.length

            switch (sealed.type) {
                case 'cartesian':
                    if (datakey && !includes(datakeys, datakey)) {
                        datakeys.push(datakey)
                    }
                    activeCartesians.push(cartesiansLength) // Add to actives elements
                    if (legend) legends.push(legend) // Add to legends elements
                    slot.index = cartesiansLength
                    cartesians.push(slot)
                    break
                case 'axis':
                    this.addSpace(Slots.props(options, 'space'))
                    axis.push(slot)
                    break
                case 'plugins':
                    plugins.push(slot)
                    break
                default:
                    break
            }
        })

        const { viewWidth, height, responsive } = this
        this.datakeys = datakeys
        this.activeCartesians = activeCartesians
        this.legends = legends
        return h(
            'div',
            {
                class: 'WCartesian',
                style: {
                    position: 'relative',
                    width: responsive ? '100%' : `${viewWidth}px`,
                },
            },
            [
                h(
                    'svg',
                    {
                        attrs: {
                            width: viewWidth,
                            height,
                            viewBox: `0 0 ${viewWidth} ${height}`,
                        },
                    },
                    this.chartReady ? [others, cartesians, axis] : []
                ),
                this.chartReady ? plugins : [],
            ]
        )
    },
}
</script>
