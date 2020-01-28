
import VueTypes from 'vue-types'
import {
    obtainCategoricalActualTicks,
    obtainNumericActualTicks,
} from './axisUtils'
import axisMixin from './axisMixin'

export default {
    mixins: [
        axisMixin,
    ],
    props: {
        invisible: VueTypes.bool.def(false),

        // Ticks
        ticks: VueTypes.array.optional,
        numTicks: VueTypes.number.def(8),
        exactNumTicks: VueTypes.number.optional,
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
                isCategorical, categories, actualBounds, ticks, step,
            } = this
            if (isCategorical) {
                return obtainCategoricalActualTicks({ ticks, categories })
            }
            return obtainNumericActualTicks({
                ticks,
                bounds: actualBounds,
                step,
            })
        },
    },
    watch: {
        actualTicks: {
            handler (value) {
                this.Chart.setAxisTicks(this.id, value)
            },
            immediate: true,
        },
    },
}
