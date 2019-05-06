<script>
import VueTypes from 'vue-types'
import { scaleLinear } from 'd3'
import stack from 'd3-shape/src/stack'
import stackOffsetDiverging from 'd3-shape/src/offset/diverging'
import { debounce, noop } from 'lodash'
import { bound } from '../utils/maths'

import activeMixin from '../mixins/active'

export default {
    name: 'WCartesian',
    mixins: [activeMixin],
    props: {
        dataset: VueTypes.array.def([]),
        responsive: VueTypes.bool.def(false),
        stacked: VueTypes.bool.def(false),
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
            axisXDatakey: null, // Datakey name of Xaxis
            datakeys: [], // dataKeys Selected data
            activeCartesians: [], // Cartesian elem actives
            legends: [], // Legends
            space: [0, 0, 0, 0], // Spaces all elements
            spaceObjects: [0, 0, 0, 0], // Spaces of objects (Axis)
            parentWidth: null, // Width of chart
        }
    },
    computed: {
        // yScale with scaleLinear of d3
        // ref: https://github.com/d3/d3-scale#_continuous
        yScale () {
            return scaleLinear()
                .domain([this.bounds.min, this.bounds.max])
                .range([this.canvas.y1 - this.padding[2], this.canvas.y0 + this.padding[0]])
        },
        // xScale with scaleLinear of d3
        // ref: https://github.com/d3/d3-scale#_continuous
        xScale () {
            return scaleLinear()
                .domain([0, this.dataset.length - 1])
                .range([this.canvas.x0 + this.padding[3], this.canvas.x1 - this.padding[1]])
        },
        // Bounds
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
        // View size, include canvas and paddings/margins
        viewWidth () {
            return this.parentWidth || this.width
        },
        // Canvas size
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
        // Generate padding by array or number.
        // return [10, 10, 10, 10]
        padding () {
            const gap = Array.isArray(this.gap) ? this.gap : Array(4).fill(this.gap)
            return gap.map((item, index) => item + this.offset[index])
        },
        // Offset of bars
        // return [10, 10, 10, 10]
        offset () {
            const { barAllWidth, barMap } = this.snap
            const barsLength = (barMap || []).length
            const gap = Array(4).fill(0)

            if (barsLength) {
                // Checked if width of bars it is higher than canvas width
                const margin = this.width <= barAllWidth * (this.dataset || []).length
                    ? this.width % barAllWidth
                    : barAllWidth

                gap[1] = margin
                gap[3] = margin
                return gap
            }
            return gap
        },
        // Return stacked data or data dataset without transform, of datakeys and dataset props
        // ref: https://github.com/d3/d3-shape#stacks
        curData () {
            return stack()
                .keys(this.datakeys)
                .offset(this.stacked ? stackOffsetDiverging : noop)(this.dataset)
        },
    },
    mounted () {
        // Added listenner if has response prop to true
        if (this.responsive) {
            this.resize()
            if (typeof window !== 'undefined') {
                window.addEventListener('resize', debounce(this.resize, 220))
            }
        }
    },
    unmounted () {
        // Remove listenner response
        if (this.responsive && typeof window !== 'undefined') window.removeEventListener('resize')
    },
    methods: {
        // Add spaces
        addSpace (space = []) {
            space.forEach((val, i) => {
                this.space[i] = Math.max(val, this.space[i] || 0)
            })
        },
        // Add spaces of objects els
        addSpaceObjects (space = []) {
            this.addSpace(space)
            space.forEach((val, i) => {
                this.spaceObjects[i] = Math.max(val, this.spaceObjects[i] || 0)
            })
        },
        // Resize chart on event emited
        resize () {
            if (this.$el) {
                const { width } = this.$el.getBoundingClientRect()
                this.parentWidth = width
            }
            this.setChartReady()
        },
        // Calc min/max bound values
        getBound (val, type = 'min') {
            if (typeof val === 'number') return val

            const isMin = type === 'min'
            let result = bound(this.curData, type, isMin ? 0 : 1)

            if (isMin && result === 0) {
                result = bound(this.curData, 'min', 1)
            }
            if (typeof val === 'function') return val(result)

            return result
        },
        // Set and emit chartReady
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

        // Reset snap to manage bars
        this.snap = {}

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
            const { propsData } = options
            const { datakey, legend } = propsData
            const cartesiansLength = cartesians.length

            switch (sealed.type) {
                case 'cartesian':
                    if (datakey && datakeys.indexOf(datakey) < 0) datakeys.push(datakey) // Add datekeys. Removed unique datakey condiition to use multiple elements
                    activeCartesians.push(cartesiansLength) // Add to actives elements
                    if (legend) legends.push(legend) // Add to legends elements
                    slot.index = cartesiansLength
                    cartesians.push(slot)
                    break
                case 'axis':
                    axis.push(slot)
                    break
                case 'plugins':
                    plugins.push(slot)
                    break
                default:
                    break
            }

            if (sealed.preload) {
                sealed.preload({ parent: this, props: propsData, index: cartesiansLength })
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
