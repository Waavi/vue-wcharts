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
                    :styles="tickStylesCmp"
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
            :styles="labelStylesCmp"
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

        <line
            v-if="!hideNegativeAxis && negativeAxis"
            v-bind="negativeAxis"
            :style="negativeAxisStylesCmp"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import axisMixin from '../../mixins/axis'

const negativeAxisStylesDefaultProp = {
    stroke: '#999',
    strokeWidth: 1,
    strokeDasharray: '0',
}

export default {
    name: 'WXAxis',
    axis: 'x',
    mixins: [axisMixin],
    props: {
        labelAlign: VueTypes.oneOf(['start', 'middle', 'end']).def('end'),
        space: VueTypes.arrayOf(VueTypes.number).def([0, 20, 24, 20]),
        textOffset: VueTypes.number.def(20),
        negativeAxisStyles: VueTypes.object.def({}),
    },
    computed: {
        negativeAxis () {
            const {
                canvas, yScale, bounds, snap,
            } = this.Chart
            if (bounds.min >= 0 || !Object.keys(snap).length) return null
            const y = yScale(0)
            return {
                x1: canvas.x0,
                y1: y,
                x2: canvas.x1,
                y2: y,
            }
        },
        negativeAxisStylesCmp () {
            return {
                ...negativeAxisStylesDefaultProp,
                ...this.negativeAxisStyles,
            }
        },
    },
}
</script>
