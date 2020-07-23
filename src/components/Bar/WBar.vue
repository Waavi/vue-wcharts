<template>
    <g v-if="isActive">
        <BasicRect
            v-for="(coord, index) in coords"
            :key="index"
            v-bind="{
                ...rectsAttrsFromCoord(coord),
                ...actualStyles.rect,
            }"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import noop from 'lodash.noop'
import drawableCartesianMixin from '../../mixins/drawable/drawableCartesianMixin'
import { withXAxisMixin, withYAxisMixin } from '../Axis/withAxisMixin'
import { AXIS_TYPE } from '../Axis/axisMixin'
import { obtainBarWidth, obtainRectBarLayoutGenerator } from './barUtils'
import BasicRect from '../basicsElements/BasicRect/BasicRect.vue'

export default {
    name: 'WBar',
    inject: {
        AxisGroup: { default: undefined },
    },
    components: {
        BasicRect,
    },
    mixins: [
        drawableCartesianMixin,
        withXAxisMixin,
        withYAxisMixin,
    ],
    props: {
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('click'),
        barWidth: VueTypes.number.optional,
        horizontal: VueTypes.bool.optional,
    },
    computed: {
        actualHorizontal () {
            const {
                Chart, horizontal, actualXAxisId, actualYAxisId,
            } = this
            if (typeof horizontal !== 'boolean') {
                return (Chart.axisDefinitions[actualXAxisId].type !== AXIS_TYPE.CATEGORICAL && Chart.axisDefinitions[actualYAxisId].type === AXIS_TYPE.CATEGORICAL)
            }
            return horizontal
        },
        actualBarWidth () {
            const {
                barWidth, actualHorizontal, xScale, yScale,
            } = this
            const scale = actualHorizontal ? yScale : xScale
            return obtainBarWidth({
                barWidthFromProp: barWidth,
                constrainedWidth: (scale.bandwidth || noop)(),
            })
        },
        rectsAttrsFromCoord () {
            const {
                actualBarWidth, actualHorizontal, actualXAxisId, actualYAxisId, Chart, xAccessor, yAccessor,
            } = this
            return coord => obtainRectBarLayoutGenerator({
                barWidth: actualBarWidth,
                isHorizontal: actualHorizontal,
                valueAxisId: actualHorizontal ? actualXAxisId : actualYAxisId,
                Chart,
            })(xAccessor(coord), yAccessor(coord))
        },
    },
}
</script>
