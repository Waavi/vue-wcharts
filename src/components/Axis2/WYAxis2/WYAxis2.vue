<template>
    <g :id="id">
        <line
            v-if="lineProps"
            v-bind="lineProps"
        />
        <g
            v-for="({ markY, value, label, textProps }, index) in ticksWithInfo"
            :key="index"
        >
            <line
                v-if="!hideTickMark"
                :x1="markX"
                :y1="markY"
                :x2="markX + tickLength"
                :y2="markY"
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
    name: 'WYAxis2',
    dimension: AXIS_DIMENSION.Y,
    components: {
        WAxisText,
    },
    mixins: [axisMixin, outerElementMixin],
    props: {
        id: VueTypes.string.def(AXIS_DIMENSION.Y),
        type: VueTypes.oneOf(AXIS_TYPE_LIST).def(AXIS_TYPE.NUMERIC),
        position: VueTypes.oneOf(['left', 'right']).def('left'),
        padding: VueTypes.shape({
            top: VueTypes.number,
            bottom: VueTypes.number,
        }).def({}), // space between axis edges and bounds region
        width: VueTypes.number.def(30),

        labelAlign: VueTypes.oneOf(['start', 'middle', 'end']).def('end'),
        negativeAxisStyles: VueTypes.object.def({}),
    },
    layoutInOuterArea (props) {
        const {
            position, tickLength, width, invisible,
        } = props || {}
        return {
            reference: 'canvas',
            order: -1, // it should be the first one
            position,
            top: 0,
            height: '100%',
            width: invisible ? 0 : tickLength + width,
        }
    },
    computed: {
        isOnRight () {
            return this.position === 'right'
        },
        lineProps () {
            const {
                hideLine, outerLayout, axisStylesCmp, isOnRight,
            } = this
            if (hideLine) return undefined
            const x = isOnRight ? outerLayout.x : outerLayout.x + outerLayout.width
            return {
                x1: x,
                y1: outerLayout.y,
                x2: x,
                y2: outerLayout.y + outerLayout.height,
                stroke: axisStylesCmp.stroke,
            }
        },
        markX () {
            const { outerLayout, tickLength, isOnRight } = this
            return isOnRight ? outerLayout.x : outerLayout.x + outerLayout.width - tickLength
        },
        ticksWithInfo () {
            const {
                actualTicks, scale, tickFormatter, tickLength, isOnRight,
            } = this
            const horizontalPadding = tickLength + 2
            const textProps = {
                'alignment-baseline': 'middle',
                'text-anchor': isOnRight ? 'start' : 'end',
                dx: (isOnRight ? horizontalPadding : -horizontalPadding).toString(),
                dy: '1',
            }
            return actualTicks.map((value, index) => ({
                markY: scale(value),
                value,
                label: tickFormatter(value, index),
                textProps,
            }))
        },
    },
    methods: {
        getRange (canvas, padding) {
            const { top: topPadding = 0, bottom: bottomPadding = 0 } = padding || {}
            return [canvas.top + canvas.height - bottomPadding, canvas.top + topPadding]
        },
    },
}
</script>
