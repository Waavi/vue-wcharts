<template>
    <path
        v-if="computedPath"
        ref="path"
        :d="computedPath"
        v-bind="attrs"
    />
</template>

<script>
import VueTypes from 'vue-types'
import { pathGenerator } from '../svgUtils'

export default {
    name: 'BLine',
    props: {
        datums: VueTypes.array.isRequired,
        xAccessor: VueTypes.oneOfType([VueTypes.string, VueTypes.func]).def(d => d.x),
        yAccessor: VueTypes.oneOfType([VueTypes.string, VueTypes.func]).def(d => d.y),
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.func]).def(false),
        styles: VueTypes.object.def({}),
    },
    computed: {
        normalizedXAccesor () {
            const { xAccessor } = this
            return typeof xAccessor === 'string' ? d => d[xAccessor] : xAccessor
        },
        normalizedYAccesor () {
            const { yAccessor } = this
            return typeof yAccessor === 'string' ? d => d[yAccessor] : yAccessor
        },
        lineGenerator () {
            const { normalizedXAccesor, normalizedYAccesor, curve } = this
            return pathGenerator({ xAccessor: normalizedXAccesor, yAccessor: normalizedYAccesor, curve })
        },
        computedPath () {
            const { datums, lineGenerator } = this
            const path = lineGenerator(datums)
            return path.includes('NaN') ? null : path
        },
        attrs () {
            const {
                datums, xAccessor, yAccessor, curve, ...restProps
            } = this.$props
            return restProps
        },
    },
}
</script>
