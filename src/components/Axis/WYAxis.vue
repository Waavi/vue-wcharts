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
                    <WTickText
                        v-bind="tick.text"
                        :styles="tickStylesCmp"
                    />
                </slot>
            </g>
        </template>

        <slot
            name="label"
            v-bind="label"
        >
            <svg
                v-if="labelText"
                width="100%"
                height="100%"
            >
                <text
                    :x="label.x"
                    :y="label.y"
                    :text-anchor="label.textAnchor"
                    :transform="label.transform"
                    :style="labelStylesCmp"
                >
                    {{ labelText }}
                </text>
            </svg>
        </slot>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import axisMixin from '../../mixins/axis'

export default {
    name: 'WYAxis',
    axis: 'y',
    mixins: [axisMixin],
    props: {
        labelTextAnchor: VueTypes.string.def('start'),
        space: VueTypes.arrayOf(VueTypes.number).def([10, 0, 0, 40]),
        textOffset: VueTypes.number.def(10),
    },
}
</script>
