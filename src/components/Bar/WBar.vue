<template>
    <g
        v-if="active"
        id="Bars"
    >
        <WTrans
            v-for="(bar, key) in bars"
            :key="key"
            :initialProps="{
                height: 0,
                y: Chart.canvas.y1
            }"
            :transition="transition"
        >
            <g
                :id="key"
                @mouseenter="handleMouseEnter"
                @mouseleave="Chart.cleanActive"
            >
                <rect
                    :x="bar.x"
                    :y="bar.y"
                    :width="bar.width"
                    :height="bar.height"
                    :fill="fill"
                    :style="{ styles, transition }"
                />
                <g
                    v-if="bar.label"
                >
                    <slot
                        name="label"
                        v-bind="bar.label"
                        :styles="{ ...labelStylesCmp, transition, transform: `translateY(${bar.label.y}px)` }"
                        :align="labelAlign"
                        :size="labelSize"
                    >
                        <text
                            :x="bar.label.x"
                            :y="0"
                            :text-anchor="labelAlign"
                            :font-size="labelSize"
                            :style="{ ...labelStylesCmp, transition, transform: `translateY(${bar.label.y}px)` }"
                        >
                            <slot
                                name="labelValue"
                                v-bind="bar.label"
                            >
                                {{ bar.label.value }}
                            </slot>
                        </text>
                    </slot>
                </g>
                <g
                    v-if="bar.stackedLabel"
                >
                    <slot
                        name="stackedLabel"
                        v-bind="bar.stackedLabel"
                        :styles="{ ...stackedLabelStylesCmp, transition, transform: `translateY(${bar.stackedLabel.y}px)` }"
                        :align="stackedLabelAlign"
                        :size="stackedLabelSize"
                    >
                        <text
                            v-if="bar.stackedLabel"
                            :x="bar.stackedLabel.x"
                            :y="0"
                            :text-anchor="stackedLabelAlign"
                            :font-size="stackedLabelSize"
                            :style="{ ...stackedLabelStylesCmp, transition, transform: `translateY(${bar.stackedLabel.y}px)` }"
                        >
                            <slot
                                name="stackedLabelValue"
                                v-bind="bar.stackedLabel"
                            >
                                {{ bar.stackedLabel.stackedValue }}
                            </slot>
                        </text>
                    </slot>
                </g>
            </g>
        </WTrans>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import animationMixin from '../../mixins/animation'
import { WTrans } from '../../transitions'

const DEFAULT_WIDTH = 20

const labelStylesDefaultProp = {
    fill: '#333',
    cursor: 'default',
}

const stackedLabelStylesDefaultProp = {
    fill: '#333',
    cursor: 'default',
}

