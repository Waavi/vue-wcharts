<template>
    <g>
        <line
            :x1="x1"
            :y1="y1"
            :x2="x2"
            :y2="y2"
            :stroke="stroke"
        />
        <template
            v-for="(tick, index) in ticks"
        >
            <g
                :key="`tick-${index}`"
                text-anchor="end"
            >
                <line
                    :x1="tick.mark.x1"
                    :y1="tick.mark.y1"
                    :x2="tick.mark.x2"
                    :y2="tick.mark.y2"
                    :stroke="stroke"
                />
                <slot
                    name="tick"
                    :tick="tick"
                >
                    <Tick
                        :text="tick.text"
                        :fill="stroke"
                        :font-size="fontSize"
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

export default {
    name: 'WYAxis',
    type: 'axis',
    inject: ['Cartesian'],
    components: {
        Tick,
    },
    props: {
        datakey: VueTypes.string,
        space: VueTypes.arrayOf(VueTypes.number).def([10, 0, 0, 40]),
        stroke: VueTypes.string.def('#999'),
        fontSize: VueTypes.number.def(12),
        textOffsetY: VueTypes.number.def(10),
        ticksNum: VueTypes.number,
    },
    computed: {
        ticks () {
            const { dataset, canvas, bounds } = this.Cartesian
            const num = this.ticksNum || dataset.length
            const ticks = Maths.genTicks(bounds.min, bounds.max, num).reverse()
            const space = canvas.height / (ticks.length - 1)

            return ticks.map((value, index) => {
                const y = canvas.y0 + (space * index)
                return {
                    mark: {
                        x1: canvas.x0 - 5,
                        y1: y,
                        x2: canvas.x0,
                        y2: y,
                    },
                    text: {
                        value,
                        x: canvas.x0 - this.textOffsetY,
                        y: y + this.fontSize / 3,
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
    },
}
</script>
