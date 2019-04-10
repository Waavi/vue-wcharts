<script>
import VueTypes from 'vue-types'
import { scaleLinear } from 'd3'
import { pick, includes } from 'lodash'
import { Slots } from '../utils'

export default {
    name: 'WCartesian',
    props: {
        dataset: VueTypes.array.def([]),
        height: VueTypes.number.def(400),
        width: VueTypes.number.def(600),
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
            datakeys: [],
            activePoint: {
                cartesianIndex: null,
                pointIndex: null,
            },
            space: [0, 0, 0, 0],
        }
    },
    computed: {
        canvas () {
            const { width, height, space: offset } = this
            const x0 = offset[3]
            const y0 = offset[0]
            const y1 = height - offset[2]
            const x1 = width - offset[1]

            return {
                x0,
                y0,
                width: x1 - x0,
                height: y1 - y0,
                x1,
                y1,
            }
        },
        yScale () {
            return scaleLinear()
                .domain([this.bounds.min, this.bounds.max])
                .range([this.canvas.y1, this.canvas.y0])
        },
        xScale () {
            return scaleLinear()
                .domain([0, this.dataset.length - 1])
                .range([this.canvas.x0, this.canvas.x1])
        },
        bounds () {
            if (this.datakeys.length) {
                const values = this.dataset.reduce((acc, d) => {
                    const picked = pick(d, this.datakeys)
                    return [...acc, ...Object.values(picked)]
                }, [])
                return {
                    max: Math.max(...values),
                    min: Math.min(...values),
                }
            }
            return {
                max: 0,
                min: 0,
            }
        },
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
    },
    render (h) {
        const slots = this.$slots.default || []
        const datakeys = [] // We need get slots datakey prop to calculate max and min values for the scales
        const cartesians = [] // We need inject necessary props to cartesian slots
        const others = []
        const axis = []

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
            const { datakey } = options.propsData
            switch (sealed.type) {
                case 'cartesian':
                    if (datakey && !includes(datakeys, datakey)) {
                        datakeys.push(datakey)
                    }
                    slot.index = cartesians.length
                    cartesians.push(slot)
                    break
                case 'axis':
                    this.addSpace(Slots.props(options, 'space'))
                    axis.push(slot)
                    break
                default:
                    break
            }
        })
        this.datakeys = datakeys

        return h(
            'div',
            {
                style: {
                    position: 'relative',
                    width: `${this.width}px`,
                },
            },
            [
                h(
                    'svg',
                    {
                        attrs: {
                            width: this.width,
                            height: this.height,
                            viewBox: `0 0 ${this.width} ${this.height}`,
                        },
                    },
                    [others, cartesians, axis]
                ),
            ]
        )
    },
}
</script>
