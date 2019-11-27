<script>
import VueTypes from 'vue-types'
import chartMixin from '../../mixins/chart'
import { getPercentValue } from '../../utils/mathsPie'

export default {
    name: 'WPieChart',
    mixins: [chartMixin],
    props: {
        cx: VueTypes.string.def('50%'),
        cy: VueTypes.string.def('50%'),
        startAngle: VueTypes.number.def(0),
        endAngle: VueTypes.number.def(360),
        paddingAngle: VueTypes.number.def(0),
    },
    computed: {
        curCx () {
            return getPercentValue({ percent: this.cx, totalValue: this.width, defaultValue: this.width / 2 })
        },
        curCy () {
            return getPercentValue({ percent: this.cy, totalValue: this.height, defaultValue: this.height / 2 })
        },
    },
    render (h) {
        const slots = this.$slots.default || []
        let datakeys = [] // We need get slots datakey prop to calculate max and min values for the scales
        const pies = [] // We need inject necessary props to cartesian slots
        const others = []
        const plugins = []

        // Props
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
            const { datakey, legend } = propsData || {}
            const piesLength = pies.length

            switch (sealed.type) {
                case 'pie':
                    // Add datekeys. Removed unique datakey condiition to use multiple elements
                    if (datakey) datakeys = [...datakeys.filter(key => key !== datakey), datakey]
                    // Add to legends elements
                    if (legend) legends.push(legend)
                    // Add slot
                    slot.componentOptions.propsData.index = piesLength
                    pies.push(slot)
                    break
                case 'plugins':
                    plugins.push(slot)
                    break
                default:
                    break
            }

            if (sealed.preload) {
                sealed.preload({ parent: this, props: propsData, index: piesLength })
            }
        })

        const { viewWidth, height, responsive } = this
        this.datakeys = datakeys
        this.legends = legends

        return h(
            'div',
            {
                class: 'WPieChart',
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
                    this.chartReady ? [others, pies] : []
                ),
                this.chartReady ? plugins : [],
            ]
        )
    },
}
</script>
