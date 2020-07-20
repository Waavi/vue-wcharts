// import VueTypes from 'vue-types'
import drawableMixin from './drawableMixin'
import { getDatums } from '../../utils'

export default {
    mixins: [drawableMixin],
    props: {
        // xAxisId: VueTypes.string.optional,
        // xDatakey: VueTypes.string.optional,
        // yAxisId: VueTypes.string.optional,
        // yDatakey: VueTypes.string.optional,
        // zAxisId: VueTypes.string.optional,
        // zDatakey: VueTypes.string.optional,
    },
    computed: {
        coords () {
            const {
                Chart,
                series,
                xCoordForDatum,
                yCoordForDatum,
                zCoordForDatum,
            } = this
            const datums = getDatums({ dataset: Chart.dataset, series })
            if (!datums || datums.length === 0 || xCoordForDatum === null || yCoordForDatum === null || zCoordForDatum === null) return undefined

            return datums.map((datum) => {
                const obj = { datum }
                if (xCoordForDatum) Object.assign(obj, xCoordForDatum(datum))
                if (yCoordForDatum) Object.assign(obj, yCoordForDatum(datum))
                if (zCoordForDatum) Object.assign(obj, zCoordForDatum(datum))
                return obj
            })
        },
    },
}
