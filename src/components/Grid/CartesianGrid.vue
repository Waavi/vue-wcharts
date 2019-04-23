<template>
    <g>
        <line />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import { Maths } from '../../utils'

export default {
    name: 'WCartesianGrid',
    type: 'cartesian',
    inject: ['Cartesian'],
    props: {
        hideH: VueTypes.bool.def(false),
        hideV: VueTypes.bool.def(false),
    },
    hLines () {
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
                index,
                x1: canvas.x0 - 5,
                y1: y,
                x2: canvas.x0,
                y2: y,
            }
        })
    },
}
</script>
