<template>
    <path
        v-if="computedPath"
        :d="computedPath"
        :fill="fill"
        v-bind="$attrs"
    />
</template>

<script>
import VueTypes from 'vue-types'
import { lineGeneratorFactory } from '../d3Utils'

export default {
    name: 'BasicLine',
    props: {
        datums: VueTypes.array.isRequired,
        xAccessor: VueTypes.oneOfType([VueTypes.string, VueTypes.func]).def(d => d.x),
        yAccessor: VueTypes.oneOfType([VueTypes.string, VueTypes.func]).def(d => d.y),
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.string, VueTypes.func]).def(false),
        fill: VueTypes.string.def('none'),
    },
    computed: {
        lineGenerator () {
            const { xAccessor, yAccessor, curve } = this
            return lineGeneratorFactory({ xAccessor, yAccessor, curve })
        },
        computedPath () {
            const { datums, lineGenerator } = this
            if (datums && datums.length > 0) {
                const path = lineGenerator(datums)
                if (!path.includes('NaN')) {
                    return path
                }
            }
            return null
        },
    },
}
</script>
