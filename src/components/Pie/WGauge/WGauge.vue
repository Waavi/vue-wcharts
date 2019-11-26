<template>
    <g
        v-if="active"
        id="gauge"
    >
        <WPie
            :radius="radius"
            :startAngle="startAngle"
            :endAngle="endAngle"
            :animation="false"
            :color="stylesCmp.background"
            :borderRadius="borderRadius"
        />
        <WPie
            :datakey="datakey"
            :maxValue="maxValue"
            :radius="radius"
            :startAngle="startAngle"
            :endAngle="endAngle"
            :color="color"
            :borderRadius="borderRadius"
            :animation="animation"
            :animationDuration="animationDuration"
        />

        <foreignObject
            v-if="slots"
            :style="contentStyles"
        >
            <slot />
        </foreignObject>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import themeMixin from '../../../mixins/theme'
import visibleMixin from '../../../mixins/visible'
import WPie from '../WPie/WPie.vue'

export default {
    name: 'WGauge',
    type: 'pie',
    inject: ['Chart'],
    components: {
        WPie,
    },
    mixins: [themeMixin, visibleMixin],
    props: {
        // internal props set by the parent (WPieChart)
        index: VueTypes.number,
        datakey: VueTypes.string.isRequired,
        maxValue: VueTypes.number.def(100),
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('hover'),
        startAngle: VueTypes.number.def(180),
        endAngle: VueTypes.number.def(0),
        radius: VueTypes.oneOfType([
            VueTypes.number,
            VueTypes.arrayOf(VueTypes.number).def([85, 100]),
        ]).def([85, 100]),
        // Styles
        borderRadius: VueTypes.oneOfType([VueTypes.number, VueTypes.string]).def(0),
        color: VueTypes.string,
        styles: VueTypes.object,
        // Animation
        animation: VueTypes.bool.def(true),
        animationDuration: VueTypes.number.def(2.5),
    },
    computed: {
        // Active elem
        active () {
            return this.Chart.activeElements.includes(this.index)
        },
        // Radius
        curRadius () {
            const innerRadius = Array.isArray(this.radius) ? this.radius[0] : 0
            const outerRadius = Array.isArray(this.radius) ? this.radius[1] : 100

            return { innerRadius, outerRadius }
        },
        // Slots
        slots () {
            return Object.keys(this.$slots).length
        },
        // Styles
        contentStyles () {
            const { height } = this.Chart
            const { outerRadius } = this.curRadius
            const size = `${outerRadius * 2}px`
            return {
                width: size,
                height: size,
                transform: `translate(${outerRadius}px, ${height / 2 - outerRadius}px)`,
            }
        },
        stylesCmp () {
            return {
                ...this.themeStyles.styles,
                ...this.styles,
            }
        },
    },
}
</script>
