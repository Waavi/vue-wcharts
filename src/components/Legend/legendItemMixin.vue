<script>
import VueTypes from 'vue-types'
import withUidMixin from '../../mixins/withUidMixin'

export default {
    type: 'drawable',
    mixins: [
        withUidMixin,
    ],
    inject: ['Chart'],
    props: {
        label: VueTypes.string.optional,
        color: VueTypes.string.optional,
        shape: VueTypes.string.def('circle'),
        initialActive: VueTypes.bool.def(true),
    },
    computed: {
        isActive () {
            return !((this.Chart.legendItems[this.uid] || {}).active === false)
        },
    },
    watch: {
        label: {
            handler (newLabel) {
                this.register({ label: newLabel })
            },
            immediate: true,
        },
        color (newColor) {
            this.register({ color: newColor })
        },
        shape (newShape) {
            this.register({ shape: newShape })
        },
    },
    beforeDestroy () {
        this.Chart.unregisterLegendItem(this.uid)
    },
    methods: {
        register ({
            label = this.label,
            color = this.color,
            shape = this.shape,
            initialActive = this.initialActive,
        }) {
            const { uid, Chart } = this
            const oldData = Chart.legendItems[uid] || {}
            if (label) {
                Chart.registerLegendItem(uid, {
                    label,
                    color,
                    shape,
                    active: oldData.active || initialActive,
                })
            } else if (oldData.label) {
                Chart.unregisterLegendItem(uid)
            }
        },
    },
}
</script>
