<template>
    <text
        v-if="text"
        :x="text.x"
        :y="text.y"
        :dy="text.dy"
        :stroke="stylesCmp.stroke"
        :fill="stylesCmp.fill"
        :font-size="stylesCmp.fontSize"
    >
        {{ text.value }}
    </text>
</template>

<script>
import VueTypes from 'vue-types'

const stylesDefaultProp = {
    fill: 'none',
    stroke: 'none',
    fontSize: 14,
}

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
        styles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            fontSize: VueTypes.oneOfType([String, Number]),
        }).def(() => ({
            ...stylesDefaultProp,
        })),
    },
    computed: {
        stylesCmp () {
            return {
                ...stylesDefaultProp,
                ...this.styles,
            }
        },
    },
}
</script>
