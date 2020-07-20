<template>
    <WChart
        :dataset="dataset"
        responsive
        :padding="[0, 30]"
        :height="50"
    >
        <WXAxis
            datakey="x"
            type="categorical"
            v-bind="$attrs"
        />
        <WYAxis
            datakey="y"
            :domain="[0, 1]"
            invisible
        />
        <WBar
            v-if="type === 'band'"
            color="red"
        />
        <WLine
            v-if="type === 'point'"
            color="transparent"
            dot
        />
    </WChart>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'CategoricalAxisDemo',
    props: {
        type: VueTypes.oneOf(['band', 'point']).isRequired,
        categories: VueTypes.arrayOf(VueTypes.any).def(['A', 'B', 'C', 'D', 'E']),
    },
    computed: {
        dataset () {
            return this.categories.map(category => ({ x: category, y: 0.2 }))
        },
    },
}
</script>
