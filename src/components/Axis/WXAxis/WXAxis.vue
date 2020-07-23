<template>
    <g
        v-if="typeof tickY === 'number'"
        :id="id"
        class="WXAxis"
    >
        <line
            v-if="lineProps"
            v-bind="lineProps"
        />
        <g
            v-for="({ tickX, value, label, textProps }, index) in ticksWithInfo"
            :key="label"
            class="AxisTickAndMark"
            :transform="`translate(${tickX}, 0)`"
        >
            <line
                v-if="!hideTickMark && tickX !== undefined"
                class="AxisMark"
                :x1="0"
                :y1="tickY"
                :x2="0"
                :y2="isOnTop ? tickY + tickLength : tickY - tickLength"
                v-bind="actualStyles.tick"
            />
            <slot
                v-if="tickX !== undefined"
                name="tick"
                :value="value"
                :label="label"
                :index="index"
                :styles="actualStyles.tickLabel"
            >
                <WAxisText
                    v-if="label || label === 0"
                    class="AxisTick"
                    :x="0"
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
                        {{ String(value) }}
                    </slot>
                </WAxisText>
            </slot>
        </g>

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
        </slot>

        <line
            v-if="!hideNegativeAxis && negativeAxis"
            v-bind="negativeAxis"
            :style="negativeAxisStylesCmp"
        /> -->
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import outerElementMixin from '../../../mixins/outerElementMixin'
import { AXIS_TYPE, AXIS_TYPE_LIST, AXIS_DIMENSION } from '../axisMixin'
import printableAxisMixin from '../printableAxisMixin'
import WAxisText from '../WAxisText/WAxisText.vue'

const XAXIS_POSITION = {
    BOTTOM: 'bottom',
    TOP: 'top',
}

export default {
    name: 'WXAxis',
    dimension: AXIS_DIMENSION.X,
    components: {
        WAxisText,
    },
    mixins: [
        printableAxisMixin,
        outerElementMixin,
    ],
    props: {
        id: VueTypes.string.def(AXIS_DIMENSION.X),
        type: VueTypes.oneOf(AXIS_TYPE_LIST).def(AXIS_TYPE.NUMERIC),
        position: VueTypes.oneOf([XAXIS_POSITION.BOTTOM, XAXIS_POSITION.TOP]).def(XAXIS_POSITION.BOTTOM),
        height: VueTypes.number.def(30),
        offset: VueTypes.number.optional,

        labelAlign: VueTypes.oneOf(['start', 'middle', 'end']).def('end'),
        negativeAxisStyles: VueTypes.object.def({}),
    },
    computed: {
        layoutInOuterArea () {
            const {
                position, height, invisible, offset,
            } = this
            return {
                reference: 'canvas',
                order: -1, // it should be the first one
                position,
                left: 0,
                width: '100%',
                height: invisible || typeof offset === 'number' ? 0 : height,
            }
        },

        actualRange () {
            const { Chart: { canvas } } = this
            return [canvas.left, canvas.left + canvas.width]
        },

        isOnTop () {
            return this.position === XAXIS_POSITION.TOP
        },
        lineY () {
            const {
                Chart: { canvas }, outerLayout, isOnTop, offset,
            } = this
            if (typeof offset === 'number') {
                const actualOffset = (offset <= 1 ? offset * canvas.height : offset)
                return outerLayout.y + (isOnTop ? +1 : -1) * actualOffset
            }
            return isOnTop ? outerLayout.y + outerLayout.height : outerLayout.y
        },
        lineProps () {
            const {
                invisible, hideLine, lineY, outerLayout, actualStyles,
            } = this
            if (invisible || hideLine) return undefined
            return {
                x1: outerLayout.x,
                y1: lineY,
                x2: outerLayout.x + outerLayout.width,
                y2: lineY,
                style: actualStyles.line,
            }
        },
        tickY () {
            const { lineY, tickLength, isOnTop } = this
            return isOnTop ? lineY - tickLength : lineY + tickLength
        },
        ticksWithInfo () {
            const {
                actualTicks, tickLength, isOnTop,
            } = this
            const verticalPadding = tickLength + 2
            const textProps = {
                'dominant-baseline': isOnTop ? 'baseline' : 'hanging',
                'text-anchor': 'middle',
                dx: '1',
                dy: ((isOnTop ? -verticalPadding : verticalPadding)).toString(),
            }
            return actualTicks.map(({ value, scaledValue, label }) => ({
                value,
                tickX: scaledValue,
                label,
                textProps,
            }))
        },
    },
}
</script>

<style lang="scss" scoped>
.AxisTickAndMark {
    transition: all 1s;
}
</style>
