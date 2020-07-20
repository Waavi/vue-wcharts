<template>
    <g
        :id="id"
        class="WRadiusAxis"
    >
        <!-- <line
            v-if="lineProps"
            v-bind="lineProps"
        />
        <g
            v-for="({ tickX, value, label, textProps }, index) in ticksWithInfo"
            :key="index"
        >
            <line
                v-if="!hideTickMark && tickX"
                :x1="tickX"
                :y1="tickY"
                :x2="tickX"
                :y2="isOnTop ? tickY + tickLength : tickY - tickLength"
                v-bind="actualStyles.tick"
            />
            <slot
                v-if="tickX"
                name="tick"
                :value="value"
                :label="label"
                :index="index"
                :styles="actualStyles.tickLabel"
            >
                <WAxisText
                    v-if="label || label === 0"
                    :x="tickX"
                    :y="tickY"
                    :value="label"
                    v-bind="textProps"
                    :styles="actualStyles.tickLabel"
                    #default="{ value }"
                >
                    <slot
                        name="tickText"
                        :value="value"
                    >
                        {{ value }}
                    </slot>
                </WAxisText>
            </slot>
        </g> -->

        <!-- <slot
            name="label"
            v-bind="labels"
            :styles="actualStyles.label"
        >
            <WAxisLabel
                v-if="label"
                v-bind="labels"
                :styles="actualStyles.label"
            />
        </slot> -->
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import { AXIS_TYPE, AXIS_TYPE_LIST, AXIS_DIMENSION } from '../axisMixin'
import printableAxisMixin from '../printableAxisMixin'
// import WAxisText from '../WAxisText/WAxisText.vue'

export default {
    name: 'WRadiusAxis',
    dimension: AXIS_DIMENSION.RADIUS,
    components: {
        // WAxisText,
    },
    mixins: [
        printableAxisMixin,
    ],
    props: {
        id: VueTypes.string.def(AXIS_DIMENSION.RADIUS),
        type: VueTypes.oneOf(AXIS_TYPE_LIST).def(AXIS_TYPE.NUMERIC),
        invisible: VueTypes.bool.def(true),
        xRef: VueTypes.number.def(0.5),
        yRef: VueTypes.number.def(0.5),
        angleRef: VueTypes.number.def(0),
        outerRadius: VueTypes.number.optional,

        labelAlign: VueTypes.oneOf(['start', 'middle', 'end']).def('end'),
    },
    computed: {
        actualXRef () {
            const { Chart: { canvas }, xRef } = this
            const x = (xRef > 0 && xRef <= 1) ? xRef * canvas.width : xRef
            return canvas.left + x
        },
        actualYRef () {
            const { Chart: { canvas }, yRef } = this
            const y = (yRef > 0 && yRef <= 1) ? yRef * canvas.height : yRef
            return canvas.top + canvas.height - y
        },
        actualOuterRadius () {
            const {
                Chart: { canvas }, outerRadius, actualXRef, actualYRef,
            } = this
            if (outerRadius !== undefined) {
                if (outerRadius > 0 && outerRadius <= 1) {
                    const maxRadius = Math.min(canvas.width, canvas.height) / 2
                    return maxRadius * outerRadius
                }
                return outerRadius
            }
            return Math.min(
                Math.abs(actualXRef - canvas.left),
                Math.abs(actualXRef - canvas.left + canvas.width),
                Math.abs(actualYRef - canvas.top),
                Math.abs(actualYRef - canvas.top + canvas.height),
            )
        },

        actualRange () {
            const { actualOuterRadius } = this
            return [0, actualOuterRadius]
        },

        // lineY () {
        //     const { outerLayout, isOnTop } = this
        //     return isOnTop ? outerLayout.y + outerLayout.height : outerLayout.y
        // },
        // lineProps () {
        //     const {
        //         invisible, hideLine, lineY, outerLayout, actualStyles,
        //     } = this
        //     if (invisible || hideLine) return undefined
        //     return {
        //         x1: outerLayout.x,
        //         y1: lineY,
        //         x2: outerLayout.x + outerLayout.width,
        //         y2: lineY,
        //         style: actualStyles.line,
        //     }
        // },
        // tickY () {
        //     const { lineY, tickLength, isOnTop } = this
        //     return isOnTop ? lineY - tickLength : lineY + tickLength
        // },
        // ticksWithInfo () {
        //     const {
        //         invisible, actualTicks, scale, tickFormatter, tickLength, isOnTop,
        //     } = this
        //     if (invisible) return []
        //     const verticalPadding = tickLength + 2
        //     const textProps = {
        //         'dominant-baseline': isOnTop ? 'baseline' : 'hanging',
        //         'text-anchor': 'middle',
        //         dx: '1',
        //         dy: ((isOnTop ? -verticalPadding : verticalPadding)).toString(),
        //     }
        //     return actualTicks.map((value, index) => ({
        //         tickX: scale(value),
        //         value,
        //         label: tickFormatter(value, index),
        //         textProps,
        //     }))
        // },
    },
}
</script>
