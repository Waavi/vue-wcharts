<template>
    <WCartesian
        :dataset="data"
        responsive
    >
    <defs>
        <linearGradient
            id="color-id"
            x1="0"
            y1="1"
            x2="0"
            y2="0"
        >
            <stop
                offset="0%"
                stop-color="#ffeb3b"
                stop-opacity="0.6"
            />
            <stop
                offset="30%"
                stop-color="#48c0b6"
                stop-opacity="0.4"
            />
            <stop
                offset="100%"
                stop-color="#5400e8"
                stop-opacity="0.2"
            />
        </linearGradient>
    </defs>
        <WLine
            area
            curve
            datakey="one"
            :styles="{ stroke: '#5400e8',fill: 'url(#color-id)' }"
        />
    </WCartesian>
</template>

<script>
export default {
    name: 'AreaGradient',
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