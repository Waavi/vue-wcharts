/**
 * Mixin that provides a computed 'actualStyles' as a merge from a styles taken from props and theme.
 */
import VueTypes from 'vue-types'
import merge from 'lodash.merge'
import { theme } from '../options'

export default {
    props: {
        styles: VueTypes.object.def({}),
        styleOptions: VueTypes.any.optional,
    },
    computed: {
        actualStyles () {
            // https://css-tricks.com/presentation-attributes-vs-inline-styles/
            // => ¿Y si el theme nos devolviese los attrs y el propios attr style lo mergeara con styles?
            const {
                actualColor, styles, styleOptions, $options: { name },
            } = this
            let themeStyles = theme[name] || {}
            if (typeof themeStyles === 'function') {
                themeStyles = themeStyles({ color: actualColor, ...(styleOptions || {}) })
            }
            return merge({}, themeStyles, styles)
        },
    },
}
