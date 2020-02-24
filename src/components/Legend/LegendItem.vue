<script>
import VueTypes from 'vue-types'
import legendItemMixin from './legendItemMixin'

export default {
    name: 'LegendItem',
    mixins: [
        legendItemMixin,
    ],
    props: {
        shape: VueTypes.string.def('circle'),
        initialActive: VueTypes.bool.def(true),
    },
    computed: {
        legendItemData () {
            return {
                label: this.label,
                color: this.color,
                shape: this.shape,
                initialActive: this.initialActive,
            }
        },
    },
    methods: {
        activate () {
        },
        deactivate () {
        },
    },
    render (h) {
        const { isActive } = this
        const slot = this.$scopedSlots.default({ isActive })
        return Array.isArray(slot) && slot.length > 1 ? h('g', {}, slot) : slot
    },
}
</script>
