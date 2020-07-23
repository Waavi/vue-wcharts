<template>
    <g
        v-if="typeof tickX === 'number'"
        :id="id"
        class="WYAxis"
    >
        <line
            v-if="lineProps"
            v-bind="lineProps"
        />
        <g
            v-for="({ tickY, value, label, textProps }, index) in ticksWithInfo"
            :key="label"
            class="AxisTickAndMark"
            :transform="`translate(0,${tickY})`"
        >
            <line
                v-if="!hideTickMark && tickY !== undefined"
                class="AxisMark"
                :x1="tickX"
                :y1="0"
                :x2="isOnRight ? tickX - tickLength : tickX + tickLength"
                :y2="0"
                v-bind="actualStyles.tick"
            />
            <slot
                v-if="tickY !== undefined"
                name="tick"
                :value="value"
                :label="label"
                :index="index"
                :styles="actualStyles.tickLabel"
            >
                <WAxisText
                    v-if="label || label === 0"
                    class="AxisTick"
                    :x="tickX"
                    :y="0"
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
            :styles="labelStylesCmp"
        >
            <WAxisLabel
                v-if="label"
                v-bind="labels"
                :styles="labelStylesCmp"
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

const YAXIS_POSITION = {
    LEFT: 'left',
    RIGHT: 'right',
}

export default {
    name: 'WYAxis',
    dimension: AXIS_DIMENSION.Y,
    components: {
        WAxisText,
    },
    mixins: [
        printableAxisMixin,
        outerElementMixin,
    ],
    props: {
        id: VueTypes.string.def(AXIS_DIMENSION.Y),
        type: VueTypes.oneOf(AXIS_TYPE_LIST).def(AXIS_TYPE.NUMERIC),
        position: VueTypes.oneOf([YAXIS_POSITION.LEFT, YAXIS_POSITION.RIGHT]).def(YAXIS_POSITION.LEFT),
        width: VueTypes.number.def(30),
        offset: VueTypes.number.optional,

        labelAlign: VueTypes.oneOf(['start', 'middle', 'end']).def('end'),
        negativeAxisStyles: VueTypes.object.def({}),
    },
    computed: {
        layoutInOuterArea () {
            const {
                position, width, invisible, offset,
            } = this
            return {
                reference: 'canvas',
                order: -1, // it should be the first one
                position,
                top: 0,
                height: '100%',
                width: invisible || typeof offset === 'number' ? 0 : width,
            }
        },

        actualRange () {
            const { Chart: { canvas }, isCategorical } = this
            const { top } = canvas
            const bottom = top + canvas.height
            return isCategorical ? [top, bottom] : [bottom, top]
        },

        isOnRight () {
            return this.position === YAXIS_POSITION.RIGHT
        },
        lineX () {
            const {
                Chart: { canvas }, outerLayout, isOnRight, offset,
            } = this
            if (typeof offset === 'number') {
                const actualOffset = (offset <= 1 ? offset * canvas.width : offset)
                return outerLayout.x + (isOnRight ? -1 : +1) * actualOffset
            }
            return isOnRight ? outerLayout.x : outerLayout.x + outerLayout.width
        },
        lineProps () {
            const {
                invisible, hideLine, lineX, outerLayout, actualStyles,
            } = this
            if (invisible || hideLine) return undefined
            return {
                x1: lineX,
                y1: outerLayout.y,
                x2: lineX,
                y2: outerLayout.y + outerLayout.height,
                style: actualStyles.line,
            }
        },
        tickX () {
            const { lineX, tickLength, isOnRight } = this
            return isOnRight ? lineX + tickLength : lineX - tickLength
        },
        ticksWithInfo () {
            const {
                actualTicks, tickLength, isOnRight,
            } = this
            const horizontalPadding = tickLength + 2
            const textProps = {
                'dominant-baseline': 'middle',
                'text-anchor': isOnRight ? 'start' : 'end',
                dx: (isOnRight ? horizontalPadding : -horizontalPadding).toString(),
                dy: '1',
            }
            return actualTicks.map(({ value, scaledValue, label }) => ({
                value,
                tickY: scaledValue,
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
