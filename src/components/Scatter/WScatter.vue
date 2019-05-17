<template>
    <g v-if="active">
        <Spread
            v-if="line"
            axis="x"
            :transition="transition"
        >
            <path
                :d="linePath"
                :style="{ transition: `all 250ms ${transEffect}` }"
                :stroke="lineStylesCmp.stroke ? lineStylesCmp.stroke : fillColor"
                :stroke-width="lineStylesCmp.strokeWidth"
                :stroke-dasharray="lineStylesCmp.strokeDasharray"
                fill="none"
            />
        </Spread>
        <g>
            <template
                v-for="dotItem in dotsData"
            >
                <slot
                    name="dot"
                    :dot="dotItem"
                    :styles="{
                        stroke: stylesCmp.stroke ? stylesCmp.stroke : fillColor,
                        fill: stylesCmp.fill ? stylesCmp.fill : fillColor,
                        strokeWidth: stylesCmp.strokeWidth,
                        radius: dotItem.z,
                        hoverRadius: dotItem.z,
                    }"
                    :Chart="Chart"
                    :transition="transition"
                >
                    <WDot
                        :key="`dot${dotItem.cartesianIndex}${dotItem.index}`"
                        :index="dotItem.index"
                        :cartesianIndex="dotItem.cartesianIndex"
                        :x="dotItem.x"
                        :y="dotItem.y"
                        :info="dotItem.info"
                        :styles="{
                            stroke: stylesCmp.stroke ? stylesCmp.stroke : fillColor,
                            fill: stylesCmp.fill ? stylesCmp.fill : fillColor,
                            strokeWidth: stylesCmp.strokeWidth,
                            radius: dotItem.z,
                            hoverRadius: dotItem.z,
                        }"
                        :transition="`all 250ms ${transEffect}`"
                    />
                </slot>
            </template>
        </g>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import { sortBy } from 'lodash'
import { line as d3Line, curveMonotoneX } from 'd3'
import { WDot } from '../Common'
import animationMixin from '../../mixins/animation'
import Spread from '../../transitions/Spread.vue'

import { isFunc } from '../../utils/checks'

const lineStylesDefaultProp = {
    fill: '',
    stroke: '',
    strokeWidth: 1,
    strokeDasharray: '0',
}

const stylesDefaultProp = {
    fill: '',
    stroke: '',
    strokeWidth: 0,
    radius: 4,
    hoverRadius: 8,
}

export default {
    name: 'WScatter',
    type: 'cartesian',
    components: {
        WDot,
        Spread,
    },
    mixins: [animationMixin],
    inject: ['Chart'],
    props: {
        legend: VueTypes.string,
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.func]).def(false),
        lineStyles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            strokeDasharray: VueTypes.string,
        }).def(() => ({
            ...lineStylesDefaultProp,
        })),
        line: VueTypes.bool.def(false),
        styles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            radius: VueTypes.number,
            hoverRadius: VueTypes.number,
        }).def(() => ({
            ...stylesDefaultProp,
        })),
    },
    computed: {
        index () {
            return this.$vnode.index
        },
        active () {
            return this.Chart.activeElements.includes(this.index)
        },
        lineStylesCmp () {
            return {
                ...lineStylesDefaultProp,
                ...this.lineStyles,
            }
        },
        stylesCmp () {
            return {
                ...stylesDefaultProp,
                ...this.styles,
            }
        },
        fillColor () {
            return this.Chart.colors[this.index]
        },
        lineData () {
            return sortBy(this.Chart.dataset, this.Chart.axisXDatakey).map((item, index) => ({
                x: item[this.Chart.axisXDatakey],
                y: item[this.Chart.axisYDatakey],
            }))
        },
        dotsData () {
            const {
                dataset, xScale, yScale, zScale, axisXDatakey, axisYDatakey, axisZDatakey, axisXName, axisYName, axisZName, colors,
            } = this.Chart
            const color = colors[this.index]
            return dataset.map((item, index) => ({
                x: xScale(item[axisXDatakey]),
                y: yScale(item[axisYDatakey]),
                z: zScale(item[axisZDatakey]),
                info: {
                    id: this.index,
                    label: '',
                    value: [
                        {
                            value: `${axisXName}: ${item[axisXDatakey]}`,
                            color,
                        },
                        {
                            value: `${axisYName}: ${item[axisYDatakey]}`,
                            color,
                        },
                        {
                            value: `${axisZName}: ${item[axisZDatakey]}`,
                            color,
                        },
                    ],
                },
                value: item[axisYDatakey],
                index,
                cartesianIndex: this.index,
            }))
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
}
</script>