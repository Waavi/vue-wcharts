<template>
    <g v-if="isActive">
        <BasicRect
            v-for="(datum, index) in dataValues"
            :key="index"
            v-bind="rectsAttrsFromCoord(datum.baseValueScaled, datum.cumulativeValueScaled)"
            :fill="actualColor.main"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import stackedMixin from './stackedMixin'
import BasicRect from '../basicsElements/BasicRect/BasicRect.vue'
import { AXIS_DIMENSION } from '../Axis/axisMixin'
import { obtainRectBarLayoutGenerator } from '../Bar/barUtils'

export default {
    name: 'StackedBar',
    components: {
        BasicRect,
    },
    mixins: [stackedMixin],
    props: {
        withLabel: VueTypes.bool.optional,
    },
    computed: {
        actualWithLabel () {
            const { Stack, withLabel } = this
            return withLabel === undefined ? Stack.withLabels : withLabel
        },
        isVerticalLayout () {
            const { baseAxisDimension } = this
            return baseAxisDimension === AXIS_DIMENSION.Y
        },
        isHorizontal () {
            return this.isVerticalLayout
        },
        rectsAttrsFromCoord () {
            const { Stack, isHorizontal } = this
            const rectBarLayoutGenerator = obtainRectBarLayoutGenerator({
                barWidth: Stack.actualBarWidth,
                isHorizontal,
                valueAxisId: Stack.actualCumulativeAxisId,
                Chart: Stack.Chart,
            })
            return isHorizontal ? (x, y) => rectBarLayoutGenerator(y, x) : rectBarLayoutGenerator
        },
    },
}
</script>
