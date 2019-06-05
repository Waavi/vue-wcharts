<template>
    <text
        v-if="value !== undefined"
        :x="x"
        :y="y"
        :dy="dy"
        :stroke="stroke"
        :fill="fill"
        :font-size="fontSize"
        :style="stylesCmp"
    >
        {{ value }}
    </text>
</template>

<script>
import VueTypes from 'vue-types'
import { omit } from 'lodash'

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
        styles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            fontSize: VueTypes.number,
        }).loose.def(() => ({ ...stylesDefaultProp })),
    },
    computed: {
        stylesCmp () {
            return {
                ...omit(stylesDefaultProp, ['stroke', 'fill', 'fontSize']),
                ...omit(this.styles, ['stroke', 'fill', 'fontSize']),
            }
        },
        stroke () {
            return this.styles.stroke || stylesDefaultProp.stroke
        },
        fill () {
            return this.styles.fill || stylesDefaultProp.fill
        },
        fontSize () {
            return this.styles.fontSize || stylesDefaultProp.fontSize
        },
    },
}
</script>
