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
                    :fill="fillColor"
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
        legend: VueTypes.string, // To apply filters
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
        // Check color custom or default
        fillColor () {
            return this.color || this.Cartesian.colors[this.id]
        },
        barsLength () {
            return (this.Cartesian.snap.barMap || []).length
        },
        // Margin
        margin () {
            const { snap, stacked } = this.Cartesian
            const half = (this.width / 2)
            if (stacked) return half
            const index = snap.barMap.indexOf(this.id)
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
                // Get value of datakey
                const value = item[this.datakey]
                // Escape negative values
                const scaleValue = value >= 0 ? value : 0
                // Generate props
                const height = canvas.y1 - yScale(scaleValue)
                const x = (canvas.x0 + (space * index) + padding[3]) - this.margin
                const y = canvas.y1 - height
                const label = this.showLabel ? this.generateLabel({ x, y, value }) : undefined

                return {
                    x,
                    y,
                    width: this.width,
                    height,
                    label,
                }
            })
        },
        labelStylesCmp () {
            return {
                ...labelStylesDefaultProp,
                ...this.labelStyles,
            }
        },
    },
    methods: {
        // Generate label of bar
        generateLabel ({ x, y, value }) {
            const { canvas } = this.Cartesian
            // Escape negative and zero values
            const isValid = value > 0
            const position = isValid ? this.labelPosition : 'outside'
            const space = isValid ? y : canvas.y1
            // Align
            const horizontal = x + this.width / 2
            const vertical = canvas.y0 + this.labelPositions(space)[position]

            return {
                x: horizontal,
                y: vertical,
                value,
            }
        },
        // Calc label positions
        labelPositions (y) {
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
