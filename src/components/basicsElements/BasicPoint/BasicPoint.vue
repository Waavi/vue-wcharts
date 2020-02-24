<template>
    <path
        ref="path"
        :d="linePath"
        v-bind="attrs"
    />
</template>

<script>
import VueTypes from 'vue-types'
import d3Line from 'd3-shape/src/line'
// import d3Transition from 'd3-transition/dist/d3-transition'
import { monotoneX as curveMonotoneX } from 'd3-shape/src/curve/monotone'

export default {
    name: 'BasicPoint',
    props: {
        x: VueTypes.array.isRequired,
        xExtractor: VueTypes.func.optional,
        yExtractor: VueTypes.func.optional,
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.func]).def(false),
        styles: VueTypes.object.def({}),
    },
    data () {
        return {
            mounted: false,
        }
    },
    computed: {
        lineGenerator () {
            const {
                xExtractor, yExtractor, curve, mounted,
            } = this
            const genLine = d3Line()
                .x(xExtractor || (d => d.xScaled || d.x))
                .y((mounted && (yExtractor || (d => d.yScaled || d.y))) || (d => 0))
            if (curve === false) return genLine
            const curveFn = typeof curve === 'function' ? curve : curveMonotoneX
            return genLine.curve(curveFn)
        },
        linePath () {
            const { datums, lineGenerator } = this
            return lineGenerator(datums)
        },
        attrs () {
            const {
                datums, xExtractor, yExtractor, curve, ...restProps
            } = this.$props
            return restProps
        },
    },
    watch: {
        // linePath (value) {
        //     // const r = this.$refs.path
        //     // const s = d3Select(this.$refs.path)
        //     d3Transition.select(this.$refs.path).transition().duration(1000)
        //         .attr('d', value)
        // },
    },
    // created () {
    //     this.initialLine = this.linePath
    // },
    mounted () {
        this.mounted = true
    },
}
</script>
