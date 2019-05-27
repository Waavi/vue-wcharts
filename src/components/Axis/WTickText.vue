<template>
    <text
        v-if="value !== undefined"
        :x="x"
        :y="y"
        :dy="dy"
        :stroke="stylesCmp.stroke"
        :fill="stylesCmp.fill"
        :font-size="stylesCmp.fontSize"
        :style="stylesCmp"
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
    name: 'WTickText',
    props: {
        x: VueTypes.number,
        y: VueTypes.number,
        dy: VueTypes.string,
        index: VueTypes.number,
        value: VueTypes.oneOfType([String, Number]),
        styles: VueTypes.object,
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
