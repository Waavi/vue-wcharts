<template>
    <g :id="id">
        <line
            v-if="lineProps"
            v-bind="lineProps"
        />
        <!-- <template
            v-for="(tick, index) in ticks"
        >
            <g
                :key="`tick-${index}`"
                :text-anchor="textAnchor"
            >
                <line
                    v-if="!hideTickMark"
                    :x1="tick.mark.x1"
                    :y1="tick.mark.y1"
                    :x2="tick.mark.x2"
                    :y2="tick.mark.y2"
                    :stroke="markStylesCmp.stroke"
                />
                <slot
                    name="tick"
                    v-bind="tick.text"
                    :styles="tickStylesCmp"
                >
                    <WAxisText
                        v-bind="tick.text"
                        :styles="tickStylesCmp"
                    >
                        <template #default="{ value }">
                            <slot
                                name="tickText"
                                :value="value"
                            >
                                {{ value }}
                            </slot>
                        </template>
                    </WAxisText>
                </slot>
            </g>
        </template>

        <slot
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

export default {
    name: 'WYAxis2',
    dimension: AXIS_DIMENSION.Y,
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
        lineProps () {
            if (this.hideLine) return undefined
            return {
                x1: this.outerLayout.x + this.outerLayout.width,
                y1: this.outerLayout.y,
                x2: this.outerLayout.x + this.outerLayout.width,
                y2: this.outerLayout.y + this.outerLayout.height,
                stroke: this.axisStylesCmp.stroke,
            }
        },
    },
}
</script>
