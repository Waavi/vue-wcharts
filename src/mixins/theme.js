import VueTypes from 'vue-types'
import { colors, theme } from '../options'

export default {
    props: {
        colors: VueTypes.array.def(() => colors),
    },
    data () {
        const { name } = this.$options
        return {
            themeStyles: theme[name] || {},
        }
    },
}
