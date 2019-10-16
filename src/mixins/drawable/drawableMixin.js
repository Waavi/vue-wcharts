import VueTypes from 'vue-types'
// import visibleMixin from '../visible'
import themeMixin from '../theme'
import animationMixin from '../animation'

export default {
    type: 'drawable',
    mixins: [
        themeMixin,
        animationMixin,
        // visibleMixin,
    ],
    inject: ['Chart'],
    props: {
        series: VueTypes.string.optional,
    },
}
