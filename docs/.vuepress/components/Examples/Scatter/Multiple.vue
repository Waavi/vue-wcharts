<template>
    <WCartesian
        :dataset="data"
        responsive
        scatter
        :bound="[n => n - 1000,n => n + 1000]"
        :xBound="[n => n - 1000,n => n + 1000]"
    >
        <WCartesianGrid />
        <WScatter line datakey="one" legend="One Scatter" />
        <WScatter line datakey="two" legend="Two Scatter" />
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
        <WZAxis
            name="three"
            datakey="three"
            :range="[100, 5000]"
        />
        <WTooltip />
        <WLegend
            position="top"
            align="end"
            selectable
        />
    </WCartesian>
</template>

<script>
export default {
    name: 'Multiple',
    data () {
        return {
            data: {
                one: [
                    {
                        name: 'Page A', one: 4000, two: 2400, three: 2300,
                    },
                    {
                        name: 'Page B', one: 3000, two: 2210, three: 1398,
                    },
                    {
                        name: 'Page C', one: 9800, two: 2200, three: 100,
                    },
                    {
                        name: 'Page D', one: 2780, two: 3908, three: 2000,
                    },
                    {
                        name: 'Page E', one: 1890, two: 4800, three: 1700,
                    },
                    {
                        name: 'Page F', one: 2390, two: 3800, three: 2500,
                    },
                    {
                        name: 'Page G', one: 3490, two: 4300, three: 2100,
                    },
                ],
                two: [
                    {
                        name: 'Page A', one: 4000, two: 1400, three: 300,
                    },
                    {
                        name: 'Page B', one: 2000, two: 6210, three: 1398,
                    },
                    {
                        name: 'Page C', one: 2800, two: 8200, three: 100,
                    },
                ],
            },
        }
    }
}
</script>