<template>
    <WCartesian
        :dataset="data"
        responsive
        scatter
    >
        <WScatter />
        <WCartesianGrid />
        <WXAxis
            datakey="two"
            :space="[0, 50, 80, 50]"
        />
        <WYAxis
            datakey="one"
            :space="[25, 0, 0, 50]"
        />
    </WCartesian>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'Scatter',
    props: {
        data: VueTypes.any,
    },
}
</script>
