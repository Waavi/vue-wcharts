import VueTypes from 'vue-types'
// import visibleMixin from '../visible'
import themeMixin from '../theme'
import animationMixin from '../animation'
import withUidMixin from '../withUidMixin'
import { getDatums } from '../../charts/chartUtils'

export default {
    type: 'drawable',
    mixins: [
        withUidMixin,
        themeMixin,
        animationMixin,
        // visibleMixin,
    ],
    inject: ['Chart'],
    props: {
        series: VueTypes.string.optional,
    },
    computed: {
        coords () {
            console.log('coords')
            const {
                Chart,
                series,
                xCoordForDatum,
                yCoordForDatum,
                zCoordForDatum,
                angleCoordForDatum,
                radiusCoordForDatum,
            } = this
            const datums = getDatums({ dataset: Chart.dataset, series })
            if (!datums || datums.length === 0) return undefined

            return datums.map((datum) => {
                const obj = { datum }
                if (xCoordForDatum) Object.assign(obj, xCoordForDatum(datum))
                if (yCoordForDatum) Object.assign(obj, yCoordForDatum(datum))
                if (zCoordForDatum) Object.assign(obj, zCoordForDatum(datum))
                if (angleCoordForDatum) Object.assign(obj, angleCoordForDatum(datum))
                if (radiusCoordForDatum) Object.assign(obj, radiusCoordForDatum(datum))
                return obj
            })
        },
    },
}
