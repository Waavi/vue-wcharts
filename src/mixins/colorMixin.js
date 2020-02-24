/**
 * Mixin that provides a computed 'actualStyles' as a merge from a styles taken from props and theme.
 */
import VueTypes from 'vue-types'
import withUidMixin from './withUidMixin'
import { ColorType } from '../charts/chartColorsMixin'

export default {
    inject: ['Chart'],
    mixins: [
        withUidMixin,
    ],
    props: {
        color: ColorType.optional,
        keepColor: VueTypes.bool.def(true),
    },
    computed: {
        actualColor () {
            const { uid, color, Chart } = this
            return Chart.registerColor(uid, color)
        },
    },
    beforeDestroy () {
        const { Chart, uid, keepColor } = this
        !keepColor && Chart.unregisterColor(uid)
    },
}
