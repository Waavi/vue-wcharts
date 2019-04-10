<template>
    <g stroke="#999">
        <line
            :x1="x1"
            :y1="y1"
            :x2="x2"
            :y2="y2"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'WXAxis',
    type: 'axis',
    inject: ['Cartesian'],
    props: {
        datakey: VueTypes.string.isRequired,
        space: VueTypes.arrayOf(VueTypes.number).def([0, 20, 24, 20]),
    },
    computed: {
        points () {
            return this.Cartesian.dataset.map(value => value.name)
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
