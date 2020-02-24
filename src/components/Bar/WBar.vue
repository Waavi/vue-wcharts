<template>
    <g v-if="isActive">
        <rect
            v-for="(coord, index) in coords"
            :key="index"
            v-bind="{
                ...rectsAttrsFromCoord(coord.xScaled, coord.yScaled),
                ...actualStyles.rect,
            }"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import drawableCartesianMixin from '../../mixins/drawable/drawableCartesianMixin'
import { withXAxisMixin, withYAxisMixin } from '../Axis/withAxisMixin'
import { AXIS_TYPE } from '../Axis/axisMixin'
import { obtainBarWidth, obtainRectBarLayoutGenerator } from './barUtils'

export default {
    name: 'WBar',
    inject: {
        AxisGroup: { default: undefined },
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
                barWidth, Chart, actualXAxisId, actualYAxisId, actualHorizontal, AxisGroup,
            } = this
            const axisId = actualHorizontal ? actualYAxisId : actualXAxisId
            return obtainBarWidth({
                barWidthFromProp: barWidth,
                constrainedWidth: AxisGroup ? AxisGroup.slotWidth : Chart.axisCategoricalStepWidths[axisId],
            })
        },
        rectsAttrsFromCoord () {
            const {
                actualBarWidth, actualHorizontal, actualXAxisId, actualYAxisId, Chart,
            } = this
            return obtainRectBarLayoutGenerator({
                barWidth: actualBarWidth,
                isHorizontal: actualHorizontal,
                valueAxisId: actualHorizontal ? actualXAxisId : actualYAxisId,
                Chart,
            })
        },
    },
}
</script>
