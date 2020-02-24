import VueTypes from 'vue-types'
import withUidMixin from '../../mixins/withUidMixin'
import activeMixin from '../../mixins/activeMixin'

export default {
    mixins: [
        withUidMixin,
        activeMixin,
    ],
    inject: ['Chart'],
    props: {
        label: VueTypes.string.optional,
        color: VueTypes.string.optional,
    },
    computed: {
        legendItemData () {
            throw new Error('legendItemMixin: implement "legendItemData"')
        },
    },
    watch: {
        legendItemData: {
            handler ({
                label,
                color,
                shape = 'circle',
                initialActive = true,
            }) {
                const { uid, Chart } = this
                const currentData = Chart.legendItems[uid] || {}
                if (label) {
                    Chart.registerLegendItem(uid, {
                        label,
                        color,
                        shape,
                        active: currentData.active || initialActive,
                    })
                } else if (currentData.label) {
                    Chart.unregisterLegendItem(uid)
                }
            },
            immediate: true,
        },
    },
    beforeDestroy () {
        this.Chart.unregisterLegendItem(this.uid)
    },
}
