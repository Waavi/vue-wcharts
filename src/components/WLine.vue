<template>
    <path
        ref="line"
        :d="linePath"
        :stroke="fillColor"
        fill="none"
        :stroke-width="width"
    />
</template>

<script>
import VueTypes from 'vue-types'
import { line as d3Line, curveBasis } from 'd3'

export default {
    name: 'WLine',
    type: 'cartesian',
    inject: ['Cartesian'],
    props: {
        datakey: VueTypes.string.isRequired,
        width: VueTypes.number.def(1),
        curve: VueTypes.bool.def(false),
    },
    computed: {
        id () {
            return this.$vnode.index
        },
        fillColor () {
            return this.Cartesian.colors[this.id]
        },
        lineData () {
            return this.Cartesian.dataset.map((item, index) => ({
                x: index,
                y: item[this.datakey],
            }))
        },
        defaultLine () {
            return d3Line()
                .x(d => this.Cartesian.xScale(d.x))
                .y(d => this.Cartesian.yScale(d.y))
        },
        linePath () {
            return this.curve ? this.defaultLine.curve(curveBasis)(this.lineData) : this.defaultLine(this.lineData)
        },
    },
}
</script>
