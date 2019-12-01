/**
 * Mixin related to the "Unique ID"
 */
import { random } from '../utils/maths'

export default {
    beforeCreate () {
        const { type, name } = this.$options
        this.uid = [type, name].filter(x => x).concat(random()).join('-')
    },
}
