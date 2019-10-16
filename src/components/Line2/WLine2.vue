<template>
    <g />
</template>

<script>
import VueTypes from 'vue-types'
import drawableCartesianMixin from '../../mixins/drawable/drawableCartesianMixin'
import { AXIS_DIMENSION } from '../Axis2/axisMixin'
// import d3Line from 'd3-shape/src/line'
// import d3Area from 'd3-shape/src/area'
// import { monotoneX as curveMonotoneX } from 'd3-shape/src/curve/monotone'
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
        datakeyX: VueTypes.string.optional,
        yAxisId: VueTypes.string.optional,
        datakeyY: VueTypes.string.optional,

        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('click'),
        label: VueTypes.string,
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.func]).def(false),
        area: VueTypes.bool.def(false),
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
            xAxisId, yAxisId, series, datakeyX, datakeyY,
        } = props || {}
        chart.registerAxisDatakey(uid, {
            axisId: xAxisId,
            dimension: AXIS_DIMENSION.X,
            series,
            datakey: datakeyX,
        })
        chart.registerAxisDatakey(uid, {
            axisId: yAxisId,
            dimension: AXIS_DIMENSION.Y,
            series,
            datakey: datakeyY,
        })
    },
    computed: {
        xAxis () {
            return this.Chart.axes[this.xAxisId || AXIS_DIMENSION.X]
        },
        yAxis () {
            return this.Chart.axes[this.yAxisId || AXIS_DIMENSION.Y]
        },
        actualDatakeyX () {
            return this.datakeyX || this.xAxis.datakey
        },
        actualDatakeyY () {
            return this.datakeyY || this.yAxis.datakey
        },
        coords () {
            if (!this.xAxis.scale || !this.yAxis.scale) return undefined
            const data = this.Chart.getData(this.series)
            if (!data || data.length === 0) return undefined

            return data.map(datum => ({
                x: this.xAxis.scale(datum[this.actualDatakeyX]),
                y: this.yAxis.scale(datum[this.actualDatakeyY]),
            }))
        },
    },
}
</script>
