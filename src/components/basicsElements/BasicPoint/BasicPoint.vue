<template>
    <circle
        :cx="cx"
        :cy="cy"
        :r="r"
        :style="actualStyles"
        v-bind="$attrs"
    />
</template>

<script>
import VueTypes from 'vue-types'
import withAnimation from '../../../transitions/Animation/withAnimation'

export default {
    name: 'BasicPoint',
    mixins: [withAnimation],
    props: {
        cx: VueTypes.number.isRequired,
        cy: VueTypes.number.isRequired,
        r: VueTypes.number.isRequired,
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
