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
import { AXIS_DIMENSION } from '../Axis2/axisMixin'
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
    mixins: [drawableCartesianMixin],
    props: {
        xAxisId: VueTypes.string.optional,
        xDatakey: VueTypes.string.optional,
        yAxisId: VueTypes.string.optional,
        yDatakey: VueTypes.string.optional,

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
        const {
            xAxisId, yAxisId, series, xDatakey, yDatakey,
        } = props || {}
        chart.registerAxisDatakey(uid, {
            axisId: xAxisId,
            dimension: AXIS_DIMENSION.X,
            series,
            datakey: xDatakey,
        })
        chart.registerAxisDatakey(uid, {
            axisId: yAxisId,
            dimension: AXIS_DIMENSION.Y,
            series,
            datakey: yDatakey,
        })
    },
    computed: {
        xAxis () {
            return this.Chart.axes[this.xAxisId || AXIS_DIMENSION.X]
        },
        yAxis () {
            return this.Chart.axes[this.yAxisId || AXIS_DIMENSION.Y]
        },
        actualXDatakey () {
            return this.xDatakey || this.xAxis.datakey
        },
        actualYDatakey () {
            return this.yDatakey || this.yAxis.datakey
        },
        coords () {
            const {
                xAxis, yAxis, series, actualXDatakey, actualYDatakey, Chart,
            } = this
            if (!xAxis.scale || !yAxis.scale) return undefined
            const data = Chart.getDatasetForSeries(series)
            if (!data || data.length === 0) return undefined

            return data.map((datum) => {
                const x = datum[actualXDatakey]
                const y = datum[actualYDatakey]
                return {
                    x,
                    y,
                    xScaled: xAxis.scale(x),
                    yScaled: yAxis.scale(y),
                }
            })
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
