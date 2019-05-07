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
            const {
                dataset, datakeys, colors, setActive, axisXDatakey,
            } = this.Cartesian
            const line = dataset[this.index]
            const key = datakeys[this.cartesianIndex]
            const color = colors[this.cartesianIndex]
            const value = line[key]
            const label = line[axisXDatakey]

            setActive(
                {
                    id: this.cartesianIndex,
                    label,
                    value: [{
                        value,
                        color,
                    }],
                },
                event
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
