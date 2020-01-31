<template>
    <WCartesian
        :dataset="data"
        responsive
        scatter
        :bound="[n => n - 1000,n => n + 1000]"
        :xBound="[n => n - 1000,n => n + 1000]"
    >
        <WCartesianGrid />
        <WScatter
            line
            curve
            legend="One Scatter"
        />
        <WXAxis
            name="one"
            datakey="one"
            :space="[0, 50, 80, 50]"
        />
        <WYAxis
            name="two"
            datakey="two"
            :space="[25, 0, 0, 50]"
        />
        <WZAxis
            name="three"
            datakey="three"
            :range="[100, 5000]"
        />
        <WTooltip />

        <WLegend
            position="bottom"
            align="end"
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
