<template>
    <g
        v-if="active"
        class="pie-sectors"
    >
        <g
            v-for="(path, i) in paths"
            :key="i"
            class="pie-sector"
        >
            <path
                :id="i"
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
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import omit from 'lodash.omit'
import merge from '../../utils/merge'
import themeMixin from '../../mixins/theme'
import visibleMixin from '../../mixins/visible'
import { isNumber } from '../../utils/checks'
import {
    getSectorPath, mathSign, parseDeltaAngle,
} from '../../utils/mathsPie'

export default {
    name: 'WPie',
    type: 'pie',
    inject: ['Chart'],
    mixins: [themeMixin, visibleMixin],
    props: {
        // internal props set by the parent (WPieChart)
        index: VueTypes.number,
        datakey: VueTypes.string.isRequired,
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('hover'),
        radius: VueTypes.oneOfType([
            VueTypes.number,
            VueTypes.arrayOf(VueTypes.number).def([0, 100]),
        ]).def([0, 100]),
        styles: VueTypes.object,
        pathStyles: VueTypes.shape({
            stroke: VueTypes.string,
        }).loose,
        opacityDisabled: VueTypes.number.def(0.5),
        // index of item active
        itemActive: VueTypes.oneOfType([Number, null]),
    },
    data () {
        return {
            activePath: null,
        }
    },
    computed: {
        // Active elem
        active () {
            return this.Chart.activeElements.includes(this.index)
        },
        // Radius
        curRadius () {
            const innerRadius = Array.isArray(this.radius) ? this.radius[0] : 0
            const outerRadius = Array.isArray(this.radius) ? this.radius[1] : 100

            return { innerRadius, outerRadius }
        },
        // Values
        curValues () {
            return this.Chart.data.map(item => item[this.datakey])
        },
        // Sectors
        sectors () {
            const {
                startAngle, endAngle, paddingAngle, curCx, curCy,
            } = this.Chart
            let prev
            const sum = this.curValues.reduce((acc, a) => acc + a, 0)

            const len = this.curValues.length
            const deltaAngle = parseDeltaAngle({ startAngle, endAngle })
            const absDeltaAngle = Math.abs(deltaAngle)
            const totalPadingAngle = (absDeltaAngle >= 360 ? len : (len - 1)) * paddingAngle
            const realTotalAngle = absDeltaAngle - totalPadingAngle

            return this.curValues.map((value, index) => {
                let tempStartAngle
                const percentage = (isNumber(value) ? value : 0) / sum

                if (index) {
                    tempStartAngle = prev.endAngle + mathSign(deltaAngle) * paddingAngle
                } else {
                    tempStartAngle = startAngle
                }
                const tempEndAngle = tempStartAngle + mathSign(deltaAngle) * (percentage * realTotalAngle)

                prev = {
                    name: `Group ${index}`,
                    cx: curCx,
                    cy: curCy,
                    value,
                    percentage,
                    startAngle: tempStartAngle,
                    endAngle: tempEndAngle,
                    ...this.curRadius,
                }

                return prev
            })
        },
        // Generate paths array by arcs
        paths () {
            return this.sectors.map((sector, index) => ({
                d: getSectorPath(sector),
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
    },
    watch: {
        itemActive: {
            handler (id) {
                if (id) this.activePath = id
            },
            immediate: true,
        },
    },
    methods: {
        setActivePath (id) {
            if ([null, undefined].includes(this.itemActive)) this.activePath = id
        },
        handleActive (event) {
            const { id } = event.target
            const { setActive, colors } = this.Chart
            const datum = this.Chart.data[id]
            const color = this.fill || colors[id]
            const value = [{ value: this.curValues[id], color }]
            // Set active bar to show tooltip
            setActive({
                id, value, datum,
            }, event)
        },
    },
}
</script>
