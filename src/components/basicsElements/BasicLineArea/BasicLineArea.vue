<template>
    <g>
        <BasicArea
            :points="datums"
            :xAccessor="xAccessor"
            :x0Accessor="x0Accessor"
            :x1Accessor="x1Accessor"
            :yAccessor="yAccessor"
            :y0Accessor="y0Accessor"
            :y1Accessor="y1Accessor"
            :curve="curve"
            v-bind="$attrs"
        />
        <BasicLine
            v-if="withStartStroke"
            :datums="datums"
            :xAccessor="x0Accessor || xAccessor"
            :yAccessor="y0Accessor || yAccessor"
            :curve="curve"
            :stroke="withStartStroke"
        />
        <BasicLine
            v-if="withEndStroke"
            :datums="datums"
            :xAccessor="x1Accessor || xAccessor"
            :yAccessor="y1Accessor || yAccessor"
            :curve="curve"
            :stroke="withEndStroke"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import BasicArea from '../BasicArea/BasicArea.vue'
import BasicLine from '../BasicLine/BasicLine.vue'

const accessorVueType = VueTypes.oneOfType([VueTypes.string, VueTypes.func]).optional

export default {
    name: 'BasicLineArea',
    components: {
        BasicArea,
        BasicLine,
    },
    props: {
        datums: VueTypes.array.isRequired,
        xAccessor: accessorVueType,
        x0Accessor: accessorVueType,
        x1Accessor: accessorVueType,
        yAccessor: accessorVueType,
        y0Accessor: accessorVueType,
        y1Accessor: accessorVueType,
        withStartStroke: VueTypes.string.optional,
        withEndStroke: VueTypes.string.optional,
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.string, VueTypes.func]).def(false),
    },
}
</script>
