/**
 * Mixin that create a "Unique ID" for the component
 */
import { random } from '../utils/maths'

export default {
    beforeCreate () {
        const { type, name } = this.$options
        this.uid = [type, name].filter(x => x).concat(random()).join('-')
        // this.$vnode.key = this.$vnode.key || this.uid
    },
}
