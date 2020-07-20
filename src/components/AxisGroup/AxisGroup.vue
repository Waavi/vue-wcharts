<script>
import VueTypes from 'vue-types'
import noop from 'lodash.noop'
import clamp from 'lodash.clamp'
import { AXIS_TYPE, AXIS_DIMENSION } from '../Axis/axisMixin'
import { paddingBandVueType, normalizedPaddingBand } from '../../charts/chartUtils'
import { obtainScalerSlotter } from '../Axis/axisScaleUtils'

const DEFAULT_SLOT_WIDTH_WHEN_IS_CONSTRAINED = 1
const DEFAULT_SLOT_WIDTH_WHEN_IS_NOT_CONSTRAINED = 80

export default {
    name: 'AxisGroup',
    inject: ['Chart'],
    provide () {
        return {
            AxisGroup: this,
        }
    },
    props: {
        axisId: VueTypes.string.optional,
        width: VueTypes.number.def(DEFAULT_SLOT_WIDTH_WHEN_IS_CONSTRAINED),
        absoluteWidth: VueTypes.number.optional,
        bandPadding: paddingBandVueType,
    },
    data () {
        return {
            slots: [],
        }
    },
    computed: {
        actualAxisId () {
            const { Chart, axisId } = this
            return axisId ||
                Chart.inferredAxisId.byType[AXIS_TYPE.CATEGORICAL] ||
                Chart.inferredAxisId.byDimension[AXIS_DIMENSION.X] ||
                Chart.inferredAxisId.byDimension[AXIS_DIMENSION.RADIUS] ||
                (console.error('WChart ERROR - Axis id is not defined for AxisGroup.') && null)
        },
        actualWidth () {
            const {
                Chart, actualAxisId, width, absoluteWidth,
            } = this
            if (absoluteWidth === undefined) {
                const constrainedWidth = ((Chart.axisScales[actualAxisId] || {}).bandwidth || noop)()
                if (constrainedWidth) {
                    return constrainedWidth * clamp(width, 0, 1)
                }
                return DEFAULT_SLOT_WIDTH_WHEN_IS_NOT_CONSTRAINED
            }
            return absoluteWidth
        },
        normalizedBandPadding () {
            return normalizedPaddingBand(this.bandPadding)
        },
        activeSlots () {
            return this.slots.filter(s => s.active).map(s => s.uid)
        },
        getSlottedScale () {
            const {
                Chart, actualAxisId, activeSlots, actualWidth, normalizedBandPadding,
            } = this
            const scale = Chart.axisScales[actualAxisId]
            const scaleForUid = obtainScalerSlotter({
                scale, slotUuids: activeSlots, width: actualWidth, bandPadding: normalizedBandPadding,
            })
            return (uid, childAxisId) => (childAxisId === actualAxisId ? scaleForUid(uid) : undefined)
        },
    },
    methods: {
        registerIntoSlot (uid) {
            const index = this.slots.findIndex(item => item.uid === uid)
            if (index >= 0) {
                if (this.slots[index].active !== true) {
                    this.slots = [...this.slots.slice(0, index), { uid, active: true }, ...this.slots.slice(index + 1)]
                }
            } else {
                this.slots = [...this.slots, { uid, active: true }]
            }
        },
        unregisterIntoSlot (uid) {
            const index = this.slots.findIndex(item => item.uid === uid)
            if (index >= 0 && this.slots[index].active === true) {
                this.slots = [...this.slots.slice(0, index), { uid, active: false }, ...this.slots.slice(index + 1)]
            }
        },
    },

    render (h) {
        return h('g', {}, this.$slots.default)
    },
}
</script>
