<template>
    <WChart
        :dataset="dataset"
        responsive
        :padding="[0, 30]"
        :height="50"
    >
        <WXAxis
            datakey="x"
            type="numeric"
            v-bind="$attrs"
        />
        <WYAxis
            datakey="y"
            :domain="[0, 1]"
            invisible
        />
        <WLine
            color="transparent"
            dot
        />
    </WChart>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'NumericAxisDemo',
    props: {
        nums: VueTypes.arrayOf(VueTypes.any).def([22, 88]),
    },
    computed: {
        dataset () {
            return this.nums.map(num => ({ x: num, y: 0.2 }))
        },
    },
}
</script>
