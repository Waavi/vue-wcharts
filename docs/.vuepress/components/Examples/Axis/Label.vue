<template>
    <WCartesian
        :dataset="data"
        :height="300"
        responsive
    >
        <WLine
            datakey="one"
        />
        <WXAxis
            datakey="name"
            label="Categories"
            labelAlign="middle"
        />
        <WYAxis
            :label="['Values', '(€/year))']"
            labelAlign="middle"
        />
    </WCartesian>
</template>

<script>
export default {
    name: 'Label',
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
                    name: 'Page G', one: 3490, two: 4300, three: -1000,
                },
            ],
        }
    }
}
</script>