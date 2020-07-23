<template>
    <BasicLineArea
        v-if="isActive"
        :datums="dataValues"
        v-bind="accessors"
        :fill="actualColor.secondary"
        :withEndStroke="actualColor.main"
        :curve="curve"
    />
</template>

<script>
import VueTypes from 'vue-types'
import stackedMixin from './stackedMixin'
import BasicLineArea from '../basicsElements/BasicLineArea/BasicLineArea.vue'
import { AXIS_DIMENSION } from '../Axis/axisMixin'

export default {
    name: 'StackedLine',
    components: {
        BasicLineArea,
    },
    mixins: [stackedMixin],
    props: {
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.string, VueTypes.func]).optional,
    },
    computed: {
        isVerticalLayout () {
            const { baseAxisDimension } = this
            return baseAxisDimension === AXIS_DIMENSION.Y
        },
        accessors () {
            const { isVerticalLayout } = this
            if (isVerticalLayout) {
                return {
                    yAccessor: d => d.baseValueScaled,
                    x0Accessor: d => d.cumulativeValueScaled[0],
                    x1Accessor: d => d.cumulativeValueScaled[1],
                }
            }
            return {
                xAccessor: d => d.baseValueScaled,
                y0Accessor: d => d.cumulativeValueScaled[0],
                y1Accessor: d => d.cumulativeValueScaled[1],
            }
        },
    },
}
</script>
