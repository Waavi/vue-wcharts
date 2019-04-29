<template>
    <g
        v-if="active"
        id="Bar"
    >
        <Trans
            v-for="(bar, key) in bars"
            :key="key"
            :initialProps="{
                height: 0,
                y: Cartesian.canvas.y1
            }"
            :transition="transition"
        >
            <rect
                :data-id="key"
                :x="bar.x"
                :y="bar.y"
                :width="bar.width"
                :height="bar.height"
                :fill="fillColor"
                :style="{ transition }"
                @mouseenter="handleMouseEnter"
                @mouseleave="Cartesian.cleanActive"
            />
        </Trans>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import animationMixin from '../../mixins/animation'
import Trans from '../../transitions/Trans.vue'

const DEFAULT_WIDTH = 20

export default {
    name: 'WBar',
    type: 'cartesian',
    components: {
        Trans,
    },
    mixins: [animationMixin],
    inject: ['Cartesian'],
    props: {
        datakey: VueTypes.string.isRequired,
        legend: VueTypes.string,
        width: VueTypes.number.def(DEFAULT_WIDTH),
        color: VueTypes.string,
    },
    preload ({ parent, props, index }) {
        const { snap } = parent
        const width = props.width || DEFAULT_WIDTH

        snap.barMap = [].concat(snap.barMap || [], index)
        snap.barAllWidth = snap.barAllWidth || 0
        snap.barOffset = [].concat(snap.barOffset || [], snap.barAllWidth)
        snap.barAllWidth += width
    },
    computed: {
        // Id cartesian elem
        id () {
            return this.$vnode.index
        },
        // Active elem
        active () {
            return this.Cartesian.activeCartesians.includes(this.id)
        },
        // Check color custom or default
        fillColor () {
            return this.color || this.Cartesian.colors[this.id]
        },
        barsLength () {
            return (this.Cartesian.snap.barMap || []).length
        },
        // Margin
        margin () {
            const half = (this.width / 2)
            const index = this.Cartesian.snap.barMap.indexOf(this.id)
            return (half * this.barsLength) - (this.width * index)
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
            const point = (event.target.dataset || {}).id
            this.Cartesian.setActive(
                { id: this.id, point },
                event,
                this.Cartesian.active.types.point
            )
        },
    },
}
</script>
