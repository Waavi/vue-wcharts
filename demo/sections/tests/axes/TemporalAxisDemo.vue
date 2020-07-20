<template>
    <WChart
        :dataset="dataset"
        responsive
        :padding="[0, 30]"
        :height="50"
    >
        <WXAxis
            datakey="x"
            type="temporal"
            v-bind="$attrs"
            :tickFormatter="tickFormatter"
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
    name: 'TemporalAxisDemo',
    props: {
        dates: VueTypes.arrayOf(VueTypes.any).def([new Date(2019, 11, 30, 3, 53), new Date(2020, 0, 1, 15, 32)]),
    },
    computed: {
        dataset () {
            return this.dates.map(date => ({ x: date, y: 0.2 }))
        },
    },
    methods: {
        tickFormatter (date) {
            return `${date.getMonth() + 1}/${date.getDate()} | ${date.getHours()}h`
        },
    },
}
</script>
