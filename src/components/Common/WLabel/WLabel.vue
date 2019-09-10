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
            :dy="`${index * 1}em`"
            :style="styles"
        >
            {{ text }}
        </tspan>
    </text>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'WLabel',
    props: {
        x: VueTypes.number,
        y: VueTypes.number,
        textAnchor: VueTypes.string,
        transform: VueTypes.string,
        value: VueTypes.arrayOf(VueTypes.string),
        styles: VueTypes.any,
    },
}
</script>
