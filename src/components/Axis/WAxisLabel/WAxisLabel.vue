<template>
    <text
        :x="x"
        :y="y"
        :text-anchor="textAnchor"
        :transform="transform"
    >
        <tspan
            v-for="(text, index) in value"
            :key="index"
            :x="x"
            :dy="`${index ? lineHeight : 0}em`"
            :style="styles"
        >
            {{ text }}
        </tspan>
    </text>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'WAxisLabel',
    props: {
        x: VueTypes.number,
        y: VueTypes.number,
        textAnchor: VueTypes.string,
        transform: VueTypes.string,
        value: VueTypes.arrayOf(VueTypes.string),
        styles: VueTypes.any,
        lineHeight: VueTypes.number.def(1.25),
    },
}
</script>
