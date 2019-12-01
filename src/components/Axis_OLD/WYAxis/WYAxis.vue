<template>
    <g :id="id">
        <line
            v-if="!hideLine"
            :x1="x1"
            :y1="y1"
            :x2="x2"
            :y2="y2"
            :stroke="axisStylesCmp.stroke"
        />
        <template
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
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import axisMixin from '../../../mixins/axis'

export default {
    name: 'WYAxis',
    axis: 'y',
    mixins: [axisMixin],
    props: {
        labelAlign: VueTypes.oneOf(['start', 'middle', 'end']).def('start'),
        space: VueTypes.arrayOf(VueTypes.number).def([10, 0, 0, 40]),
        textOffset: VueTypes.number.def(10),
    },
}
</script>
