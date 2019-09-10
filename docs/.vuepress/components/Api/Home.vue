<template>
    <WCartesian
        :dataset="data"
        responsive
    >
        <WLine
            datakey="one"
            dot
        />
        <WLine
            datakey="two"
            dot
        />
        <WLine
            datakey="three"
            dot
        />
        <WXAxis
            datakey="name"
        />
        <WYAxis />
        <WTooltip />
    </WCartesian>
</template>

<script>

const dataOne = [
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
        name: 'Page G', one: 3490, two: 4300, three: 1000,
    },
]

const dataTwo = [
    {
        name: 'Page A', one: 3000, two: 1400, three: 400,
    },
    {
        name: 'Page B', one: 2000, two: 2398, three: 1210,
    },
    {
        name: 'Page C', one: 2500, two: 8800, three: 1290,
    },
    {
        name: 'Page D', one: 1780, two: 1908, three: 2000,
    },
    {
        name: 'Page E', one: 4890, two: 8800, three: 5700,
    },
    {
        name: 'Page F', one: 5390, two: 6800, three: 7500,
    },
    {
        name: 'Page G', one: 8490, two: 6300, three: 6100,
    },
]

export default {
    name: 'Home',
    data () {
        return {
            data: dataOne,
            delay: 3000,
        }
    },
    mounted () {
        setInterval(() => {
            this.data = this.data === dataOne ? dataTwo : dataOne
        }, this.delay);
    }
}
</script>