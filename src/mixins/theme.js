import VueTypes from 'vue-types'
import { colors, theme } from '../config'

export default {
    props: {
        colors: VueTypes.array.def(() => colors),
    },
    data () {
        // eslint-disable-next-line no-underscore-dangle
        const name = this.$options._componentTag
        return {
            themeStyles: theme[name] || {},
        }
    },
}
