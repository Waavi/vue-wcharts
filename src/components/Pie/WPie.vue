<template>
    <g
        v-if="visible"
        class="WPie"
    >
        <foreignObject :style="contentStyles">
            <slot :values="values" />
        </foreignObject>

        <path
            v-for="(path, index) in paths"
            :id="index"
            :key="index"
            :d="path.d"
            :fill="path.fill"
            :stroke="path.stroke"
            :style="stylesCmp"
            :class="{
                disabled: activePath !== null && activePath !== index,
                enabled: activePath !== null && activePath === index
            }"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
            @click="handleClick"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import { noop, omit } from 'lodash'
import pie from 'd3-shape/src/pie'
import arc from 'd3-shape/src/arc'

const stylesDefaultProp = {
    stroke: '#FFF',
}

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
        styles: VueTypes.shape({
            stroke: VueTypes.string,
        }).loose.def(() => ({
            ...stylesDefaultProp,
        })),
        active: VueTypes.oneOfType([Number, null]),
    },
    data () {
        return {
            activePath: null,
        }
    },
    computed: {
        stylesCmp () {
            return {
                ...omit(stylesDefaultProp, ['stroke']),
                ...omit(this.styles, ['stroke']),
            }
        },
        // Id cartesian elem
        id () {
            return this.$vnode.index
        },
        // Active elem
        visible () {
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
        // Values
        values () {
            const total = this.curValues.reduce((acc, a) => acc + a, 0)
            return this.Chart.dataset.map((item, index) => ({
                ...item,
                percentage: item[this.datakey] * 100 / total,
                color: this.Chart.colors[index],
            }))
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
                fill: this.Chart.colors[index],
                stroke: this.styles.stroke,
            }))
        },
        // Slot styles
        contentStyles () {
            const [, width] = this.curRadius
            const size = `${width * 2}px`
            return {
                width: size,
                height: size,
                transform: `translate(-${width}px, -${width}px)`,
            }
        },
    },
    watch: {
        active (newValue) {
            this.activePath = newValue
        },
    },
    methods: {
        handleMouseEnter (event) {
            if ([null, undefined].includes(this.active)) this.activePath = parseInt(event.target.id, 0)
            this.handleActive(event, 'onHover')
        },
        handleMouseLeave () {
            if ([null, undefined].includes(this.active)) this.activePath = null
            this.Chart.cleanActive()
        },
        handleClick (event) {
            this.handleActive(event, 'onClick')
        },
        handleActive (event, eventName) {
            const { id } = event.target
            const value = this.curValues[id]
            const color = this.fill || this.Chart.colors[id]
            const el = {
                id,
                value: [{
                    value,
                    color,
                }],
            }

            this.Chart.setActive(el, event)
            this.$emit(eventName || 'onEvent', el)
        },
    },
}
</script>
<style lang="scss" scoped>
.WPie {
    position: relative;
    transform: translate(50%, 50%);
}
.enabled {
    opacity: 1;
}
.disabled {
    opacity: 0.5;
}
</style>
