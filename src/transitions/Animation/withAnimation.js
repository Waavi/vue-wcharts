
import VueTypes from 'vue-types'

export default {
    inject: {
        Animation: { default: undefined },
    },
    props: {
        animDuration: VueTypes.number.optional,
    },
    computed: {
        actualAnimDuration () {
            const { Animation, animDuration } = this
            return animDuration || (Animation || {}).animDuration || 0
        },
    },
}
