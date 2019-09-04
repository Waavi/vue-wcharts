<template>
    <WCartesian
        :bound="[-1000, n => n + 1000]"
        :dataset="data"
        :gap="25"
        responsive
    >
        <WLine
            datakey="one"
        />
        <WLine
            datakey="two"
        />
        <WLine
            datakey="three"
        />
        <WXAxis
            datakey="name"
        />
        <WYAxis :space="[0, 0, 0, 50]" />
    </WCartesian>
</template>

<script>
export default {
    name: 'BoundsAndGap',
    data () {
        return {
            data: [
                {
                    key: 'Page A', one: 1000, two: 2000, three: 2400,
                },
                {
                    key: 'Page B', one: 3000, two: 1398, three: 2210,
                },
                {
                    key: 'Page C', one: 2000, two: 9800, three: 2290,
                },
                {
                    key: 'Page D', one: 2780, two: 3908, three: 2000,
                },
                {
                    key: 'Page E', one: 1890, two: 0, three: 1700,
                },
                {
                    key: 'Page F', one: 2390, two: 3800, three: 2500,
                },
                {
                    key: 'Page G', one: 3490, two: 4300, three: -1000,
                },
            ],
        }
    }
}
</script>