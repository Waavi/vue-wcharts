import VueTypes from 'vue-types'
import { AXIS_DIMENSION } from '../../components/Axis2/axisMixin'

export default {
    props: {
        zAxisId: VueTypes.string.optional,
        zDatakey: VueTypes.string.optional,
    },
    computed: {
        zAxis () {
            return this.Chart.axes[this.zAxisId || AXIS_DIMENSION.Z]
        },
        actualZDatakey () {
            return this.zDatakey || this.zAxis.datakey
        },
    },
    methods: {
        zCoordForDatum (datum) {
            const { zAxis, actualZDatakey } = this
            const z = typeof datum === 'object' ? datum[actualZDatakey] : datum
            return {
                z,
                zScaled: zAxis.scale(z),
            }
        },
    },
}

export function registerZAxisDataKey ({ chart, uid, props }) {
    const { zAxisId, series, zDatakey } = props || {}
    chart.registerAxisDatakey(uid, {
        axisId: zAxisId,
        dimension: AXIS_DIMENSION.Z,
        series,
        datakey: zDatakey,
    })
}
