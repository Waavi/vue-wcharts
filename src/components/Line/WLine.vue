<template>
    <g v-if="isActive">
        <BasicLine
            :datums="coords"
            :xAccessor="xAccessor"
            :yAccessor="yAccessor"
            :curve="curve"
            v-bind="actualStyles.line"
        />
        <template v-if="dot">
            <circle
                v-for="({ xScaled, yScaled }, index) in coords"
                :key="index"
                :cx="xScaled"
                :cy="yScaled"
                :r="5"
                fill="red"
            />
        </template>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import drawableCartesianMixin from '../../mixins/drawable/drawableCartesianMixin'
import { withXAxisMixin, withYAxisMixin } from '../Axis/withAxisMixin'
import BasicLine from '../basicsElements/BasicLine/BasicLine.vue'
// import withXAxisMixin from '../../mixins/axes/withXAxisMixin'
// import withYAxisMixin from '../../mixins/axes/withYAxisMixin'
// import d3Area from 'd3-shape/src/area'
// import merge from '../../utils/merge'
// import { WDot } from '../Common'
// import { WSpread } from '../../transitions'

export default {
    name: 'WLine',
    components: {
        BasicLine,
    },
    // components: {
    //     WDot,
    //     WSpread,
    // },
    mixins: [
        drawableCartesianMixin,
        withXAxisMixin,
        withYAxisMixin,
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
