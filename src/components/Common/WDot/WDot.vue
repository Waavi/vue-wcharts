<template>
    <WTrans
        :initialProps="{
            r: 0
        }"
        :transition="transition"
    >
        <circle
            :cx="x"
            :cy="y"
            :stroke="stroke"
            :stroke-width="strokeWidth || themeStyles.strokeWidth"
            :fill="fill"
            :r="rStyle"
            :style="dotStyles"
            @click="$emit('onClick', info)"
            @mouseenter="handleMouseEnter"
            @mouseleave="Chart.cleanActive"
            v-on="$listeners"
        />
    </WTrans>
</template>

<script>
import VueTypes from 'vue-types'
import { WTrans } from '../../../transitions'
import themeMixin from '../../../mixins/theme'

export default {
    name: 'WDot',
    type: 'cartesian',
    inject: ['Chart'],
    components: {
        WTrans,
    },
    mixins: [themeMixin],
    props: {
        index: VueTypes.number.isRequired,
        cartesianIndex: VueTypes.number.isRequired,
        x: VueTypes.number.isRequired,
        y: VueTypes.number.isRequired,
        fill: VueTypes.string,
        stroke: VueTypes.string,
        strokeWidth: VueTypes.number,
        radius: VueTypes.number,
        hoverRadius: VueTypes.number,
        info: VueTypes.shape({
            id: VueTypes.any,
            label: VueTypes.any,
            value: VueTypes.array,
        }).loose,
        styles: VueTypes.object.def({}),
        transition: VueTypes.string.isRequired,
    },
    computed: {
        dotStyles () {
            return {
                ...this.themeStyles.styles,
                ...this.styles,
            }
        },
        // Return styles active or default point,
        rStyle () {
            if (!this.Chart.active.el) return this.radius
            const { el } = this.Chart.active
            return el.id === this.cartesianIndex && el.point === this.index ? (this.hoverRadius || this.themeStyles.hoverRadius) : (this.radius || this.themeStyles.radius)
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