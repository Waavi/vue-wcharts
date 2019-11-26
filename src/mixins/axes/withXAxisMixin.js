import VueTypes from 'vue-types'
import { AXIS_DIMENSION } from '../../components/Axis2/axisMixin'

export default {
    props: {
        xAxisId: VueTypes.string.optional,
        xDatakey: VueTypes.string.optional,
    },
    computed: {
        xAxis () {
            return this.Chart.axes[this.xAxisId || AXIS_DIMENSION.X]
        },
        actualXDatakey () {
            return this.xDatakey || this.xAxis.datakey
        },
    },
    methods: {
        xCoordForDatum (datum) {
            const { xAxis, actualXDatakey } = this
            const x = typeof datum === 'object' ? datum[actualXDatakey] : datum
            return {
                x,
                xScaled: xAxis.scale(x),
            }
        },
    },
}

export function registerXAxisDataKey ({ chart, uid, props }) {
    const { xAxisId, series, xDatakey } = props || {}
    chart.registerAxisDatakey(uid, {
        axisId: xAxisId,
        dimension: AXIS_DIMENSION.X,
        series,
        datakey: xDatakey,
    })
}
