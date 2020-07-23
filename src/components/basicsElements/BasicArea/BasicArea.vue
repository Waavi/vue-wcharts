<template>
    <path
        v-if="linePath"
        ref="path"
        :d="initialPath"
        v-bind="$attrs"
    />
</template>

<script>
import VueTypes from 'vue-types'
import withAnimation from '../../../transitions/Animation/withAnimation'
import { lineAreaGeneratorFactory, linePathAnimateTo } from '../d3Utils'

const accessorVueType = VueTypes.oneOfType([VueTypes.string, VueTypes.func]).optional

export default {
    name: 'BasicArea',
    mixins: [withAnimation],
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
    data () {
        return {
            initialPath: undefined,
        }
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
        linePath () {
            const { points, areaGenerator } = this
            if (points && points.length > 0 && areaGenerator) {
                const path = areaGenerator(points)
                if (!path.includes('NaN')) {
                    return path
                }
            }
            return undefined
        },
    },
    watch: {
        linePath: {
            handler (newPath, oldPath) {
                if (oldPath) {
                    this.updateLinePath(newPath)
                } else {
                    this.initialPath = newPath
                }
            },
            immediate: true,
        },
    },
    methods: {
        updateLinePath (newPathValue) {
            linePathAnimateTo({ pathRef: this.$refs.path, newPathValue, duration: this.actualAnimDuration })
        },
    },
}
</script>
