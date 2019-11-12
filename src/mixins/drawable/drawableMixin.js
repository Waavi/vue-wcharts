import VueTypes from 'vue-types'
// import visibleMixin from '../visible'
import themeMixin from '../theme'
import animationMixin from '../animation'
import withUidMixin from '../withUidMixin'

export default {
    type: 'drawable',
    mixins: [
        withUidMixin,
        themeMixin,
        animationMixin,
        // visibleMixin,
    ],
    inject: ['Chart'],
    props: {
        series: VueTypes.string.optional,
    },
}
