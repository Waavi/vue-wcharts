<template>
    <text
        v-if="text"
        :fill="fill"
        :x="text.x"
        :y="text.y"
        :dy="text.dy"
    >
        {{ text.value }}
    </text>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'Tick',
    props: {
        text: VueTypes.shape({
            x: VueTypes.number,
            y: VueTypes.number,
            dy: VueTypes.string,
            index: VueTypes.number,
            value: VueTypes.oneOfType([String, Number]),
        }),
        fill: VueTypes.string,
    },
}
</script>
