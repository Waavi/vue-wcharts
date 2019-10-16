/**
 * Mixin to generate an "Unique Id" for the component within the chart. And it stores it when its 'created
 */

export function getUid (options, props) {
    const { type, name } = options || {}
    const { id } = props || {}
    return [type, name, id].filter(x => x).join('-')
}

export default {
    created () {
        this.uid = getUid(this.$options, this.$props)
        // if (this.Chart && this.Chart.registerUid) {
        //     this.Chart.registerUid(this.uid, this)
        // }
    },
}
