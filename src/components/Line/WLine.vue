<template>
    <g v-if="hasBeenMounted">
        <SvgLine
            :datums="coords"
            :curve="curve"
            v-bind="actualStyles.line"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import drawableCartesianMixin from '../../mixins/drawable/drawableCartesianMixin'
import { withXAxisMixin, withYAxisMixin } from '../Axis/withAxisMixin'
// import withXAxisMixin from '../../mixins/axes/withXAxisMixin'
// import withYAxisMixin from '../../mixins/axes/withYAxisMixin'
// import d3Area from 'd3-shape/src/area'
// import merge from '../../utils/merge'
// import { WDot } from '../Common'
// import { WSpread } from '../../transitions'
// import { isFunc } from '../../utils/checks'

export default {
    name: 'WLine',
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
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.func]).def(false),
        area: VueTypes.bool.def(false),
        color: VueTypes.string.optional,
        styles: VueTypes.object.def({}),
        dot: VueTypes.bool.def(false),
    },
    methods: {
        loggy (value) {
            console.log('coords', value)
            return value
        },
    },
}
</script>
