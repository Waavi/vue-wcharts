<template>
    <g
        v-if="active"
        id="gauge"
    >
        <WPie
            datakey="total"
            :radius="radius"
            :startAngle="startAngle"
            :endAngle="endAngle"
            :animation="false"
            :color="background"
            :borderRadius="borderRadius"
        />
        <WPie
            :datakey="datakey"
            :limit="limit"
            :radius="radius"
            :startAngle="startAngle"
            :endAngle="endAngle"
            :borderRadius="borderRadius"
            :animation="animation"
            :animationDuration="animationDuration"
        />

        <foreignObject :style="contentStyles">
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
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('hover'),
        limit: VueTypes.number.def(100),
        startAngle: VueTypes.number.def(180),
        endAngle: VueTypes.number.def(0),
        radius: VueTypes.oneOfType([
            VueTypes.number,
            VueTypes.arrayOf(VueTypes.number).def([85, 100]),
        ]).def([85, 100]),
        borderRadius: VueTypes.oneOfType([VueTypes.number, VueTypes.string]).def(0),
        styles: VueTypes.object,
        background: VueTypes.string.def('#eee'),
        // Animation
        animation: VueTypes.bool.def(true),
        animationDuration: VueTypes.number.def(2.5),
    },
    data () {
        return {
            activePath: null,
            animatedSectors: [],
        }
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
        // Styles
        contentStyles () {
            const { height } = this.Chart
            const { outerRadius } = this.curRadius
            const size = `${outerRadius * 2}px`
            return {
                width: size,
                height: size,
                transform: `translate(${outerRadius * 2}px, ${height / 2 - outerRadius}px)`,
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
