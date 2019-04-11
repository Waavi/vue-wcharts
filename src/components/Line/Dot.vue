<template>
    <BasicTrans
        :initialProps="{
            r: 0,
            cy: Cartesian.canvas.y1
        }"
        transition="r .3s ease-in-out, cx .3s ease-in-out, cy .3s ease-in-out"
    >
        <circle
            :cx="cx"
            :cy="cy"
            :stroke="styles.stroke"
            :fill="styles.fill"
            :r="Cartesian.activePoint.cartesianIndex === cartesianIndex && Cartesian.activePoint.pointIndex === index ? styles.hoverRadius : styles.radius"
            :stroke-width="styles.strokeWidth"
            @mouseenter="Cartesian.activatePoint({ cartesianIndex: cartesianIndex, pointIndex: index }, $event)"
            @mouseleave="Cartesian.activatePoint({}, $event)"
        />
    </BasicTrans>
</template>

<script>
import VueTypes from 'vue-types'
import BasicTrans from '../transitions/BasicTrans.vue'

export default {
    name: 'Dot',
    type: 'cartesian',
    inject: ['Cartesian'],
    components: {
        BasicTrans,
    },
    props: {
        index: VueTypes.number.isRequired,
        cartesianIndex: VueTypes.number.isRequired,
        cx: VueTypes.number.isRequired,
        cy: VueTypes.number.isRequired,
        styles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            radius: VueTypes.number,
            hoverRadius: VueTypes.number,
        }).isRequired,
    },
}
</script>
