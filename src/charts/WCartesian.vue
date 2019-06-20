<script>
import VueTypes from 'vue-types'
import scaleLinear from 'd3-scale/src/linear'
import stack from 'd3-shape/src/stack'
import stackOffsetDiverging from 'd3-shape/src/offset/diverging'
import noop from 'lodash.noop'
import { bound } from '../utils/maths'

import chartMixin from '../mixins/chart'

export default {
    name: 'WCartesian',
    mixins: [chartMixin],
    props: {
        scatter: VueTypes.bool.def(false),
        bound: VueTypes.array.def([]),
        xBound: VueTypes.array.def([]),
        gap: VueTypes.oneOfType([VueTypes.number, VueTypes.arrayOf(VueTypes.number).def([0, 0, 0, 0])]).def(0),
    },
    data () {
        return {
            axis: {
                x: {
                    datakey: null,
                    name: null,
                },
                y: {
                    datakey: null,
                    name: null,
                },
                z: {
                    datakey: null,
                    name: null,
                    range: null,
                },
            },
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
            const domain = this.scatter ? [this.xBounds.min, this.xBounds.max] : [0, this.dataset.length - 1]
            return scaleLinear()
                .domain(domain)
                .range([this.canvas.x0 + this.padding[3], this.canvas.x1 - this.padding[1]])
        },
        // zScale calculate like Recharts
        zScale () {
            if (this.scatter && this.axis.z.datakey) {
                const [rangeMin, rangeMax] = this.axis.z.range
                const { min: boundMin, max: boundMax } = this.zBounds
                return val => Math.sqrt((((val - boundMin) / (boundMax - boundMin)) * (rangeMax - rangeMin) + rangeMin) / Math.PI)
            }
            return val => val
        },
        // bounds
        bounds () {
            if (this.datakeys.length || this.axis.y.datakey) {
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
        xBounds () {
            if (this.scatter && this.axis.x.datakey) {
                const [boundMin, boundMax] = this.xBound
                return {
                    min: this.getBound(boundMin, 'min', 'x'),
                    max: this.getBound(boundMax, 'max', 'x'),
                }
            }
            return {
                max: 0,
                min: 0,
            }
        },
        zBounds () {
            if (this.scatter && this.axis.z.datakey) {
                const values = this.dataset.map(d => d[this.axis.z.datakey])
                return {
                    min: Math.min(...values),
                    max: Math.max(...values),
                }
            }
            return {
                max: 0,
                min: 0,
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
            const offset = this.maxBarWidth * (this.numberOfBarsPerGroup / 2)
            const gap = Array(4).fill(0)

            if (this.numberOfBarsPerGroup) {
                gap[1] = offset
                gap[3] = offset
                return gap
            }

            return gap
        },
        // Return stacked data without transform of datakeys and dataset props
        // ref: https://github.com/d3/d3-shape#stacks
        stackedCurData () {
            const stackDatakeys = Object.entries((this.snap || {}).stackedBarsByIndex || [])
                .filter(([index, value]) => this.activeElements.includes(parseInt(index, 10)))
                .map(([index, value]) => value.datakey)

            return stack()
                .keys(stackDatakeys)
                .offset(stackOffsetDiverging)(this.dataset)
        },
        // Return bars data without stacked bars and without transform of datakeys and dataset props
        // ref: https://github.com/d3/d3-shape#stacks
        barsCurData () {
            const stackDatakeys = Object.values((this.snap || {}).stackedBarsByIndex || []).map(b => b.datakey)
            const barsDatakeys = Object.entries((this.snap || {}).barsByIndex || [])
                .filter(([index, value]) => !stackDatakeys.includes(value.datakey))
                .filter(([index, value]) => this.activeElements.includes(parseInt(index, 10)))
                .map(([index, value]) => value.datakey)

            return stack()
                .keys(barsDatakeys)
                .offset(noop)(this.dataset)
        },
        // Return lines data without transform of datakeys and dataset props
        // ref: https://github.com/d3/d3-shape#stacks
        linesCurData () {
            const linesDatakeys = Object.entries((this.snap || {}).linesByIndex || [])
                .filter(([index, value]) => this.activeElements.includes(parseInt(index, 10)))
                .map(([index, value]) => value.datakey)

            return stack()
                .keys(linesDatakeys)
                .offset(noop)(this.dataset)
        },

        curData () {
            return [...this.stackedCurData, ...this.barsCurData, ...this.linesCurData]
        },
        // Return number of bars per group. If is stacked, 'numberOfBars' is one.
        numberOfBarsPerGroup () {
            const bars = Object.values((this.snap || {}).barIds || []).filter(b => this.activeElements.includes(b)).length
            const stackedBars = Object.values((this.snap || {}).stackedBarIds || []).filter(b => this.activeElements.includes(b)).length
            return bars - stackedBars + (stackedBars ? 1 : 0)
        },
        // Return max possible bar width saving space between group of bars
        maxBarWidth () {
            return this.canvas.width / (this.numberOfBarsPerGroup * (this.dataset.length + 1))
        },
        // Return position of bars per group
        positionsPerGroupOfBars () {
            const stackedBars = Object.values((this.snap || {}).stackedBarIds || []).filter(b => this.activeElements.includes(b))
            const positions = Object.values((this.snap || {}).barIds || []).filter(b => this.activeElements.includes(b) && !stackedBars.includes(b))
            positions.splice(positions.filter(b => b < stackedBars[0]).length, 0, stackedBars)
            return positions
        },
    },
    methods: {
        // Calc min/max bound values
        getBound (val, type = 'min', axis = 'y') {
            if (typeof val === 'number') return val

            const isMin = type === 'min'
            let result = 0
            if (this.scatter) {
                const values = this.dataset.map(d => d[axis === 'y' ? this.axis.y.datakey : this.axis.x.datakey])
                result = isMin ? Math.min(...values) : Math.max(...values)
            } else {
                result = bound(this.curData, type, isMin ? 0 : 1)

                if (isMin && result === 0) {
                    result = bound(this.curData, 'min', 1)
                }
            }
            if (typeof val === 'function') return val(result)

            return result
        },
    },
    render (h) {
        const slots = this.$slots.default || []
        let datakeys = [] // We need get slots datakey prop to calculate max and min values for the scales
        const cartesians = [] // We need inject necessary props to cartesian slots
        const grid = []
        const others = []
        const axis = []
        const plugins = []

        // Props
        const activeElements = []
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
                    // Add datekeys. Removed unique datakey condiition to use multiple elements
                    if (datakey) datakeys = [...datakeys.filter(key => key !== datakey), datakey]
                    // Add to actives elements
                    activeElements.push(cartesiansLength)
                    // Add to legends elements
                    if (legend) legends.push(legend)
                    // Add slot
                    slot.index = cartesiansLength
                    cartesians.push(slot)
                    break
                case 'grid':
                    grid.push(slot)
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
        this.activeElements = activeElements
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
                    this.chartReady ? [others, grid, cartesians, axis] : []
                ),
                this.chartReady ? plugins : [],
            ]
        )
    },
}
</script>
