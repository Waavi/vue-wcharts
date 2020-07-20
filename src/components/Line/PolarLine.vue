<template>
    <g v-if="isActive">
        <BasicLine
            :datums="coords"
            xAccessor="xScaled"
            yAccessor="yScaled"
            :curve="curve"
            v-bind="actualStyles.line"
            stroke="red"
            strokeWidth="3"
        />
        <circle
            v-for="({ xScaled, yScaled }, index) in coords"
            :key="index"
            :cx="xScaled"
            :cy="yScaled"
            :r="5"
            fill="red"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import drawablePolarMixin from '../../mixins/drawable/drawablePolarMixin'
import { withRadiusAxisMixin, withAngleAxisMixin } from '../Axis/withAxisMixin'
import BasicLine from '../basicsElements/BasicLine/BasicLine.vue'
// import d3Area from 'd3-shape/src/area'
// import merge from '../../utils/merge'
// import { WDot } from '../Common'
// import { WSpread } from '../../transitions'
// import { isFunc } from '../../utils/checks'

export default {
    name: 'PolarLine',
    components: {
        BasicLine,
    },
    // components: {
    //     WDot,
    //     WSpread,
    // },
    mixins: [
        drawablePolarMixin,
        withRadiusAxisMixin,
        withAngleAxisMixin,
    ],
    props: {
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('click'),
        label: VueTypes.string,
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.string, VueTypes.func]).def(false),
        area: VueTypes.bool.def(false),
        dot: VueTypes.bool.def(false),
    },
}
</script>
