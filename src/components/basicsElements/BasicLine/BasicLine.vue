<template>
    <path
        v-if="linePath"
        ref="path"
        :d="initialPath"
        :fill="fill"
        v-bind="$attrs"
    />
</template>

<script>
import VueTypes from 'vue-types'
import withAnimation from '../../../transitions/Animation/withAnimation'
import { lineGeneratorFactory, linePathAnimateTo } from '../d3Utils'

export default {
    name: 'BasicLine',
    mixins: [withAnimation],
    props: {
        datums: VueTypes.array.isRequired,
        xAccessor: VueTypes.oneOfType([VueTypes.string, VueTypes.func]).def(d => d.x),
        yAccessor: VueTypes.oneOfType([VueTypes.string, VueTypes.func]).def(d => d.y),
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.string, VueTypes.func]).def(false),
        fill: VueTypes.string.def('none'),
    },
    data () {
        return {
            initialPath: undefined,
        }
    },
    computed: {
        lineGenerator () {
            const { xAccessor, yAccessor, curve } = this
            return lineGeneratorFactory({ xAccessor, yAccessor, curve })
        },
        linePath () {
            const { datums, lineGenerator } = this
            if (datums && datums.length > 0 && lineGenerator) {
                const path = lineGenerator(datums)
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
