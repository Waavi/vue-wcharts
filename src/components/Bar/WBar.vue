<template>
    <g
        v-if="active"
        id="Bar"
    >
        <Spread
            axis="y"
            :transition="transition"
        >
            <rect
                v-for="(bar, key) in bars"
                :key="key"
                :x="bar.x"
                :y="bar.y"
                :width="bar.width"
                :height="bar.height"
                :fill="fillColor"
            />
        </Spread>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import animationMixin from '../../mixins/animation'
import Spread from '../../transitions/Spread.vue'

export default {
    name: 'WBar',
    type: 'cartesian',
    components: {
        Spread,
    },
    mixins: [animationMixin],
    inject: ['Cartesian'],
    props: {
        datakey: VueTypes.string.isRequired,
        width: VueTypes.number.def(20),
        color: VueTypes.string,
    },
    computed: {
        index () {
            return this.$vnode.index
        },
        active () {
            return this.Cartesian.activeCartesians.includes(this.index)
        },
        fillColor () {
            return this.color || this.Cartesian.colors[this.index]
        },
        bars () {
            const {
                canvas, dataset, padding, yScale,
            } = this.Cartesian
            // Calc offset
            const offset = padding[1] + padding[3]
            // Calc space
            const space = (canvas.width - offset) / (dataset.length - 1)

            return dataset.map((item, index) => ({
                x: (canvas.x0 + (space * index) + padding[3]) - this.width / 2,
                y: canvas.y1 - yScale(item[this.datakey]),
                width: this.width,
                height: yScale(item[this.datakey]),
            }))
        },
    },
    mounted () {
        const gap = this.width / 2
        this.Cartesian.gap = [0, gap, 0, gap]
    },
}
</script>
