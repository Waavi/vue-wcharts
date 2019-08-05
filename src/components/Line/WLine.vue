<template>
    <g v-if="active">
        <WSpread
            axis="x"
            :transition="transition"
        >
            <path
                :d="linePath"
                :style="{ transition }"
                v-bind="stylesCmp"
                fill="none"
                @mouseenter="$emit('onMouseEnter', $event)"
                @mouseleave="$emit('onMouseLeave', $event)"
            />
            <defs
                v-if="area && stylesCmp.fill === ''"
            >
                <linearGradient :id="`areaGradient${_uid}`">
                    <stop
                        :stop-color="stylesCmp.stroke"
                        stop-opacity="0.5"
                    />
                </linearGradient>
            </defs>
            <path
                v-if="area"
                :d="areaPath"
                :fill="stylesCmp.fill || `url(#areaGradient${_uid})`"
                :style="{ transition }"
                @mouseenter="$emit('onMouseEnter', $event)"
                @mouseleave="$emit('onMouseLeave', $event)"
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
                    :Chart="Chart"
                    :transition="transition"
                >
                    <WDot
                        :key="`dot${dotItem.cartesianIndex}${dotItem.index}`"
                        v-bind="dotItem"
                        :transition="`all 250ms ${transEffect}`"
                        @onClick="$emit('onClickDot', $event)"
                    />
                </slot>
            </template>
        </g>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import d3Line from 'd3-shape/src/line'
import d3Area from 'd3-shape/src/area'
import { monotoneX as curveMonotoneX } from 'd3-shape/src/curve/monotone'
import { WDot } from '../Common'
import animationMixin from '../../mixins/animation'
import themeMixin from '../../mixins/theme'
import { WSpread } from '../../transitions'
import { isFunc } from '../../utils/checks'

export default {
    name: 'WLine',
    type: 'cartesian',
    components: {
        WDot,
        WSpread,
    },
    mixins: [
        themeMixin,
        animationMixin,
    ],
    inject: ['Chart'],
    props: {
        // internal props set by the parent (WCartesian)
        index: VueTypes.number,
        datakey: VueTypes.string.isRequired,
        legend: VueTypes.string,
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
    // It's called by parent components to necessary calcs before be rendering
    // Componen is not mounted and cannot access to default props
    preload ({ parent, props, index }) {
        const { snap } = parent
        const { datakey } = props

        // Set datakeys by index
        snap.linesByIndex = { ...snap.linesByIndex, [index]: { datakey } }
    },
    computed: {
        active () {
            return this.Chart.activeElements.includes(this.index)
        },
        stylesCmp () {
        return {
                ...this.themeStyles.styles,
                ...this.styles,
                stroke: this.themeStyles.styles.stroke || this.styles.stroke || this.fillColor,
            }
        },
        dotStylesCmp () {
            return {
                ...this.themeStyles.dot,
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
                    dataset, xScale, yScale, datakeys, colors, axis,
                } = this.Chart
                const color = colors[this.index]
                return dataset.map((item, index) => {
                    const line = dataset[index]
                    const key = datakeys[this.index]
                    const value = line[key]
                    const label = line[axis.x.datakey]

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
                        // Style props
                        ...this.dotStylesCmp,
                        stroke: this.dotStylesCmp.stroke || this.fillColor,
                        fill: this.dotStylesCmp.fill || this.fillColor,
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
