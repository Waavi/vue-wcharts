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
            :r="rStyle"
            :stroke-width="styles.strokeWidth"
            :style="{ opacity: styles.opacity }"
            @mouseenter="handleMouseEnter"
            @mouseleave="Chart.cleanActive"
        />
    </Trans>
</template>

<script>
import VueTypes from 'vue-types'
import Trans from '../../transitions/Trans.vue'

export default {
    name: 'WDot',
    type: 'cartesian',
    inject: ['Chart'],
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
            opacity: VueTypes.number,
        }).isRequired,
        transition: VueTypes.string.isRequired,
        info: VueTypes.shape({
            id: VueTypes.any,
            label: VueTypes.any,
            value: VueTypes.array,
        }).loose,
    },
    computed: {
        // Return styles active or default point,
        rStyle () {
            if (!this.Chart.active.el) return this.styles.radius
            const { el } = this.Chart.active
            return el.id === this.cartesianIndex && el.point === this.index ? this.styles.hoverRadius : this.styles.radius
        },
    },
    methods: {
        // Set active element
        handleMouseEnter (event) {
            const { setActive } = this.Chart
            setActive(
                this.info,
                event
            )
        },
    },
}
</script>
