import VueTypes from 'vue-types'
import merge from 'lodash.merge'
import { colors, theme } from '../options'

export default {
    props: {
        colors: VueTypes.array.def(() => colors),
        styles: VueTypes.object.def({}),
    },
    computed: {
        actualStyles () {
            const { name } = this.$options
            debugger
            return merge({}, theme[name] || {}, this.styles)
        },
    },
}
