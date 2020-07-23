
import VueTypes from 'vue-types'
import axisMixin from './axisMixin'

export default {
    mixins: [
        axisMixin,
    ],
    props: {
        invisible: VueTypes.bool.def(false),

        // Ticks
        ticks: VueTypes.array.optional,
        tickFormatter: VueTypes.func.def(value => value),

        // Label
        label: VueTypes.oneOfType([
            VueTypes.string,
            VueTypes.arrayOf(VueTypes.string),
        ]).optional,
        labelFontSize: VueTypes.number.def(12),

        grid: VueTypes.oneOfType([
            VueTypes.bool, // same as "1"
            VueTypes.number, // number of grid lines per tick
        ]).optional,

        // Negative axis
        hideNegativeAxis: VueTypes.bool.def(false),

        // Style
        hideLine: VueTypes.bool.def(false),
        hideTickMark: VueTypes.bool.def(false),
        tickLength: VueTypes.number.def(5),
    },
    computed: {
        actualTicks () {
            const {
                invisible, ticks, numTicks, scale, tickFormatter, formatter: axisFormatter,
            } = this
            if (invisible || !scale) return []
            const formatter = tickFormatter || axisFormatter || (x => x)
            const tickValues = (ticks || scale.ticks(numTicks)) || []
            return tickValues.map((value, index) => {
                const label = formatter(value, index)
                return {
                    value,
                    scaledValue: scale(value),
                    label: label === undefined || label === null ? undefined : String(label),
                }
            })
        },
    },
}
