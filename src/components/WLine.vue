<template>
    <path
        ref="line"
        :d="line"
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
    // inject: [
    //     'injectedData',
    // ],
    // inject: [
    //     'dataset',
    //     'bounds',
    //     'height',
    //     'width',
    //     'xScale',
    //     'yScale',
    // ],
    props: {
        dataKey: VueTypes.string.isRequired,
        dataset: VueTypes.array.def([]),
        height: VueTypes.number.def(400),
        width: VueTypes.number.def(600),
        bounds: VueTypes.object.def({}),
        xScale: VueTypes.func.def(() => null),
        yScale: VueTypes.func.def(() => null),
    },
    computed: {
        lineData () {
            return this.dataset.map((item, index) => ({
                x: index + 1,
                y: item[this.dataKey],
            }))
        },
        basicLine () {
            return this.xScale ? d3Line()
                .x(d => this.xScale(d.x))
                .y(d => this.yScale(d.y)) : null
        },
        line () {
            return this.basicLine ? this.basicLine(this.lineData) : null
        },
    },
}
</script>
