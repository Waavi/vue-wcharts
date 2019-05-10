<script>
import VueTypes from 'vue-types'
import { scaleLinear } from 'd3'
import stack from 'd3-shape/src/stack'
import stackOffsetDiverging from 'd3-shape/src/offset/diverging'
import { noop } from 'lodash'
import { bound } from '../utils/maths'

import activeMixin from '../mixins/active'
import themeMixin from '../mixins/theme'
import basicMixin from '../mixins/basic'

export default {
    name: 'WCartesian',
    mixins: [basicMixin, activeMixin, themeMixin],
    props: {
        stacked: VueTypes.bool.def(false),
        bound: VueTypes.array.def([]),
        gap: VueTypes.oneOfType([
            VueTypes.number,
            VueTypes.arrayOf(VueTypes.number).def([0, 0, 0, 0]),
        ]).def(0),
    },
    provide () {
        return {
            Chart: this,
        }
    },
    data () {
        return {
            axisXDatakey: null, // Datakey name of Xaxis
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
        // Generate padding by array or number.
        // return [10, 10, 10, 10]
        padding () {
            const gap = Array.isArray(this.gap) ? this.gap : Array(4).fill(this.gap)
            return gap.map((item, index) => item + this.offset[index])
        },
        // Offset of bars
        // return [10, 10, 10, 10]
        offset () {
            const { barAllWidth, barIds = [] } = this.snap
            const gap = Array(4).fill(0)

            if (barIds.length) {
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
    methods: {
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
    },
    render (h) {
        const slots = this.$slots.default || []
        let datakeys = [] // We need get slots datakey prop to calculate max and min values for the scales
        const cartesians = [] // We need inject necessary props to cartesian slots
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
                    this.chartReady ? [others, cartesians, axis] : []
                ),
                this.chartReady ? plugins : [],
            ]
        )
    },
}
</script>
