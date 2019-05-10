import VueTypes from 'vue-types'
import { colors } from '../config'

export default {
    props: {
        colors: VueTypes.array.def(() => colors),
    },
}
