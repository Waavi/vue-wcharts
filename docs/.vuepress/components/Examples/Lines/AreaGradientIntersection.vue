<template>
    <WCartesian
        :dataset="data"
        :bound="[0]"
        responsive
    >
        <WLine
            curve
            datakey="two"
            :styles="{ stroke: '#48c0b6',fill: 'url(#color-id)' }"
        />

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
            curve
            datakey="one"
            area="two"
            :styles="{ stroke: '#5400e8',fill: 'url(#color-id)' }"
        />
    </WCartesian>
</template>

<script>
export default {
    name: 'AreaGradientIntersection',
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
                    name: 'Page E', one: 1890, two: 1000, three: 1700,
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