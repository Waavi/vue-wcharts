<template>
    <g id="WXAxis">
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
                text-anchor="middle"
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
                    :tick="tick.text"
                >
                    <Tick
                        :text="tick.text"
                        :styles="labelStylesCmp"
                    />
                </slot>
            </g>
        </template>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import Tick from './Tick.vue'

const axisStylesDefaultProp = {
    stroke: '#999',
}

const markStylesDefaultProp = {
    stroke: '#999',
}

const labelStylesDefaultProp = {
    stroke: 'none',
    fill: '#999',
    fontSize: 12,
}

export default {
    name: 'WXAxis',
    type: 'axis',
    inject: ['Cartesian'],
    components: {
        Tick,
    },
    props: {
        datakey: VueTypes.string,
        space: VueTypes.arrayOf(VueTypes.number).def([0, 20, 24, 20]),
        textOffsetY: VueTypes.number.def(20),
        hideLine: VueTypes.bool.def(false),
        hideTickMark: VueTypes.bool.def(false),
        /** Styles */
        axisStyles: VueTypes.shape({
            stroke: VueTypes.string,
        }).def(() => ({
            ...axisStylesDefaultProp,
        })),
        markStyles: VueTypes.shape({
            stroke: VueTypes.string,
        }).def(() => ({
            ...axisStylesDefaultProp,
        })),
        labelStyles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            fontSize: VueTypes.oneOfType([String, Number]),
        }).def(() => ({
            ...labelStylesDefaultProp,
        })),
    },
    computed: {
        ticks () {
            const { dataset, canvas, padding } = this.Cartesian
            const offset = padding[1] + padding[3]
            const space = (canvas.width - offset) / (dataset.length - 1)
            return dataset.map((props, index) => {
                const x = canvas.x0 + (space * index) + padding[3]
                return {
                    mark: {
                        index,
                        x1: x,
                        y1: canvas.y1,
                        x2: x,
                        y2: canvas.y1 + 5,
                    },
                    text: {
                        index,
                        value: props[this.datakey] || index,
                        x,
                        y: canvas.y1 + this.textOffsetY,
                    },
                }
            })
        },
        x1 () {
            return this.Cartesian.canvas.x0
        },
        y1 () {
            return this.Cartesian.canvas.y1
        },
        x2 () {
            return this.Cartesian.canvas.x1
        },
        y2 () {
            return this.Cartesian.canvas.y1
        },
        axisStylesCmp () {
            return {
                ...axisStylesDefaultProp,
                ...this.axisStyles,
            }
        },
        markStylesCmp () {
            return {
                ...markStylesDefaultProp,
                ...this.markStyles,
            }
        },
        labelStylesCmp () {
            return {
                ...labelStylesDefaultProp,
                ...this.labelStyles,
            }
        },
    },
}
</script>
