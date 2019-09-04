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
            v-on="dotListeners"
        />
    </WTrans>
</template>

<script>
import VueTypes from 'vue-types'
import merge from '../../../utils/merge'
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
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('hover'),
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
                ...(this.trigger === 'click' ? { cursor: 'pointer' } : {}),
            }
        },
        // Event Listeners
        dotListeners () {
            return merge({}, this.$listeners, {
                click: (event) => {
                    if (this.trigger === 'click') this.handleActive(event)
                    this.$emit('onClick', this.info)
                },
                mouseenter: (event) => {
                    if (this.trigger === 'hover') this.handleActive(event)
                    this.$emit('onMouseenter', this.info)
                },
                mouseleave: () => {
                    if (['hover', 'click'].includes(this.trigger)) this.Chart.cleanActive()
                    this.$emit('onMouseleave')
                },
            })
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
        handleActive (event) {
            const { setActive } = this.Chart
            setActive(
                this.info,
                event
            )
        },
    },
}
</script>
