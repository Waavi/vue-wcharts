<template>
    <path
        ref="line"
        :d="linePath"
        stroke="black"
        fill="none"
        :strokeWidth="3"
    />
</template>

<script>
import VueTypes from 'vue-types'
import { line as d3Line } from 'd3'

export default {
    name: 'WLine',
    type: 'cartesian',
    inject: ['Cartesian'],
    props: {
        datakey: VueTypes.string.isRequired,
    },
    computed: {
        lineData () {
            return this.Cartesian.dataset.map((item, index) => ({
                x: index + 1,
                y: item[this.datakey],
            }))
        },
        defaultLine () {
            return d3Line()
                .x(d => this.Cartesian.xScale(d.x))
                .y(d => this.Cartesian.yScale(d.y))
        },
        linePath () {
            return this.defaultLine(this.lineData)
        },
    },
}
</script>
