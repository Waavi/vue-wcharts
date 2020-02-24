<script>
import VueTypes from 'vue-types'
import { AXIS_TYPE, AXIS_DIMENSION } from '../Axis/axisMixin'

const DEFAULT_SLOT_WIDTH_WHEN_IS_CONSTRAINED = 0.8
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
        activeSlots () {
            return this.slots.filter(s => s.active).map(s => s.uid)
        },
        totalWidth () {
            const { Chart, actualAxisId, width } = this
            const constrainedWidth = Chart.axisCategoricalStepWidths[actualAxisId]
            const maxWidth = constrainedWidth || Infinity
            const w =
                (width > 1 && width) ||
                (constrainedWidth && constrainedWidth * width) ||
                DEFAULT_SLOT_WIDTH_WHEN_IS_NOT_CONSTRAINED
            return Math.max(1, Math.min(maxWidth, w))
        },
        slotWidth () {
            const { activeSlots, totalWidth } = this
            return totalWidth / activeSlots.length
        },
        getSlotScale () {
            const {
                actualAxisId, activeSlots, totalWidth, slotWidth,
            } = this
            const offset = (slotWidth - totalWidth) / 2
            const scale = index => x => x + offset + index * slotWidth
            return (uid, childAxisId) => {
                if (childAxisId === actualAxisId) {
                    const index = activeSlots.indexOf(uid)
                    return index >= 0 ? scale(index) : null
                }
                return undefined
            }
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
