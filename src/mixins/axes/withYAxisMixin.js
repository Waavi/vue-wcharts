import VueTypes from 'vue-types'
import { AXIS_DIMENSION } from '../../components/Axis2/axisMixin'

export default {
    props: {
        yAxisId: VueTypes.string.optional,
        yDatakey: VueTypes.string.optional,
    },
    computed: {
        yAxis () {
            return this.Chart.axes[this.yAxisId || AXIS_DIMENSION.Y]
        },
        actualYDatakey () {
            return this.yDatakey || this.yAxis.datakey
        },
    },
    methods: {
        yCoordForDatum (datum) {
            const { yAxis, actualYDatakey } = this
            const y = typeof datum === 'object' ? datum[actualYDatakey] : datum
            return {
                y,
                yScaled: yAxis.scale(y),
            }
        },
    },
}

export function registerYAxisDataKey ({ chart, uid, props }) {
    const { yAxisId, series, yDatakey } = props || {}
    chart.registerAxisDatakey(uid, {
        axisId: yAxisId,
        dimension: AXIS_DIMENSION.Y,
        series,
        datakey: yDatakey,
    })
}
