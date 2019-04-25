<template>
    <text
        v-if="value !== undefined"
        :x="x"
        :y="y"
        :dy="dy"
        :stroke="stylesCmp.stroke"
        :fill="stylesCmp.fill"
        :font-size="stylesCmp.fontSize"
    >
        {{ value }}
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
    name: 'TickText',
    props: {
        x: VueTypes.number,
        y: VueTypes.number,
        dy: VueTypes.string,
        index: VueTypes.number,
        value: VueTypes.oneOfType([String, Number]),
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
