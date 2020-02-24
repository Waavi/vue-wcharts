import VueTypes from 'vue-types'
// import visibleMixin from '../visible'
import stylesMixin from '../stylesMixin'
import colorMixin from '../colorMixin'
// import animationMixin from '../animation'
import withUidMixin from '../withUidMixin'
import legendItemMixin from '../../components/Legend/legendItemMixin'
import { getDatums } from '../../utils'

export default {
    type: 'drawable',
    mixins: [
        withUidMixin,
        stylesMixin,
        colorMixin,
        legendItemMixin,
        // animationMixin,
        // visibleMixin,
    ],
    inject: ['Chart'],
    props: {
        series: VueTypes.string.optional,
        legendShape: VueTypes.string.def('circle'),
        legendInitialActive: VueTypes.bool.def(true),
    },
    computed: {
        coords () {
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
        legendItemData () {
            return {
                label: this.label,
                color: this.color,
                shape: this.legendShape,
                initialActive: this.legendInitialActive,
            }
        },
    },
}
