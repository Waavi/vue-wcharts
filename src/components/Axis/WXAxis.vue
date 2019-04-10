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
                text-anchor="middle"
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

export default {
    name: 'WXAxis',
    type: 'axis',
    inject: ['Cartesian'],
    components: {
        Tick,
    },
    props: {
        datakey: VueTypes.string.isRequired,
        space: VueTypes.arrayOf(VueTypes.number).def([0, 20, 24, 20]),
        stroke: VueTypes.string.def('#999'),
        fontSize: VueTypes.number.def(15),
        textOffsetY: VueTypes.number.def(20),
    },
    computed: {
        ticks () {
            const { dataset, canvas } = this.Cartesian
            const space = canvas.width / (dataset.length - 1)
            return dataset.map((props, index) => {
                const x = canvas.x0 + (space * index)
                return {
                    mark: {
                        x1: x,
                        y1: canvas.y1,
                        x2: x,
                        y2: canvas.y1 + 5,
                    },
                    text: {
                        value: props[this.datakey],
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
    },
}
</script>
