/**
 * Mixin that takes or create a "Unique ID" for the component.
 */
import VueTypes from 'vue-types'
import { random } from '../utils/maths'

export default {
    props: {
        uniqueId: VueTypes.string.optional,
    },
    beforeCreate () {
        const { type, name, propsData: { uniqueId } } = this.$options
        this.uid = uniqueId || [type, name].filter(x => x).concat(random()).join('-')
    },
    created () {
        if (this.uniqueId) {
            this.uid = this.uniqueId
        }
    },
}
