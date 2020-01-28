<script>
import legendItemMixin from './legendItemMixin.vue'

export default {
    name: 'LegendItem',
    mixins: [
        legendItemMixin,
    ],
    render (h) {
        const { isActive } = this
        const slot = this.$scopedSlots.default({ isActive })
        return Array.isArray(slot) && slot.length > 1 ? h('g', {}, slot) : slot
    },
}
</script>
