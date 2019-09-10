<template>
    <WCartesian
        :dataset="data"
        responsive
    >
    <defs>
        <linearGradient
            id="color-id"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
        >
            <stop
                offset="0"
                stop-color="#ffeb3b"
            />
            <stop
                offset="0.5"
                stop-color="#48c0b6"
            />
            <stop
                offset="1"
                stop-color="#5400e8"
            />
        </linearGradient>
    </defs>
        <WLine
            curve
            :styles="{ stroke: 'url(#color-id)', strokeWidth: 2 }"
            datakey="one"
        />
    </WCartesian>
</template>

<script>
export default {
    name: 'Gradient',
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