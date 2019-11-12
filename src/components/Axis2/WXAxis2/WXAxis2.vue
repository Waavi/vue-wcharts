<template>
    <g :id="id">
        <line
            v-if="lineProps"
            v-bind="lineProps"
        />
        <g
            v-for="({ markX, value, label, textProps }, index) in ticksWithInfo"
            :key="index"
        >
            <line
                v-if="!hideTickMark"
                :x1="markX"
                :y1="markY"
                :x2="markX"
                :y2="markY + tickLength"
                :stroke="markStylesCmp.stroke"
            />
            <slot
                name="tick"
                :value="value"
                :label="label"
                :index="index"
                :styles="tickStylesCmp"
            >
                <WAxisText
                    v-if="label || label === 0"
                    :x="markX"
                    :y="markY"
                    :value="label"
                    v-bind="textProps"
                    :styles="tickStylesCmp"
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
import axisMixin, { AXIS_TYPE, AXIS_TYPE_LIST, AXIS_DIMENSION } from '../axisMixin'
import WAxisText from '../../Axis/WAxisText/WAxisText.vue'

export default {
    name: 'WXAxis2',
    dimension: AXIS_DIMENSION.X,
    components: {
        WAxisText,
    },
    mixins: [axisMixin, outerElementMixin],
    props: {
        id: VueTypes.string.def(AXIS_DIMENSION.X),
        type: VueTypes.oneOf(AXIS_TYPE_LIST).def(AXIS_TYPE.NUMERIC),
        position: VueTypes.oneOf(['bottom', 'top']).def('bottom'),
        padding: VueTypes.shape({
            left: VueTypes.number,
            right: VueTypes.number,
        }).def({}), // space between axis edges and bounds region
        height: VueTypes.number.def(30),

        labelAlign: VueTypes.oneOf(['start', 'middle', 'end']).def('end'),
        negativeAxisStyles: VueTypes.object.def({}),
    },
    layoutInOuterArea (props) {
        const {
            position, height, invisible,
        } = props || {}
        return {
            reference: 'canvas',
            order: -1, // it should be the first one
            position,
            left: 0,
            width: '100%',
            height: invisible ? 0 : height,
        }
    },
    computed: {
        isOnTop () {
            return this.position === 'top'
        },
        lineProps () {
            const {
                hideLine, outerLayout, axisStylesCmp, isOnTop,
            } = this
            if (hideLine) return undefined
            const y = isOnTop ? outerLayout.y + outerLayout.height : outerLayout.y
            return {
                x1: outerLayout.x,
                y1: y,
                x2: outerLayout.x + outerLayout.width,
                y2: y,
                stroke: axisStylesCmp.stroke,
            }
        },
        markY () {
            const {
                outerLayout, tickLength, isOnTop,
            } = this
            return isOnTop ? outerLayout.y + outerLayout.height - tickLength : outerLayout.y
        },
        ticksWithInfo () {
            const {
                actualTicks, scale, tickFormatter, tickLength, isOnTop,
            } = this
            const verticalPadding = tickLength + 2
            const textProps = {
                'alignment-baseline': isOnTop ? 'baseline' : 'hanging',
                'text-anchor': 'middle',
                dx: '1',
                dy: ((isOnTop ? -verticalPadding : verticalPadding)).toString(),
            }
            return actualTicks.map((value, index) => ({
                markX: scale(value),
                value,
                label: tickFormatter(value, index),
                textProps,
            }))
        },
    },
    methods: {
        getRange (canvas, padding) {
            const { left: leftPadding = 0, right: rightPadding = 0 } = padding || {}
            return [canvas.left + leftPadding, canvas.left + canvas.width - rightPadding]
        },
    },
}
</script>
