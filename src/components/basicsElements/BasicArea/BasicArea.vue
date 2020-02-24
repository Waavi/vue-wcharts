<template>
    <path
        v-if="computedPath"
        :d="computedPath"
        v-bind="$attrs"
    />
</template>

<script>
import VueTypes from 'vue-types'
import { lineAreaGeneratorFactory } from '../d3Utils'

const accessorVueType = VueTypes.oneOfType([VueTypes.string, VueTypes.func]).optional

export default {
    name: 'BasicArea',
    props: {
        points: VueTypes.array.isRequired,
        xAccessor: accessorVueType,
        x0Accessor: accessorVueType,
        x1Accessor: accessorVueType,
        yAccessor: accessorVueType,
        y0Accessor: accessorVueType,
        y1Accessor: accessorVueType,
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.string, VueTypes.func]).def(false),
    },
    computed: {
        areaGenerator () {
            const {
                xAccessor, x0Accessor, x1Accessor, yAccessor, y0Accessor, y1Accessor, curve,
            } = this
            return lineAreaGeneratorFactory({
                xAccessor, x0Accessor, x1Accessor, yAccessor, y0Accessor, y1Accessor, curve,
            })
        },
        computedPath () {
            const { points, areaGenerator } = this
            if (points && points.length > 0) {
                const path = areaGenerator(points)
                if (!path.includes('NaN')) {
                    return path
                }
            }
            return null
        },
    },
}
</script>
