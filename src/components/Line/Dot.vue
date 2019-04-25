<template>
    <Trans
        :initialProps="{
            r: 0
        }"
        :transition="transition"
    >
        <circle
            :cx="x"
            :cy="y"
            :stroke="styles.stroke"
            :fill="styles.fill"
            :r="rStyle()"
            :stroke-width="styles.strokeWidth"
            @mouseenter="handleMouseEnter"
            @mouseleave="Cartesian.cleanActive"
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
        x: VueTypes.number.isRequired,
        y: VueTypes.number.isRequired,
        styles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            radius: VueTypes.number,
            hoverRadius: VueTypes.number,
        }).isRequired,
        transition: VueTypes.string.isRequired,
    },
    methods: {
        // Set active element
        handleMouseEnter (event) {
            this.Cartesian.setActive(
                { id: this.cartesianIndex, point: this.index },
                event,
                this.Cartesian.active.types.point
            )
        },
        // Return styles active or default point,
        rStyle () {
            if (!this.Cartesian.active.el) return this.styles.radius
            const { el } = this.Cartesian.active
            return el.id === this.cartesianIndex && el.point === this.index ? this.styles.hoverRadius : this.styles.radius
        },
    },
}
</script>
