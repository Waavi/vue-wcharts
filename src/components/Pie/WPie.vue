<template>
    <g
        v-if="visible"
        :style="stylesCmp"
    >
        <foreignObject :style="contentStyles">
            <slot :values="values" />
        </foreignObject>

        <path
            v-for="(path, i) in paths"
            :id="i"
            :key="i"
            :d="path.d"
            :fill="path.fill"
            :stroke="path.stroke"
            :style="{
                ...pathStylesCmp,
                opacity: activePath === null ? 1 : activePath === i ? 1 : opacityDisabled,
            }"
            v-on="pieListeners"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import omit from 'lodash.omit'
import noop from 'lodash.noop'
import merge from 'lodash.merge'
import pie from 'd3-shape/src/pie'
import arc from 'd3-shape/src/arc'
import themeMixin from '../../mixins/theme'

export default {
    name: 'WPie',
    type: 'pie',
    inject: ['Chart'],
    mixins: [themeMixin],
    props: {
        // internal props set by the parent (WPieChart)
        index: VueTypes.number,
        datakey: VueTypes.string.isRequired,
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('hover'),
        angles: VueTypes.oneOfType([
            VueTypes.number,
            VueTypes.arrayOf(VueTypes.number).def([0, Math.PI * 2]),
        ]).def([0, Math.PI * 2]),
        radius: VueTypes.oneOfType([
            VueTypes.number,
            VueTypes.arrayOf(VueTypes.number).def([0, 100]),
        ]).def([0, 100]),
        styles: VueTypes.object,
        pathStyles: VueTypes.shape({
            stroke: VueTypes.string,
        }).loose,
        opacityDisabled: VueTypes.number.def(0.5),
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
                ...this.themeStyles.styles,
                ...this.styles,
            }
        },
        pathStylesCmp () {
            return {
                ...omit(this.themeStyles.path, ['stroke']),
                ...omit(this.pathStyles, ['stroke']),
                ...(this.trigger === 'click' ? { cursor: 'pointer' } : {}),
            }
        },
        // Active elem
        visible () {
            return this.Chart.activeElements.includes(this.index)
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
            return this.Chart.data.map(item => item[this.datakey])
        },
        // Values
        values () {
            const total = this.curValues.reduce((acc, a) => acc + a, 0)
            return this.Chart.data.map((item, index) => ({
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
                stroke: this.pathStylesCmp.stroke,
            }))
        },
        // Event Listeners
        pieListeners () {
            return merge({}, this.$listeners, {
                click: (event) => {
                    if (this.trigger === 'click') {
                        this.setActivePath(parseInt(event.target.id, 0))
                        this.handleActive(event)
                    }
                    this.$emit('onClick')
                },
                mouseenter: (event) => {
                    if (this.trigger === 'hover') {
                        this.setActivePath(parseInt(event.target.id, 0))
                        this.handleActive(event)
                    }
                    this.$emit('onMouseenter')
                },
                mouseleave: () => {
                    if (['hover', 'click'].includes(this.trigger)) {
                        this.setActivePath(null)
                        this.Chart.cleanActive()
                    }
                    this.$emit('onMouseleave')
                },
            })
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
        setActivePath (id) {
            if ([null, undefined].includes(this.active)) this.activePath = id
        },
        handleActive (event) {
            const { id } = event.target
            const { setActive, colors } = this.Chart
            const value = this.curValues[id]
            const color = this.fill || colors[id]
            const el = {
                id,
                value: [{
                    value,
                    color,
                }],
            }
            // Set active bar to show tooltip
            setActive(el, event)
        },
    },
}
</script>
