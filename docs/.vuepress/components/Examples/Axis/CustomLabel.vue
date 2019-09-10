<template>
    <WCartesian
        :dataset="data"
        responsive
    >
        <WLine
            datakey="one"
            legend="One Line"
        />
        <WLine
            datakey="two"
            legend="Two Line"
        />
        <WLine
            datakey="three"
            legend="Three Line"
        />
        <WXAxis
            datakey="name"
            :space="[0, 50, 80, 50]"
            :labelSize="14"
            labelAlign="middle"
        >
            <template #label="label">
                <text
                    :x="label.x"
                    :y="label.y"
                    :text-anchor="label.textAnchor"
                    :transform="label.transform"
                    :font-size="14"
                    fill="#48c0b6"
                >
                    Categories &#9673;
                </text>
            </template>
        </WXAxis>
        <WYAxis
            :space="[50, 0, 0, 100]"
            :labelSize="14"
            labelAlign="middle"
        >
            <template #label="label">
                <text
                    :x="label.x"
                    :y="label.y"
                    :text-anchor="label.textAnchor"
                    :transform="label.transform"
                    :font-size="14"
                    fill="#5400e8"
                >
                    Values (€/year)
                </text>
            </template>
        </WYAxis>
    </WCartesian>
</template>

<script>
export default {
    name: 'CustomLabel',
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