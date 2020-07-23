<script>
import VueTypes from 'vue-types'

export default {
    name: 'Animation',
    provide () {
        return {
            Animation: this,
        }
    },
    props: {
        animDuration: VueTypes.number.def(500),
        appearFromReferenceAlongAxis: VueTypes.string.optional,
        appearSpreadingAlongAxis: VueTypes.string.optional,
    },

    render (h) {
        const children = this.$slots.default
        return Array.isArray(children) ? h('g', children) : children
    },
}
</script>
