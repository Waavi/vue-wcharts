// import VueTypes from 'vue-types'
import drawableMixin from './drawableMixin'
import { getDatums } from '../../utils'
import { polarToCartesian } from '../../utils/maths'

export default {
    mixins: [drawableMixin],
    props: {
        // angleAxisId: VueTypes.string.optional,
        // angleDatakey: VueTypes.string.optional,
        // radiusAxisId: VueTypes.string.optional,
        // radiusDatakey: VueTypes.string.optional,
    },
    computed: {
        coords () {
            const {
                Chart,
                series,
                radiusCoordForDatum,
                angleCoordForDatum,
                zCoordForDatum,
            } = this
            const datums = getDatums({ dataset: Chart.dataset, series })
            if (!datums || datums.length === 0 || radiusCoordForDatum === null || angleCoordForDatum === null || zCoordForDatum === null) return undefined

            return datums.map((datum) => {
                const obj = { datum }
                if (radiusCoordForDatum) Object.assign(obj, radiusCoordForDatum(datum))
                if (angleCoordForDatum) Object.assign(obj, angleCoordForDatum(datum))
                if (obj.radiusScaled !== undefined && obj.angleScaled !== undefined) {
                    const { canvas } = Chart
                    const { x, y } = polarToCartesian({
                        radius: obj.radiusScaled,
                        angle: obj.angleScaled,
                    })
                    obj.xScaled = canvas.left + 0.5 * canvas.width + x
                    obj.yScaled = canvas.top + 0.5 * canvas.height - y
                }
                if (zCoordForDatum) Object.assign(obj, zCoordForDatum(datum))
                return obj
            })
        },
    },
}
