import VueTypes from 'vue-types'
import merge from 'lodash.merge'
import { colors, theme } from '../options'

export default {
    props: {
        colors: VueTypes.array.def(() => colors),
        styles: VueTypes.object.def({}),
    },
    data () {
        const { name } = this.$options
        return {
            themeStyles: theme[name] || {},
        }
    },
    computed: {
        actualStyles () {
            return merge(this.themeStyles, this.styles)
        },
    },
}
