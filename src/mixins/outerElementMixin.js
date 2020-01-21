/**
 * Mixin for "outer elements". It mainly gives the specific outer layout to render properly.
 */
import withUidMixin from './withUidMixin'

export default {
    inject: ['Chart'],
    mixins: [withUidMixin],
    computed: {
        layoutInOuterArea () {
            throw Error('"layoutInOuterArea" must be implemented')
        },
        /**
         * The layout (as a "rect") for this elmenet
         */
        outerLayout () {
            const {
                left: x = 0, top: y = 0, width = 0, height = 0,
            } = (this.Chart.outerElementLayoutsByUid || {})[this.uid] || {}
            return {
                x, y, width, height,
            }
        },
    },
    watch: {
        layoutInOuterArea: {
            handler (layoutInOuterArea) {
                const { Chart, uid } = this
                Chart.reserveAPlaceInOuterArea(uid, layoutInOuterArea)
            },
            immediate: true,
        },
    },
    beforeDestroy () {
        this.Chart.leavePlaceInOuterArea(this.uid)
    },
}
