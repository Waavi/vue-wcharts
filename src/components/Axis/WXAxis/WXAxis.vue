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
import { marginHorizontalVueType, normalizedMarginHorizontal } from '../../../charts/chartUtils'
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
        padding: marginHorizontalVueType,
        height: VueTypes.number.def(30),

        labelAlign: VueTypes.oneOf(['start', 'middle', 'end']).def('end'),
        negativeAxisStyles: VueTypes.object.def({}),
    },
    computed: {
        layoutInOuterArea () {
            const {
                position, height, invisible,
            } = this
            return {
                reference: 'canvas',
                order: -1, // it should be the first one
                position,
                left: 0,
                width: '100%',
                height: invisible ? 0 : height,
            }
        },

        normalizedPadding () {
            return normalizedMarginHorizontal(this.padding)
        },

        actualRange () {
            const { Chart: { canvas }, normalizedPadding } = this
            const { left: leftPadding = 0, right: rightPadding = 0 } = normalizedPadding
            return [canvas.left + leftPadding, canvas.left + canvas.width - rightPadding]
        },

        isOnTop () {
            return this.position === XAXIS_POSITION.TOP
        },
        lineY () {
            const { outerLayout, isOnTop } = this
            return isOnTop ? outerLayout.y + outerLayout.height : outerLayout.y
        },
        lineProps () {
            const {
                hideLine, lineY, outerLayout, actualStyles,
            } = this
            if (hideLine) return undefined
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
                actualTicks, scale, tickFormatter, tickLength, isOnTop,
            } = this
            const verticalPadding = tickLength + 2
            const textProps = {
                'dominant-baseline': isOnTop ? 'baseline' : 'hanging',
                'text-anchor': 'middle',
                dx: '1',
                dy: ((isOnTop ? -verticalPadding : verticalPadding)).toString(),
            }
            return actualTicks.map((value, index) => ({
                tickX: scale(value),
                value,
                label: tickFormatter(value, index),
                textProps,
            }))
        },
    },
}
</script>

<style lang="scss" scoped>
line {
    transition: all 1s;
}
</style>
