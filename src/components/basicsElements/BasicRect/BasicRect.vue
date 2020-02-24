<template>
    <rect
        :x="x"
        :y="y"
        :width="width"
        :height="height"
        v-bind="$attrs"
    />
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'BasicRect',
    props: {
        x: VueTypes.number.isRequired,
        y: VueTypes.number.isRequired,
        width: VueTypes.number.isRequired,
        height: VueTypes.number.isRequired,
    },
}
</script>