export default {
    name: 'WBar',
    type: 'cartesian',
    components: {
        WTrans,
    },
    mixins: [animationMixin],
    inject: ['Chart'],
    props: {
        datakey: VueTypes.string.isRequired,
        legend: VueTypes.string, // Prop to apply filters
        showLabel: VueTypes.bool.def(false),
        labelSize: VueTypes.number.def(12),
        labelAlign: VueTypes.oneOf(['start', 'middle', 'end']).def('middle'),
        labelPosition: VueTypes.oneOf(['inside', 'outside']).def('outside'),
        labelStyles: VueTypes.object,
        showStackedLabel: VueTypes.bool.def(false),
        stackedLabelSize: VueTypes.number.def(12),
        stackedLabelAlign: VueTypes.oneOf(['start', 'middle', 'end']).def('middle'),
        stackedLabelStyles: VueTypes.object,
        width: VueTypes.number.def(DEFAULT_WIDTH),
        color: VueTypes.string,
        styles: VueTypes.object,
    },
    // It's called by parent components to necessary calcs before be rendering
    preload ({ parent, props, index }) {
        const { snap, colors, stacked } = parent
        const { datakey, width, color } = props

        // Added id of bars
        snap.barIds = [].concat(snap.barIds || [], index)
        // Set datakeys by id
        snap.barsByDatakeys = { ...snap.barsByDatakeys, [index]: datakey }
        // Set colors
        snap.barsDatakeysColors = { ...snap.barsDatakeysColors, [datakey]: color || colors[index] }
        // Calc dimension
        snap.barAllWidth = snap.barAllWidth || 0
        snap.barOffset = [].concat(snap.barOffset || [], snap.barAllWidth)
        snap.barAllWidth = (stacked ? width : snap.barAllWidth + width) || DEFAULT_WIDTH
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
        // Check color custom or default
        fill () {
            return this.Chart.snap.barsDatakeysColors[this.datakey]
        },
        // Get yAxis origin by bounds.min or zero
        y () {
            const { bounds, yScale } = this.Chart
            const min = Math.max(bounds.min, 0)
            return yScale(min)
        },
        // Margin
        margin () {
            const { id, width } = this
            const { snap, stacked } = this.Chart
            const index = snap.barIds.indexOf(id)

            return stacked
                ? -width / 2
                : snap.barOffset[index] - (snap.barAllWidth / 2)
        },
        // Points
        points () {
            const {
                padding, bounds, canvas, curData,
            } = this.Chart
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
                const label = end - start
                const stackedValue = end

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

                return [x, y, y0, label, stackedValue]
            })
        },
        // Bars
        bars () {
            // Generate bars array
            return this.points.map((point, index) => {
                const [x0, y0, y1, value, stackedValue] = point
                // Generate coords
                const height = y1 - y0
                const x = x0 + this.margin
                const y = height < 0 ? y1 : y0
                const label = this.getLabel({
                    x, y, value, height,
                })
                const stackedLabel = this.getStackedLabel({
                    x, y, stackedValue, height,
                })

                return {
                    x,
                    y,
                    width: this.width,
                    height: Math.abs(height),
                    label,
                    stackedLabel,
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
        // Stacked label styles
        stackedLabelStylesCmp () {
            return {
                ...stackedLabelStylesDefaultProp,
                ...this.stackedLabelStyles,
            }
        },
    },
    methods: {
        // Generate label of bar
        getLabel ({
            x, y, value, height,
        }) {
            if (!this.showLabel) return undefined

            // Not render inside label if doesnt enter correctly
            if (height < this.labelSize * 2) return undefined

            // Calc position of label [x, y]
            const top = (this.Chart.stacked || this.labelPosition === 'inside' ? -(this.labelSize) : this.labelSize)
            const x0 = x + this.width / 2
            const y1 = y - top + this.labelSize / 2

            return {
                x: x0,
                y: y1,
                value,
            }
        },
        getStackedLabel ({
            x, y, stackedValue, height,
        }) {
            if (!this.showStackedLabel) return undefined

            // Only render if is stacked
            if (!this.Chart.stacked) return undefined

            // Only last bar shown the stacked label
            if (this.id !== this.getLastBarActive()) return undefined

            // If label is printed outside, not render staked label
            if (this.showLabel && this.labelPosition === 'outside') return undefined

            // Calc position of label [x, y]
            const top = this.stackedLabelSize
            const x0 = x + this.width / 2
            const y1 = y - top + this.stackedLabelSize / 2

            return {
                x: x0,
                y: y1,
                stackedValue,
            }
        },
        // Set active element
        handleMouseEnter (event) {
            const {
                stacked, curData, setActive, snap, axis,
            } = this.Chart
            const { id } = event.target
            const line = this.Chart.dataset[id]
            const label = line[axis.x.datakey]

            // Generate tooltip config
            const values = curData.map((item) => {
                const { key } = item
                const color = snap.barsDatakeysColors[key]
                const value = item[id].data[key]
                return {
                    key,
                    color,
                    value,
                }
            })
            // Set multiple values if has stacked bars, or set only one value
            const value = stacked ? values : [values.find(v => v.key === this.datakey)]
            // Set active bar to show tooltip
            setActive({ id: this.id, label, value }, event)
        },
        // Return id of last bar active
        getLastBarActive () {
            const { snap, activeElements } = this.Chart
            const bars = [...snap.barIds].reverse()
            const cartesians = [...activeElements].reverse()
            return cartesians.find(el => bars.includes(el))
        },
    },
}
</script>
