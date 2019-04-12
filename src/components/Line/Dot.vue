<template>
    <Trans
        :initialProps="{
            r: 0
        }"
        :transition="transition"
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
    </Trans>
</template>

<script>
import VueTypes from 'vue-types'
import Trans from '../../transitions/Trans.vue'

export default {
    name: 'Dot',
    type: 'cartesian',
    inject: ['Cartesian'],
    components: {
        Trans,
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
        transition: VueTypes.string.isRequired,
    },
}
</script>
