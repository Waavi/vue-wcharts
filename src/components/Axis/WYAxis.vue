<template>
    <g id="WYAxis">
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
                text-anchor="end"
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
import { Maths } from '../../utils'

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
    name: 'WYAxis',
    type: 'axis',
    inject: ['Cartesian'],
    components: {
        Tick,
    },
    props: {
        space: VueTypes.arrayOf(VueTypes.number).def([10, 0, 0, 40]),
        textOffsetY: VueTypes.number.def(10),
        ticksNum: VueTypes.number,
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
            const {
                dataset, canvas, bounds, padding,
            } = this.Cartesian
            const num = this.ticksNum || dataset.length
            const ticks = Maths.genTicks(bounds.min, bounds.max, num).reverse()
            const offset = (padding[0] + padding[2])
            const space = (canvas.height - offset) / (ticks.length - 1)

            return ticks.map((value, index) => {
                const y = canvas.y0 + (space * index) + padding[2]
                return {
                    mark: {
                        index,
                        x1: canvas.x0 - 5,
                        y1: y,
                        x2: canvas.x0,
                        y2: y,
                    },
                    text: {
                        index,
                        value,
                        x: canvas.x0 - this.textOffsetY,
                        y: y + this.labelStylesCmp.fontSize / 3,
                    },
                }
            })
        },
        x1 () {
            return this.Cartesian.canvas.x0
        },
        y1 () {
            return this.Cartesian.canvas.y0
        },
        x2 () {
            return this.Cartesian.canvas.x0
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
