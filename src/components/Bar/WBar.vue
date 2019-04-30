<template>
    <g
        v-if="active"
        id="Bars"
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
            <g
                :id="key"
                @mouseenter="handleMouseEnter"
                @mouseleave="Cartesian.cleanActive"
            >
                <rect
                    :x="bar.x"
                    :y="bar.y"
                    :width="bar.width"
                    :height="bar.height"
                    :fill="fill"
                    :style="{ styles, transition }"
                />
                <slot
                    name="label"
                    v-bind="bar.label"
                >
                    <text
                        v-if="bar.label"
                        :x="bar.label.x"
                        :y="0"
                        :text-anchor="labelTextAnchor"
                        :font-size="labelSize"
                        :style="{ ...labelStylesCmp, transition, transform: `translateY(${bar.label.y}px)` }"
                    >
                        {{ bar.label.value }}
                    </text>
                </slot>
            </g>
        </Trans>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import animationMixin from '../../mixins/animation'
import Trans from '../../transitions/Trans.vue'

const DEFAULT_WIDTH = 20

const labelStylesDefaultProp = {
    fill: '#333',
    cursor: 'default',
}

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
        legend: VueTypes.string, // Prop to apply filters
        showLabel: VueTypes.bool.def(false),
        labelSize: VueTypes.number.def(12),
        labelTextAnchor: VueTypes.oneOf(['start', 'middle', 'end']).def('middle'),
        labelPosition: VueTypes.oneOf(['inside', 'outside']).def('outside'),
        labelStyles: VueTypes.object,
        width: VueTypes.number.def(DEFAULT_WIDTH),
        color: VueTypes.string,
        styles: VueTypes.object,
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
        // Points
        points () {
            return this.Cartesian.dataset.map(data => data[this.datakey])
        },
        // Check color custom or default
        fill () {
            return this.color || this.Cartesian.colors[this.id]
        },
        // Get yAxis origin by bounds.min or zero
        y () {
            const { bounds, yScale } = this.Cartesian
            const min = Math.max(bounds.min, 0)
            return yScale(min)
        },
        // Margin
        margin () {
            const { snap, stacked } = this.Cartesian
            const half = (this.width / 2)
            if (stacked) return half
            const index = snap.barMap.indexOf(this.id)
            return (half * snap.barMap.length) - (this.width * index)
        },
        // Bars
        bars () {
            const { canvas, padding, yScale } = this.Cartesian
            const space = (canvas.width - (padding[1] + padding[3])) / (this.points.length - 1)

            // Generate Bars
            return this.points.map((value, index) => {
                const dimension = this.y - yScale(value)
                const x = (canvas.x0 + (space * index) + padding[3]) - this.margin
                const y = this.y - Math.max(dimension, 0)

                return {
                    x,
                    y,
                    width: this.width,
                    height: Math.abs(dimension),
                    label: this.getLabel({ x, y, value }),
                }
            })
        },
        // Label styles
        labelStylesCmp () {
            return {
                ...labelStylesDefaultProp,
                ...this.labelStyles,
            }
        },
    },
    methods: {
        // Generate label of bar
        getLabel ({ x, y, value }) {
            if (!this.showLabel) return undefined
            const horizontal = x + this.width / 2
            const vertical = this.Cartesian.canvas.y0 + this.labelTop(y)[this.labelPosition]

            return {
                x: horizontal,
                y: vertical,
                value,
            }
        },
        // Calc label positions
        labelTop (y) {
            return {
                outside: y - this.labelSize * 2 - this.labelSize / 2,
                inside: y - this.labelSize,
            }
        },
        // Set active element
        handleMouseEnter (event) {
            const point = (event.target || {}).id
            this.Cartesian.setActive(
                { id: this.id, point },
                event,
                this.Cartesian.active.types.point
            )
        },
    },
}
</script>