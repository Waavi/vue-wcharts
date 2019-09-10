<template>
    <WCartesian
        :dataset="data"
        responsive
        scatter
        :bound="[n => n - 1000,n => n + 1000]"
        :xBound="[n => n - 1000,n => n + 1000]"
    >
        <WCartesianGrid />
        <WScatter line legend="One Scatter" />
        <WXAxis
            name="one"
            datakey="one"
            :space="[0, 50, 50, 50]"
        />
        <WYAxis
            name="two"
            datakey="two"
            :space="[25, 0, 0, 50]"
        />
        <WTooltip />
        <WLegend
            position="top"
            align="end"
        />
    </WCartesian>
</template>

<script>
export default {
    name: 'CustomLine',
    data () {
        return {
            data: [
                {
                    name: 'Page A', one: 1000, two: 2000, three: 2400,
                },
                {
                    name: 'Page B', one: 3000, two: 1398, three: 2210,
                },
                {
                    name: 'Page C', one: 2000, two: 9800, three: 2290,
                },
                {
                    name: 'Page D', one: 2780, two: 3908, three: 2000,
                },
                {
                    name: 'Page E', one: 1890, two: 0, three: 1700,
                },
                {
                    name: 'Page F', one: 2390, two: 3800, three: 2500,
                },
                {
                    name: 'Page G', one: 3490, two: 4300, three: 1000,
                },
            ],
        }
    }
}
</script>