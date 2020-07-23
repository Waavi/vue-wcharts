import VueTypes from 'vue-types'
// import visibleMixin from '../visible'
import stylesMixin from '../stylesMixin'
import colorMixin from '../colorMixin'
// import animationMixin from '../animation'
import withUidMixin from '../withUidMixin'
import legendItemMixin from '../../components/Legend/legendItemMixin'

export default {
    type: 'drawable',
    mixins: [
        withUidMixin,
        stylesMixin,
        colorMixin,
        legendItemMixin,
        // animationMixin,
        // visibleMixin,
    ],
    inject: ['Chart'],
    props: {
        series: VueTypes.string.optional,
        legendShape: VueTypes.string.def('circle'),
        legendInitialActive: VueTypes.bool.def(true),
    },
    data () {
        return {
            hasBeenMounted: false,
        }
    },
    computed: {
        coords () {
            throw new Error('drawableMixin: implement "coords"')
        },
        legendItemData () {
            return {
                label: this.label,
                color: this.color,
                shape: this.legendShape,
                initialActive: this.legendInitialActive,
            }
        },
    },
    mounted () {
        setTimeout(() => (this.hasBeenMounted = true), 250)
    },
}
