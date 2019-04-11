<template>
    <g class="WLine">
        <path
            ref="line"
            :d="linePath"
            :stroke="stylesCmp.stroke ? stylesCmp.stroke : fillColor"
            :stroke-width="stylesCmp.strokeWidth"
            fill="none"
        />
        <g
            v-if="dot"
        >
            <template
                v-for="dotItem in dotsData"
            >
                <slot
                    name="dot"
                    :dotItem="dotItem"
                >
                    <circle
                        :key="`dot${dotItem.lineIndex}${dotItem.index}`"
                        :cx="dotItem.cx"
                        :cy="dotItem.cy"
                        :stroke="dotStylesCmp.stroke ? dotStylesCmp.stroke : fillColor"
                        :fill="dotStylesCmp.fill ? dotStylesCmp.fill : fillColor"
                        :r="Cartesian.activePoint.cartesianIndex === dotItem.lineIndex && Cartesian.activePoint.pointIndex === dotItem.index ? dotStylesCmp.radius * 2 : dotStylesCmp.radius"
                        :stroke-width="dotStylesCmp.strokeWidth"
                        @mouseenter="Cartesian.activatePoint({ cartesianIndex: dotItem.lineIndex, pointIndex: dotItem.index }, $event)"
                        @mouseleave="Cartesian.activatePoint({}, $event)"
                    />
                </slot>
            </template>
        </g>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import { line as d3Line, curveMonotoneX } from 'd3'

const stylesDefaultProp = {
    stroke: '',
    strokeWidth: 1,
}

const dotStylesDefaultProp = {
    fill: '',
    stroke: '',
    strokeWidth: 0,
    radius: 4,
}

export default {
    name: 'WLine',
    type: 'cartesian',
    inject: ['Cartesian'],
    props: {
        datakey: VueTypes.string.isRequired,
        curve: VueTypes.bool.def(false),
        styles: VueTypes.shape({
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
        }).def(() => ({
            ...stylesDefaultProp,
        })),
        dot: VueTypes.bool.def(false),
        dotStyles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            radius: VueTypes.number,
        }).def(() => ({
            ...dotStylesDefaultProp,
        })),
    },
    computed: {
        index () {
            return this.$vnode.index
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
            return this.Cartesian.colors[this.index]
        },
        lineData () {
            return this.Cartesian.dataset.map((item, index) => ({
                x: index,
                y: item[this.datakey],
            }))
        },
        dotsData () {
            return this.dot ? this.Cartesian.dataset.map((item, index) => ({
                cx: this.Cartesian.xScale(index),
                cy: this.Cartesian.yScale(item[this.datakey]),
                index,
                lineIndex: this.index,
            })) : []
        },
        defaultLine () {
            return d3Line()
                .x(d => this.Cartesian.xScale(d.x))
                .y(d => this.Cartesian.yScale(d.y))
        },
        linePath () {
            return this.curve ? this.defaultLine.curve(curveMonotoneX)(this.lineData) : this.defaultLine(this.lineData)
        },
    },
}
</script>
