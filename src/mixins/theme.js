import VueTypes from 'vue-types'
import { colors, theme } from '../config'

export default {
    props: {
        colors: VueTypes.array.def(() => colors),
        themeStyles: VueTypes.object.def(() => theme),
    },
}
