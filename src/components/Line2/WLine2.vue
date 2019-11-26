<template>
    <g>
        <path
            :d="linePath"
            v-bind="stylesCmp"
            fill="none"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import d3Line from 'd3-shape/src/line'
import { monotoneX as curveMonotoneX } from 'd3-shape/src/curve/monotone'
import drawableCartesianMixin from '../../mixins/drawable/drawableCartesianMixin'
import withXAxisMixin, { registerXAxisDataKey } from '../../mixins/axes/withXAxisMixin'
import withYAxisMixin, { registerYAxisDataKey } from '../../mixins/axes/withYAxisMixin'
// import d3Area from 'd3-shape/src/area'
// import merge from '../../utils/merge'
// import { WDot } from '../Common'
// import { WSpread } from '../../transitions'
// import { isFunc } from '../../utils/checks'

export default {
    name: 'WLine2',
    // components: {
    //     WDot,
    //     WSpread,
    // },
    mixins: [
        drawableCartesianMixin,
        withXAxisMixin,
        withYAxisMixin,
    ],
    props: {
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('click'),
        label: VueTypes.string,
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.func]).def(false),
        area: VueTypes.bool.def(false),
        color: VueTypes.string.optional,
        styles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            strokeDasharray: VueTypes.string,
        }).def({}),
        dot: VueTypes.bool.def(false),
        dotStyles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            radius: VueTypes.number,
            hoverRadius: VueTypes.number,
        }).def({}),
    },
    preload ({ chart, uid, props }) {
        registerXAxisDataKey({ chart, uid, props })
        registerYAxisDataKey({ chart, uid, props })
        // chart.registerForLegend(uid, {
        //     label: 'test',
        //     color: 'red',
        // })
    },
    computed: {
        coords () {
            const {
                Chart, series, xCoordForDatum, yCoordForDatum,
            } = this
            const data = Chart.getDatasetForSeries(series)
            if (!data || data.length === 0) return undefined

            return data.map(datum => ({
                datum,
                ...xCoordForDatum(datum),
                ...yCoordForDatum(datum),
            }))
        },
        genLine () {
            return d3Line().x(d => d.xScaled).y(d => d.yScaled)
        },
        linePath () {
            const { coords, curve, genLine } = this
            if (curve === false) return genLine(coords)
            const curveFn = typeof curve === 'function' ? curve : curveMonotoneX
            return genLine.curve(curveFn)(coords)
        },

        // Styles
        stylesCmp () {
            return {
                ...this.themeStyles.styles,
                ...this.styles,
                stroke: (this.themeStyles && this.themeStyles.styles && this.themeStyles.styles.stroke) ||
                 this.styles.stroke ||
                 this.fillColor ||
                 this.color,
            }
        },
    },
}
</script>
