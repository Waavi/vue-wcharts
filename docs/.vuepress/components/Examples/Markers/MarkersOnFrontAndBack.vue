
<template>
    <WCartesian :dataset="data">
        <WMarker
            :x="['Page B', 'Page D']"
            :y="[1500, 2700]"
            :borderSpacing="[0, 0.5, 0, 0.5]"
            :styles="styles"
        />
        <WXAxis datakey="name" />
        <WLine
            datakey="one"
            legend="One Line"
            :styles="{ strokeWidth: 40 }"
        />
        <WMarker
            :x="['Page D', 'Page F']"
            :y="[2000, 3200]"
            :borderSpacing="[0, 0.5, 0, 0.5]"
            :styles="styles"
        />
        <WYAxis />
    </WCartesian>
</template>

<script>
export default {
    name: 'Stacked',
    data () {
        return {
            data: [
                {
                    name: 'Page A', one: 1000, two: 2400, three: 2400,
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
                    name: 'Page G', one: 3490, two: 4300, three: -1000,
                },
            ],
            styles: {
                stroke: '#333',
                fill: 'rgb(255, 200, 100)',
                strokeWidth: 1,
                strokeDasharray: 10,
            },
        }
    }
}
</script>