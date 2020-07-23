<template>
    <g v-if="isActive">
        <BasicPoint
            v-for="(coord, index) in coords"
            :key="index"
            :cx="xAccessor(coord)"
            :cy="yAccessor(coord)"
            v-bind="actualStyles.point"
            :r="radius(coord)"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import drawableCartesianMixin from '../../mixins/drawable/drawableCartesianMixin'
import { withXAxisMixin, withYAxisMixin, withZAxisMixin } from '../Axis/withAxisMixin'
import BasicPoint from '../basicsElements/BasicPoint/BasicPoint.vue'

export default {
    name: 'WScatter',
    components: {
        BasicPoint,
    },
    mixins: [
        drawableCartesianMixin,
        withXAxisMixin,
        withYAxisMixin,
        withZAxisMixin,
    ],
    props: {
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('click'),
        label: VueTypes.string,
    },
    methods: {
        radius (coord) {
            const { zAccessor, actualStyles } = this
            if (coord) {
                const r = zAccessor(coord)
                return r === undefined ? ((actualStyles.point || {}).r || 5) : r
            }
            return 0
        },
    },
}
</script>
