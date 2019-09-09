<template>
    <g v-if="active">
        <WSpread
            v-if="line"
            axis="x"
            :transition="transition"
        >
            <path
                :d="linePath"
                :style="{ transition: `all 250ms ${transEffect}` }"
                v-bind="lineStylesCmp"
            />
        </WSpread>
        <g>
            <template v-for="dotItem in dotsData">
                <slot
                    name="dot"
                    :dot="dotItem"
                    :Chart="Chart"
                    :transition="transition"
                >
                    <WDot
                        :key="`dot${dotItem.cartesianIndex}${dotItem.index}`"
                        v-bind="dotItem"
                        :styles="{ opacity: dotStylesCmp.opacity }"
                        :transition="`all 250ms ${transEffect}`"
                        :trigger="trigger"
                        @onClick="$emit('onClickDot', $event)"
                    />
                </slot>
            </template>
        </g>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import sortBy from 'lodash.sortby'
import d3Line from 'd3-shape/src/line'
import { monotoneX as curveMonotoneX } from 'd3-shape/src/curve/monotone'
import { WDot } from '../Common'
import animationMixin from '../../mixins/animation'
import themeMixin from '../../mixins/theme'
import visibleMixin from '../../mixins/visible'
import { WSpread } from '../../transitions'
import { isFunc } from '../../utils/checks'

export default {
    name: 'WScatter',
    type: 'cartesian',
    components: {
        WDot,
        WSpread,
    },
    mixins: [
        themeMixin,
        animationMixin,
        visibleMixin,
    ],
    inject: ['Chart'],
    props: {
        // internal props set by the parent (WPieChart)
        index: VueTypes.number,
        datakey: VueTypes.string,
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('hover'),
        legend: VueTypes.string,
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.func]).def(false),
        line: VueTypes.bool.def(false),
        lineStyles: VueTypes.shape({
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            strokeDasharray: VueTypes.string,
        }).loose.def({}),
        dotStyles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            radius: VueTypes.number,
            opacity: VueTypes.number,
        }).loose.def({}),
    },
    computed: {
        lineStylesCmp () {
            return {
                ...this.themeStyles.line,
                ...this.lineStyles,
                stroke: this.themeStyles.line.stroke || this.lineStyles.stroke || this.fillColor,
                fill: 'none',
            }
        },
        dotStylesCmp () {
            return {
                ...this.themeStyles.dot,
                ...this.dotStyles,
            }
        },
        fillColor () {
            return (this.colors || [])[this.index] || this.Chart.colors[this.index]
        },
        active () {
            return this.Chart.activeElements.includes(this.index)
        },
        points () {
            // Check if has a multiple scatter
            return this.datakey ? this.Chart.data.filter(item => item.$dataset === this.datakey) : (this.Chart.data || [])
        },
        lineData () {
            // We sort values becouse we want a left to right line
            return sortBy(this.points, this.Chart.axis.x.datakey).map((item, index) => ({
                x: item[this.Chart.axis.x.datakey],
                y: item[this.Chart.axis.y.datakey],
            }))
        },
        dotsData () {
            const {
                xScale, yScale, zScale, axis,
            } = this.Chart

            return this.points
                .map((item, index) => {
                    const z = axis.z.datakey ? zScale(item[axis.z.datakey]) : this.dotStylesCmp.radius
                    return {
                        index,
                        cartesianIndex: this.index,
                        x: xScale(item[axis.x.datakey]),
                        y: yScale(item[axis.y.datakey]),
                        z,
                        value: item[axis.y.datakey],
                        info: {
                            $dataset: item.$dataset,
                            id: index,
                            data: item,
                            label: item.name || '',
                            value: [
                                this.generateAxisValue(axis.x, item[axis.x.datakey], this.fillColor),
                                this.generateAxisValue(axis.y, item[axis.y.datakey], this.fillColor),
                                ...(axis.z.datakey ? [this.generateAxisValue(axis.z, item[axis.z.datakey], this.fillColor)] : []),
                            ],
                        },
                        ...this.dotStylesCmp,
                        stroke: this.dotStylesCmp.stroke || this.fillColor,
                        fill: this.dotStylesCmp.fill || this.fillColor,
                        radius: z,
                        hoverRadius: z,
                    }
                })
        },
        genLine () {
            return d3Line()
                .x(d => this.Chart.xScale(d.x))
                .y(d => this.Chart.yScale(d.y))
        },
        linePath () {
            if (this.curve === false) return this.genLine(this.lineData)
            const curveFn = isFunc(this.curve) ? this.curve : curveMonotoneX
            return this.line ? this.genLine.curve(curveFn)(this.lineData) : null
        },
    },
    methods: {
        generateAxisValue ({ name, datakey }, data, color) {
            return ({
                key: name,
                value: data,
                color,
            })
        },
    },
}
</script>
