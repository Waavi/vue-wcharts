<template>
    <g
        v-if="active"
        class="WPie"
    >
        <foreignObject :style="contentStyles">
            <slot :values="curValues" />
        </foreignObject>

        <path
            v-for="(path, index) in paths"
            :id="index"
            :key="index"
            :d="path.d"
            :fill="path.fill"
            :stroke="path.stroke"
            :style="styles"
            @mouseenter="handleMouseEnter"
            @click="handleClick"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import { noop } from 'lodash'
import pie from 'd3-shape/src/pie'
import arc from 'd3-shape/src/arc'

export default {
    name: 'WPie',
    type: 'pie',
    inject: ['Chart'],
    props: {
        datakey: VueTypes.string.isRequired,
        angles: VueTypes.oneOfType([
            VueTypes.number,
            VueTypes.arrayOf(VueTypes.number).def([0, Math.PI * 2]),
        ]).def([0, Math.PI * 2]),
        radius: VueTypes.oneOfType([
            VueTypes.number,
            VueTypes.arrayOf(VueTypes.number).def([0, 100]),
        ]).def([0, 100]),
        styles: VueTypes.object,
        stroke: VueTypes.string.def('#FFF'),
        fill: VueTypes.string,
    },
    computed: {
        // Id cartesian elem
        id () {
            return this.$vnode.index
        },
        // Active elem
        active () {
            return this.Chart.activeElements.includes(this.id)
        },
        curRadius () {
            const innerRadius = Array.isArray(this.radius) ? this.radius[0] : 0
            const outerRadius = Array.isArray(this.radius) ? this.radius[1] : 100

            return [innerRadius, outerRadius]
        },
        // Generate angles by number or array
        curAngles () {
            const { angles } = this
            return Array.isArray(angles) ? angles : [0, angles]
        },
        // Values
        curValues () {
            return this.Chart.dataset.map(item => item[this.datakey])
        },
        // Generate arrry of arcs
        arcs () {
            return pie()
                .startAngle(this.curAngles[0])
                .endAngle(this.curAngles[1])
                .sortValues(noop)(this.curValues)
        },
        // Return the path of angles
        draw () {
            return arc()
                .innerRadius(this.curRadius[0])
                .outerRadius(this.curRadius[1])
        },
        // Generate paths array by arcs
        paths () {
            return this.arcs.map(this.draw).map((d, index) => ({
                d,
                fill: this.fill || this.Chart.colors[index],
                stroke: this.stroke,
            }))
        },
        // Slot styles
        contentStyles () {
            // eslint-disable-next-line
            const [height, width] = this.curRadius
            const size = `${width * 2}px`
            return {
                width: size,
                height: size,
                transform: `translate(-${width}px, -${width}px)`,
            }
        },
    },
    methods: {
        handleMouseEnter (event) {
            const { id } = event.target
            const value = this.curValues[id]
            const el = { id: this.id, value }

            this.Chart.setActive(el, event)
            this.$emit('onHover', el)
        },
        handleClick (event) {
            const { id } = event.target
            const value = this.curValues[id]
            const el = { id: this.id, value }

            this.Chart.setActive(el, event)
            this.$emit('onClick', el)
        },
    },
}
</script>
<style lang="scss" scoped>
.WPie {
    position: relative;
    transform: translate(50%, 50%);
}
</style>
