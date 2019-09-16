<template>
    <g
        v-if="active"
        id="Bars"
    >
        <g
            v-for="(bar, key) in bars"
            :id="key"
            :key="`${key}-${bar.x}-${bar.y}-${bar.color}`"
            v-on="barListeners"
        >
            <defs v-if="bar.isLastBar">
                <clipPath :id="`path-${key}-${pathId}`">
                    <rect
                        :rx="borderRadius[0]"
                        :ry="borderRadius[1] || borderRadius[0]"
                        :x="bar.x"
                        :y="bar.y"
                        :width="bar.width"
                        :height="(bar.accHeight + (!borderRadius[1] ? 20 : 0))"
                        fill="tomato"
                    />
                </clipPath>
            </defs>

            <g
                id="line"
                :style="{ 'clip-path': `url(#path-${key}-${pathId})`}"
            >
                <WTrans
                    :initialProps="{
                        height: 0,
                        width: 0,
                        y: y,
                        x: bar.x + (adjustedWidth / 2) / (Chart.numberOfBarsPerGroup - xPosition),
                    }"
                    :transition="transition"
                >
                    <rect
                        :x="bar.x"
                        :y="bar.y"
                        :width="bar.width"
                        :height="bar.height"
                        :fill="bar.color"
                        :style="{ ...stylesCmp, transition }"
                    />
                </WTrans>
            </g>
            <g
                v-if="bar.label"
                id="label"
            >
                <WTrans
                    :initialProps="{
                        opacity: 0,
                    }"
                    :transition="`all ${transDuration / 2}s ${transDuration}s ${transEffect}`"
                >
                    <slot
                        name="label"
                        v-bind="bar.label"
                        :datakey="datakey"
                        :index="key"
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
                                :datakey="datakey"
                                :index="key"
                            >
                                {{ bar.label.value }}
                            </slot>
                        </text>
                    </slot>
                </WTrans>
            </g>
            <g
                v-if="bar.stackedLabel"
                id="label"
            >
                <WTrans
                    :initialProps="{
                        opacity: 0,
                    }"
                    :transition="`all ${transDuration / 2}s ${transDuration}s ${transEffect}`"
                >
                    <slot
                        name="stackedLabel"
                        v-bind="bar.stackedLabel"
                        :index="key"
                        :styles="{ ...stackedLabelStylesCmp, transition, transform: `translateY(${bar.stackedLabel.y}px)` }"
                        :align="stackedLabelAlign"
                        :size="stackedLabelSize"
                    >
                        <text
                            :x="bar.stackedLabel.x"
                            :y="0"
                            :text-anchor="stackedLabelAlign"
                            :font-size="stackedLabelSize"
                            :style="{ ...stackedLabelStylesCmp, transition, transform: `translateY(${bar.stackedLabel.y}px)` }"
                        >
                            <slot
                                name="stackedLabelValue"
                                v-bind="bar.stackedLabel"
                                :index="key"
                            >
                                {{ bar.stackedLabel.stackedValue }}
                            </slot>
                        </text>
                    </slot>
                </WTrans>
            </g>
        </g>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import merge from '../../utils/merge'
import { random } from '../../utils/maths'
import animationMixin from '../../mixins/animation'
import themeMixin from '../../mixins/theme'
import visibleMixin from '../../mixins/visible'
import { WTrans } from '../../transitions'

const DEFAULT_WIDTH = 32

