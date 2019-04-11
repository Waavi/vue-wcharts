<template>
    <g>
        <BasicTrans
            :initialProps="{ d: initialLinePath }"
            transition="d .3s ease-in-out"
        >
            <path
                :d="linePath"
                :stroke="stylesCmp.stroke ? stylesCmp.stroke : fillColor"
                :stroke-width="stylesCmp.strokeWidth"
                :stroke-dasharray="stylesCmp.strokeDasharray"
                fill="none"
            />
        </BasicTrans>
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
                    <Dot
                        :key="`dot${dotItem.cartesianIndex}${dotItem.index}`"
                        :index="dotItem.index"
                        :cartesianIndex="dotItem.cartesianIndex"
                        :cx="dotItem.cx"
                        :cy="dotItem.cy"
                        :styles="{
                            stroke:dotStylesCmp.stroke ? dotStylesCmp.stroke : fillColor,
                            fill: dotStylesCmp.fill ? dotStylesCmp.fill : fillColor,
                            strokeWidth: dotStylesCmp.strokeWidth,
                            radius: dotStylesCmp.radius,
                            hoverRadius: dotStylesCmp.hoverRadius,
                        }"
                    />
                </slot>
            </template>
        </g>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import { line as d3Line, curveMonotoneX } from 'd3'
import Dot from './Dot.vue'
import BasicTrans from '../transitions/BasicTrans.vue'

import { isFunc } from '../../utils/checks'

const stylesDefaultProp = {
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
    inject: ['Cartesian'],
    components: {
        Dot,
        BasicTrans,
    },
    props: {
        datakey: VueTypes.string.isRequired,
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.func]).def(false),
        styles: VueTypes.shape({
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
                cartesianIndex: this.index,
            })) : []
        },
        basicLineFn () {
            return d3Line()
                .x(d => this.Cartesian.xScale(d.x))
                .y(d => this.Cartesian.yScale(d.y))
        },
        initialLinePath () {
            const data = this.lineData.map(d => ({
                x: d.x,
                y: 0,
            }))
            return this.calculateLine(data, this.curve, this.basicLineFn)
        },
        linePath () {
            return this.calculateLine(this.lineData, this.curve, this.basicLineFn)
        },
    },
    methods: {
        calculateLine (data, curve, basicLineFn) {
            if (curve === false) return basicLineFn(data)
            const curveFn = isFunc(curve) ? curve : curveMonotoneX
            return basicLineFn.curve(curveFn)(data)
        },
    },
}
</script>
