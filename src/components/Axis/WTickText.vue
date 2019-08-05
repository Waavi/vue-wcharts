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
import omit from 'lodash.omit'
import themeMixin from '../../mixins/theme'

export default {
    name: 'WTickText',
    mixins: [themeMixin],
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
        }).loose,
    },
    computed: {
        stylesCmp () {
            return {
                ...omit(this.themeStyles.styles, ['stroke', 'fill', 'fontSize']),
                ...omit(this.styles, ['stroke', 'fill', 'fontSize']),
            }
        },
        stroke () {
            return this.styles.stroke || this.themeStyles.styles.stroke
        },
        fill () {
            return this.styles.fill || this.themeStyles.styles.fill
        },
        fontSize () {
            return this.styles.fontSize || this.themeStyles.styles.fontSize
        },
    },
}
</script>
