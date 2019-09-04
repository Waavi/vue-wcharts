<template>
    <WCartesian
        :dataset="data"
        responsive
    >
        <WLine
            dot
            datakey="one"
        >
            <template
                #dot="{ dot, styles, Chart, transition }"
            >
                <g
                    :fill="dot.stroke"
                >
                    <rect
                        :x="Chart.active.el && Chart.active.el.id === dot.cartesianIndex && Chart.active.el.point === dot.index ? dot.x - 10 : dot.x - 7"
                        :y="Chart.active.el && Chart.active.el.id === dot.cartesianIndex && Chart.active.el.point === dot.index ? dot.y - 10 : dot.y - 7"
                        :width="Chart.active.el && Chart.active.el.id === dot.cartesianIndex && Chart.active.el.point === dot.index ? 20 : 14"
                        :height="Chart.active.el && Chart.active.el.id === dot.cartesianIndex && Chart.active.el.point === dot.index ? 20 : 14"
                        @mouseenter="Chart.setActive(dot.info, $event)"
                        @mouseleave="Chart.cleanActive"
                        :style="{ transition }"
                    />
                    <text
                        :x="dot.x"
                        :y="dot.y"
                        text-anchor='middle'
                        dy="-14">
                        {{ dot.value }}
                    </text>
                </g>
            </template>
        </WLine>
        <WXAxis
            datakey="name"
        />
        <WYAxis />
        <WTooltip />
    </WCartesian>
</template>

<script>
export default {
    name: 'CustomDots',
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