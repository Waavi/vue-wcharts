<script>
import VueTypes from 'vue-types'

export default {
    name: 'ScaleProvider',
    inject: ['Chart'],
    props: {
        axisId: VueTypes.string.isRequired,
    },
    render (h) {
        const { Chart, axisId } = this
        const slot = this.$scopedSlots.default({ scale: Chart.axisScales[axisId] })
        return Array.isArray(slot) && slot.length > 1 ? h('g', {}, slot) : slot
    },
}
</script>
