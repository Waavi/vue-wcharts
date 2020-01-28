/**
 * Mixin that provides a computed 'actualStyles' as a merge from a styles taken from props and theme.
 */
import VueTypes from 'vue-types'
import merge from 'lodash.merge'
import { theme } from '../options'

export default {
    props: {
        styles: VueTypes.object.def({}),
    },
    computed: {
        actualStyles () {
            const { name } = this.$options
            return merge({}, theme[name] || {}, this.styles)
        },
    },
}
