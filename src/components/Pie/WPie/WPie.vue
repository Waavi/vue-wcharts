<template>
    <g
        v-if="active"
        class="pie-sectors"
    >
        <foreignObject
            v-if="slots"
            :style="contentStyles"
        >
            <slot />
        </foreignObject>

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
import TweenLite from 'gsap/TweenLite'
import merge from '../../../utils/merge'
import themeMixin from '../../../mixins/theme'
import visibleMixin from '../../../mixins/visible'
import { isNumber } from '../../../utils/checks'
import {
    getSectorPath, mathSign, parseDeltaAngle,
} from '../../../utils/mathsPie'

export default {
    name: 'WPie',
    type: 'pie',
    inject: ['Chart'],
    mixins: [themeMixin, visibleMixin],
    props: {
        // Internal props set by the parent (WPieChart)
        index: VueTypes.number,
        datakey: VueTypes.string,
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('hover'),
        startAngle: VueTypes.number.def(-1),
        endAngle: VueTypes.number.def(-1),
        radius: VueTypes.oneOfType([
            VueTypes.number,
            VueTypes.arrayOf(VueTypes.number).def([0, 100]),
        ]).def([0, 100]),
        maxValue: VueTypes.number.def(-1), // Max value to limit curValues
        // Styles
        styles: VueTypes.object,
        pathStyles: VueTypes.shape({
            stroke: VueTypes.string,
        }).loose,
        color: VueTypes.string,
        borderRadius: VueTypes.oneOfType([VueTypes.number, VueTypes.string]).def(0),
        opacityDisabled: VueTypes.number.def(0.5),
        // Animation
        animation: VueTypes.bool.def(true),
        animationDuration: VueTypes.number.def(2.5),
        // index of item active
        itemActive: VueTypes.oneOfType([Number, null]),
    },
    data () {
        return {
            activePath: null,
            animatedSectors: [],
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
            return this.Chart.data.map(item => (isNumber(item[this.datakey]) ? item[this.datakey] : this.maxValue))
        },
        // Sectors
        sectors () {
            const { paddingAngle, curCx, curCy } = this.Chart
            const {
                curValues, curRadius, maxValue, borderRadius,
            } = this
            const startAngle = this.startAngle >= 0 ? this.startAngle : this.Chart.startAngle
            const endAngle = this.endAngle >= 0 ? this.endAngle : this.Chart.endAngle
            const sum = maxValue >= 0 ? maxValue : this.curValues.reduce((acc, a) => acc + a, 0)
            let prev

            const { length } = curValues
            const deltaAngle = parseDeltaAngle({ startAngle, endAngle })
            const absDeltaAngle = Math.abs(deltaAngle)
            const totalPadingAngle = (absDeltaAngle >= 360 ? length : (length - 1)) * paddingAngle
            const realTotalAngle = absDeltaAngle - totalPadingAngle

            return curValues.map((value, index) => {
                let tempStartAngle
                const percentage = (isNumber(value) ? value : 0) / sum

                if (index) {
                    tempStartAngle = prev.endAngle + mathSign(deltaAngle) * paddingAngle
                } else {
                    tempStartAngle = startAngle
                }
                const tempEndAngle = tempStartAngle + mathSign(deltaAngle) * (percentage * realTotalAngle)

                prev = {
                    cx: curCx,
                    cy: curCy,
                    value,
                    percentage,
                    startAngle: tempStartAngle,
                    endAngle: tempEndAngle,
                    borderRadius,
                    ...curRadius,
                }

                return prev
            })
        },
        // Generate paths array by arcs
        paths () {
            const sectors = (this.animation ? this.animatedSectors : this.sectors)
            return sectors.map((sector, index) => ({
                d: getSectorPath(sector),
                fill: this.color || this.Chart.colors[index],
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
        // Styles
        contentStyles () {
            const { width, height } = this.Chart
            const { outerRadius } = this.curRadius
            const size = `${outerRadius * 2}px`
            return {
                width: size,
                height: size,
                transform: `translate(${width / 2 - outerRadius}px, ${height / 2 - outerRadius}px)`,
                overflow: 'initial',
            }
        },
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
        // Slots
        slots () {
            return Object.keys(this.$slots).length
        },
    },
    watch: {
        sectors: {
            handler (sectors) {
                if (this.animation) {
                    // Initialize sectors
                    const { startAngle } = this
                    this.animatedSectors = sectors.map(s => ({ ...s, startAngle, endAngle: startAngle }))
                    // Interpolate angles
                    sectors.forEach((s, index) => {
                        TweenLite.to(this.animatedSectors[index], this.animationDuration, {
                            startAngle: sectors[index].startAngle,
                            endAngle: sectors[index].endAngle,
                        })
                    })
                }
            },
            immediate: true,
        },
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
