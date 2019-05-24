<template>
    <g v-if="active">
        <WSpread
            axis="x"
            :transition="transition"
        >
            <path
                :d="linePath"
                :style="{ transition }"
                :stroke="stylesCmp.stroke ? stylesCmp.stroke : fillColor"
                :stroke-width="stylesCmp.strokeWidth"
                :stroke-dasharray="stylesCmp.strokeDasharray"
                fill="none"
            />
            <defs
                v-if="area && stylesCmp.fill === ''"
            >
                <linearGradient :id="`areaGradient${_uid}`">
                    <stop
                        :stop-color="stylesCmp.stroke ? stylesCmp.stroke : fillColor"
                        stop-opacity="0.5"
                    />
                </linearGradient>
            </defs>
            <path
                v-if="area"
                :d="areaPath"
                :style="{ transition }"
                :fill="stylesCmp.fill ? stylesCmp.fill : `url(#areaGradient${_uid})`"
            />
        </WSpread>
        <g
            v-if="dot"
        >
            <template
                v-for="(dotItem, id) in dotsData"
            >
                <slot
                    name="dot"
                    :dot="dotItem"
                    :first="id === 0"
                    :last="id === dotsData.length - 1"
                    :styles="{
                        stroke: dotStylesCmp.stroke ? dotStylesCmp.stroke : fillColor,
                        fill: dotStylesCmp.fill ? dotStylesCmp.fill : fillColor,
                        strokeWidth: dotStylesCmp.strokeWidth,
                        radius: dotStylesCmp.radius,
                        hoverRadius: dotStylesCmp.hoverRadius,
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
                            stroke: dotStylesCmp.stroke ? dotStylesCmp.stroke : fillColor,
                            fill: dotStylesCmp.fill ? dotStylesCmp.fill : fillColor,
                            strokeWidth: dotStylesCmp.strokeWidth,
                            radius: dotStylesCmp.radius,
                            hoverRadius: dotStylesCmp.hoverRadius,
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
import { line as d3Line, area as d3Area, curveMonotoneX } from 'd3'
import { WDot } from '../Common'
import animationMixin from '../../mixins/animation'
import { WSpread } from '../../transitions'

import { isFunc } from '../../utils/checks'

const stylesDefaultProp = {
    fill: '',
    stroke: '',
    strokeWidth: 1,
    strokeDasharray: '0',
}

const dotStylesDefaultProp = {
    fill: '',
    stroke: '',
    strokeWidth: 0,
    radius: 4,
    hoverRadius: 8,
}

export default {
    name: 'WLine',
    type: 'cartesian',
    components: {
        WDot,
        WSpread,
    },
    mixins: [animationMixin],
    inject: ['Chart'],
    props: {
        datakey: VueTypes.string.isRequired,
        legend: VueTypes.string,
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.func]).def(false),
        area: VueTypes.bool.def(false),
        styles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            strokeDasharray: VueTypes.string,
        }).def(() => ({
            ...stylesDefaultProp,
        })),
        dot: VueTypes.bool.def(false),
        dotStyles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            radius: VueTypes.number,
            hoverRadius: VueTypes.number,
        }).def(() => ({
            ...dotStylesDefaultProp,
        })),
    },
    computed: {
        index () {
            return this.$vnode.index
        },
        active () {
            return this.Chart.activeElements.includes(this.index)
        },
        stylesCmp () {
            return {
                ...stylesDefaultProp,
                ...this.styles,
            }
        },
        dotStylesCmp () {
            return {
                ...dotStylesDefaultProp,
                ...this.dotStyles,
            }
        },
        fillColor () {
            return this.Chart.colors[this.index]
        },
        lineData () {
            return this.Chart.dataset.map((item, index) => ({
                x: index,
                y: item[this.datakey],
            }))
        },
        dotsData () {
            if (this.dot) {
                const {
                    dataset, xScale, yScale, datakeys, colors, axisXDatakey,
                } = this.Chart
                const color = colors[this.index]
                return dataset.map((item, index) => {
                    const line = dataset[index]
                    const key = datakeys[this.index]
                    const value = line[key]
                    const label = line[axisXDatakey]
                    return {
                        x: xScale(index),
                        y: yScale(item[this.datakey]),
                        info: {
                            id: this.index,
                            point: index,
                            label,
                            value: [{
                                value,
                                color,
                            }],
                        },
                        value: item[this.datakey],
                        index,
                        cartesianIndex: this.index,
                    }
                })
            }
            return []
        },
        genLine () {
            return d3Line()
                .x(d => this.Chart.xScale(d.x))
                .y(d => this.Chart.yScale(d.y))
        },
        linePath () {
            if (this.curve === false) return this.genLine(this.lineData)
            const curveFn = isFunc(this.curve) ? this.curve : curveMonotoneX
            return this.genLine.curve(curveFn)(this.lineData)
        },
        genArea () {
            if (!this.area) return null
            return d3Area().x(d => this.Chart.xScale(d.x))
                .y0(this.Chart.canvas.y1)
                .y1(d => this.Chart.yScale(d.y))
        },
        areaPath () {
            if (!this.area) return null
            if (this.curve === false) return this.genArea(this.lineData)
            const curveFn = isFunc(this.curve) ? this.curve : curveMonotoneX
            return this.genArea.curve(curveFn)(this.lineData)
        },
    },
}
</script>
