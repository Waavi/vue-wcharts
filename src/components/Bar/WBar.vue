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
                @mouseenter="handleMouseEnter"
                @mouseleave="Cartesian.cleanActive"
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
        // Index cartesian elem
        index () {
            return this.$vnode.index
        },
        // Active elem
        active () {
            return this.Cartesian.activeCartesians.includes(this.index)
        },
        // Check color custom or default
        fillColor () {
            return this.color || this.Cartesian.colors[this.index]
        },
        barsLength () {
            return (this.Cartesian.activeCartesians || []).length
        },
        // Margin
        margin () {
            const half = (this.width / 2)
            return (half * this.barsLength) - (this.width * this.index)
        },
        // Bars
        bars () {
            const {
                canvas, dataset, padding, yScale,
            } = this.Cartesian
            // Calc offset
            const offset = padding[1] + padding[3]
            // Calc space
            const space = (canvas.width - offset) / (dataset.length - 1)

            return dataset.map((item, index) => {
                const x = (canvas.x0 + (space * index) + padding[3]) - this.margin
                const height = canvas.y1 - yScale(item[this.datakey])
                const y = canvas.y1 - height

                return {
                    x,
                    y,
                    width: this.width,
                    height,
                }
            })
        },
    },
    mounted () {
        // Set offset in parent to update gap
        this.Cartesian.offset = this.calcOffset()
    },
    methods: {
        // Calc offset of number bars
        calcOffset () {
            const gap = this.width / 2 * this.barsLength + this.width
            return [0, gap, 0, gap]
        },
        // Set active element
        handleMouseEnter (event) {
            this.Cartesian.setActive(
                { id: this.index, point: this.index },
                event,
                this.Cartesian.active.types.point
            )
        },
    },
}
</script>
