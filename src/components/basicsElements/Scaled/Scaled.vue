<script>
import VueTypes from 'vue-types'
import { obtainNumericDataDomainFromValue } from '../../Axis/axisUtils'
import withUidMixin from '../../../mixins/withUidMixin'
import { scaledArray } from '../../../utils'

export default {
    name: 'Scaled',
    inject: ['Chart'],
    mixins: [withUidMixin],
    props: {
        valuesByAxes: VueTypes.object.isRequired,
        hideOnError: VueTypes.bool.def(true),
        adjustAxes: VueTypes.bool.def(false),
    },
    computed: {
        scaledValues () {
            const { Chart, valuesByAxes, hideOnError } = this
            const scales = Chart.axisScales
            const result = {}
            let error = false
            Object.keys(valuesByAxes || {}).forEach((axisId) => {
                const scale = scales[axisId]
                if (scale) {
                    result[axisId] = scaledArray(scale, valuesByAxes[axisId])
                }
                if (!scale || Number.isNaN(result[axisId]) || (Array.isArray(result[axisId]) && result[axisId].some(Number.isNaN))) {
                    error = true
                }
            })
            return hideOnError && error ? null : result
        },
    },
    watch: {
        valuesByAxes: {
            handler (values) {
                const { adjustAxes } = this
                if (adjustAxes && values) {
                    Object.keys(values).forEach((axisId) => {
                        const domain = obtainNumericDataDomainFromValue(values[axisId])
                        this.Chart.registerAxisDataDomain(this.uid, { axisId, domain })
                    })
                }
            },
            immediate: true,
        },
    },
    beforeDestroy () {
        this.Chart.unregisterAxisDataDomain(this.uid)
    },
    render (h) {
        const { scaledValues } = this
        if (scaledValues === null) return undefined
        const slot = this.$scopedSlots.default(scaledValues)
        return Array.isArray(slot) && slot.length > 1 ? h('g', {}, slot) : slot
    },
}
</script>
