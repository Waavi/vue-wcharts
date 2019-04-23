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
                    name="tickText"
                    v-bind="tick.text"
                >
                    <TickText
                        v-bind="tick.text"
                        :styles="labelStylesCmp"
                    />
                </slot>
            </g>
        </template>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import axisMixin from '../../mixins/axis'

export default {
    name: 'WXAxis',
    axis: 'x',
    mixins: [axisMixin],
    props: {
        space: VueTypes.arrayOf(VueTypes.number).def([0, 20, 24, 20]),
        textOffsetY: VueTypes.number.def(20),
    },
}
</script>
