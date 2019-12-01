<template>
    <g
        :id="id"
        class="WYAxis"
    >
        <line
            v-if="lineProps"
            v-bind="lineProps"
        />
        <g
            v-for="({ tickY, value, label, textProps }, index) in ticksWithInfo"
            :key="index"
        >
            <line
                v-if="!hideTickMark"
                :x1="tickX"
                :y1="tickY"
                :x2="isOnRight ? tickX - tickLength : tickX + tickLength"
                :y2="tickY"
                v-bind="actualStyles.tick"
            />
            <slot
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
import { marginVerticalVueType, normalizedMarginVertical } from '../../../charts/chartUtils'
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
        padding: marginVerticalVueType,
        width: VueTypes.number.def(30),

        labelAlign: VueTypes.oneOf(['start', 'middle', 'end']).def('end'),
        negativeAxisStyles: VueTypes.object.def({}),
    },
    computed: {
        layoutInOuterArea () {
            const {
                position, width, invisible,
            } = this
            return {
                reference: 'canvas',
                order: -1, // it should be the first one
                position,
                top: 0,
                height: '100%',
                width: invisible ? 0 : width,
            }
        },

        normalizedPadding () {
            return normalizedMarginVertical(this.padding)
        },

        actualRange () {
            const { Chart: { canvas }, normalizedPadding } = this
            const { top: topPadding = 0, bottom: bottomPadding = 0 } = normalizedPadding
            return [canvas.top + canvas.height - bottomPadding, canvas.top + topPadding]
        },

        isOnRight () {
            return this.position === YAXIS_POSITION.RIGHT
        },
        lineX () {
            const { outerLayout, isOnRight } = this
            return isOnRight ? outerLayout.x : outerLayout.x + outerLayout.width
        },
        lineProps () {
            const {
                hideLine, lineX, outerLayout, actualStyles,
            } = this
            if (hideLine) return undefined
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
                actualTicks, scale, tickFormatter, tickLength, isOnRight,
            } = this
            const horizontalPadding = tickLength + 2
            const textProps = {
                'dominant-baseline': 'middle',
                'text-anchor': isOnRight ? 'start' : 'end',
                dx: (isOnRight ? horizontalPadding : -horizontalPadding).toString(),
                dy: '1',
            }
            return actualTicks.map((value, index) => ({
                tickY: scale(value),
                value,
                label: tickFormatter(value, index),
                textProps,
            }))
        },
    },
}
</script>