export default {
    name: 'WBar',
    type: 'cartesian',
    subtype: 'bar',
    components: {
        WTrans,
    },
    mixins: [animationMixin, themeMixin, visibleMixin],
    inject: ['Chart'],
    props: {
        id: VueTypes.string,
        // Settings
        index: VueTypes.number, // internal props set by the parent (WPieChart)
        datakey: VueTypes.string.isRequired,
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('hover'),
        legend: VueTypes.string, // Prop to apply filters
        stacked: VueTypes.bool.def(false),
        // Label
        showLabel: VueTypes.bool.def(false),
        labelSize: VueTypes.number.def(12),
        labelAlign: VueTypes.oneOf(['start', 'middle', 'end']).def('middle'),
        labelPosition: VueTypes.oneOf(['inside', 'outside']).def('inside'),
        labelStyles: VueTypes.object,
        showStackedLabel: VueTypes.bool.def(false),
        stackedLabelSize: VueTypes.number.def(12),
        stackedLabelAlign: VueTypes.oneOf(['start', 'middle', 'end']).def('middle'),
        stackedLabelStyles: VueTypes.object,
        // Styles
        width: VueTypes.number.def(DEFAULT_WIDTH),
        color: VueTypes.oneOfType([
            VueTypes.string,
            VueTypes.arrayOf(VueTypes.string),
        ]),
        rounded: VueTypes.oneOfType([
            VueTypes.number,
            VueTypes.arrayOf(VueTypes.number),
        ]).def([5, 0]),
        styles: VueTypes.object,
    },
    // It's called by parent components to necessary calcs before be rendering
    // Componen is not mounted and cannot access to default props
    preload ({ parent, props, index }) {
        const { snap, colors, data } = parent
        const { datakey, color, stacked } = props

        const isStacked = stacked !== undefined && stacked !== false

        // Added id of bars
        snap.barIds = [].concat(snap.barIds || [], index)
        if (isStacked) snap.stackedBarIds = [].concat(snap.stackedBarIds || [], index)

        // Set datakeys by index
        snap.barsByIndex = { ...snap.barsByIndex, [index]: { datakey } }
        if (isStacked) {
            snap.stackedBarsByIndex = {
                ...snap.stackedBarsByIndex,
                [index]: { datakey },
            }
        }

        // Set colors
        if (!snap.barsDatakeysColors) snap.barsDatakeysColors = []
        // Default color
        if (!color) {
            snap.barsDatakeysColors = {
                ...snap.barsDatakeysColors,
                [datakey]: Array(data.length).fill(colors[index]),
            }
            // Same color for every bar: string
        } else if (typeof color === 'string') {
            snap.barsDatakeysColors = {
                ...snap.barsDatakeysColors,
                [datakey]: Array(data.length).fill(color),
            }
            // Different color for every bar: array
        } else if (!!color && color.length > 0) {
            snap.barsDatakeysColors = {
                ...snap.barsDatakeysColors,
                [datakey]: color,
            }
        }
    },
    computed: {
        // Active elem
        active () {
            return this.Chart.activeElements.includes(this.index)
        },
        // Path unique Id
        pathId () {
            return this.stacked ? this.Chart.chartId : (this.id || `bar-${random()}`)
        },
        // Sanitize rounded prop to borderRadius
        borderRadius () {
            return Array.isArray(this.rounded) ? this.rounded.slice(0, 2) : Array(2).fill(this.rounded)
        },
        // Get yAxis origin by bounds.min or zero
        y () {
            const { bounds, yScale } = this.Chart
            const min = Math.max(bounds.min, 0)
            return yScale(min)
        },
        // Get postition of the bar in every group of bars
        xPosition () {
            const { index, stacked } = this
            const { positionsPerGroupOfBars } = this.Chart
            return positionsPerGroupOfBars.indexOf(
                positionsPerGroupOfBars.find(item => (!stacked ? item === index : Array.isArray(item)))
            )
        },
        // Margin
        margin () {
            const { adjustedWidth, offset } = this
            const { numberOfBarsPerGroup } = this.Chart
            return offset - (numberOfBarsPerGroup * adjustedWidth) / 2
        },
        // Offset
        offset () {
            return this.adjustedWidth * this.xPosition
        },
        // Adjusted width
        adjustedWidth () {
            return Math.min(this.width, this.Chart.maxBarWidth)
        },
        // Points
        points () {
            const {
                padding, bounds, canvas, curData, yScale,
            } = this.Chart
            const low = bounds.min
            const { x0 } = canvas

            // Filter data by datakey
            const data = curData.filter(arr => arr.key === this.datakey)[0] || []

            // Calc space between bars
            const space = (canvas.width - (padding[1] + padding[3])) / Math.max(data.length - 1, 1)
            // Generate points array
            return data.map((value, i) => {
                let [start, end] = value
                const label = end - start
                const stackedValue = end < 0 ? start : end

                // If start value is negative, reverse values
                if (start < 0) {
                    [end, start] = value
                }

                // Calc max value
                start = Math.max(low, start)
                // Calc yAxis, if value is negative the yAxis it's bound.min
                const y0 = yScale(end)
                // Calc yAxis separation between points, if has stacked bars
                const y1 = yScale(start)
                // Calc acc height bar
                const accHeight = yScale(0) - y0
                // Calc xAxis pos
                const x = x0 + space * (data.length === 1 ? 0.5 : i) + padding[3]
                return [x, y0, y1, label, stackedValue, accHeight]
            })
        },
        // Bars
        bars () {
            // Generate bars array
            return this.points.map((point, index) => {
                const [x0, y0, y1, value, stackedValue, accHeight] = point
                // Generate coords
                const height = y1 - y0
                const x = x0 + this.margin
                const y = height < 0 ? y1 : y0
                const yLabel = height > 0 ? y : y0
                const label = this.getLabel({
                    x,
                    y: yLabel,
                    value,
                    height,
                })
                const stackedLabel = this.getStackedLabel({
                    x,
                    y: yLabel,
                    stackedValue,
                })
                // Set color
                const color = this.Chart.snap.barsDatakeysColors[this.datakey][index]

                return {
                    x,
                    y,
                    y0,
                    y1,
                    width: this.adjustedWidth,
                    height: Math.abs(height),
                    label,
                    stackedLabel,
                    color,
                    isLastBar: this.isLastBar,
                    accHeight,
                }
            })
        },
        // Event Listeners
        barListeners () {
            return merge({}, this.$listeners, {
                click: (event) => {
                    if (this.trigger === 'click') this.handleActive(event)
                    this.$emit('onClick')
                },
                mouseenter: (event) => {
                    if (this.trigger === 'hover') this.handleActive(event)
                    this.$emit('onMouseenter')
                },
                mouseleave: () => {
                    if (['hover', 'click'].includes(this.trigger)) this.Chart.cleanActive()
                    this.$emit('onMouseleave')
                },
            })
        },
        // Check if label position it is inside
        isLabelInside () {
            return this.labelPosition === 'inside'
        },
        // Check is it is lat bar
        isLastBar () {
            return !this.stacked || this.index === this.getLastBarActive()
        },
        // Styles
        stylesCmp () {
            return {
                ...this.themeStyles.styles,
                ...this.styles,
            }
        },
        // Label styles
        labelStylesCmp () {
            return {
                ...this.themeStyles.label,
                ...this.labelStyles,
            }
        },
        // Stacked label styles
        stackedLabelStylesCmp () {
            return {
                ...this.themeStyles.stackedLabel,
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
            if (this.isLabelInside && Math.abs(height) < this.labelSize * 2) return undefined
            // Warn user if set inside position on stacked bar chart: forbidden position
            if (!this.isLabelInside && this.stacked) {
                console.warn(
                    "labelPosition cannot be set to 'outside' position on stacked bar chart"
                )
                return undefined
            }

            // Calc position of label [x, y]
            const top =
        this.stacked || this.isLabelInside ? -this.labelSize : this.labelSize
            const x0 = x + this.adjustedWidth / 2
            const y1 = y + this.labelSize / 2 + (height >= 0 ? -top : top)

            return {
                x: x0,
                y: y1,
                value,
            }
        },
        getStackedLabel ({ x, y, stackedValue }) {
            if (
                !this.showStackedLabel ||
                stackedValue === 0 || // Hide labels if value it's zero
                !this.isLastBar || // Only last bar shown the stacked label
                (this.showLabel && !this.isLabelInside) // If label is printed outside, not render staked label
            ) return undefined
            // Calc position of label [x, y]
            const top = this.stackedLabelSize
            const x0 = x + this.adjustedWidth / 2
            const y1 =
            y + this.stackedLabelSize / 2 + (stackedValue > 0 ? -top : top)

            return {
                x: x0,
                y: y1,
                stackedValue,
            }
        },
        // Set active element
        handleActive (event) {
            const {
                stackedCurData, barsCurData, setActive, snap, axis,
            } = this.Chart
            const { id } = event.currentTarget
            const datum = this.Chart.data[id]
            const label = datum[axis.x.datakey]

            // Generate tooltip config
            const values = (this.stacked ? stackedCurData : barsCurData).map((item) => {
                const { key } = item
                const color = snap.barsDatakeysColors[key][id]
                const value = item[id].data[key]

                return {
                    key,
                    color,
                    value,
                }
            })
            // Set multiple values if has stacked bars, or set only one value
            const value = this.stacked
                ? values
                : [values.find(v => v.key === this.datakey)]
            // Set active bar to show tooltip
            setActive({
                id: this.index, label, value, datum,
            }, event)
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
