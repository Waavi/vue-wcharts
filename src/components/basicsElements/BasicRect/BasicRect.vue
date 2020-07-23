<template>
    <rect
        :x="x"
        :y="y"
        :width="width"
        :height="height"
        :style="actualStyles"
        v-bind="$attrs"
    />
</template>

<script>
import VueTypes from 'vue-types'
import withAnimation from '../../../transitions/Animation/withAnimation'

export default {
    name: 'BasicRect',
    mixins: [withAnimation],
    props: {
        x: VueTypes.number.isRequired,
        y: VueTypes.number.isRequired,
        width: VueTypes.number.isRequired,
        height: VueTypes.number.isRequired,
        styles: VueTypes.object.optional,
    },
    computed: {
        actualStyles () {
            const { styles, actualAnimDuration } = this
            return { transition: `all ${actualAnimDuration}ms`, ...(styles || {}) }
        },
    },
}
</script>
