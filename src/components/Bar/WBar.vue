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
            const { id, width } = this
            const { snap, stacked } = this.Cartesian
            const index = snap.barMap.indexOf(id)

            return stacked
                ? -width / 2
                : snap.barOffset[index] - (snap.barAllWidth / 2)
        },
        // Points
        points () {
            const {
                padding, bounds, canvas, curData,
            } = this.Cartesian
            const low = bounds.min
            const { x0, y1, height } = canvas
            const yRatio = height / (bounds.max - bounds.min)

            // Filter data by datakey
            const data = curData.filter(arr => arr.key === this.datakey)[0] || []
            // Calc space between bars
            const space = (canvas.width - (padding[1] + padding[3])) / (data.length - 1)

            // Generate points array
            return data.map((value, i) => {
                let [start, end] = value
                const label = end

                // If start value is negative, reverse values
                if (start < 0) {
                    [end, start] = value
                }

                // Calc max value
                start = Math.max(low, start)

                // Calc yAxis, if value is negative the yAxis it's bound.min
                const y = !end ? this.y : y1 - (end - low) * yRatio
                // Calc yAxis separation between points, if has stacked bars
                const y0 = !start ? this.y : y1 - (start - low) * yRatio
                // Calc xAxis pos
                const x = (x0 + (space * i) + padding[3])

                return [x, y, y0, label]
            })
        },
        // Bars
        bars () {
            // Generate bars array
            return this.points.map((point, index) => {
                const [x0, y0, y1, value] = point
                // Generate coords
                const height = y1 - y0
                const x = x0 + this.margin
                const y = height < 0 ? y1 : y0
                // Get bar label
                const label = this.getLabel({ x, y, value })

                return {
                    x,
                    y,
                    width: this.width,
                    height: Math.abs(height),
                    label,
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
            // If has stacked bars, only last bar shown the label
            const { stacked, canvas } = this.Cartesian
            if (stacked && this.id !== this.getLastBarActive()) return undefined

            // Calc position of label [x, y]
            const x0 = x + this.width / 2
            const y1 = canvas.y0 + this.labelTop(y)[this.labelPosition]

            return {
                x: x0,
                y: y1,
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
            const {
                stacked, curData, setActive, colors, snap,
            } = this.Cartesian
            const { id } = event.target
            const line = this.Cartesian.dataset[id]

            // Generate tooltip config
            const values = curData.map(item => ({
                color: colors[snap.barMap[item.index]],
                value: line[item.key],
                key: item.key,
            }))
            // Set multiple values if has stacked bars, or set only one value
            const value = stacked ? values : [values.find(v => v.key === this.datakey)]

            // Set active bar to show tooltip
            setActive({ id: this.id, value }, event)
        },
        // Return id of last bar active
        getLastBarActive () {
            const { snap, activeCartesians } = this.Cartesian
            const bars = [...snap.barMap].reverse()
            const cartesians = [...activeCartesians].reverse()
            return cartesians.find(el => bars.includes(el))
        },
    },
}
</script>
