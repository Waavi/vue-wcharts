
<template>
    <WCartesian :dataset="data">
        <WLine
            datakey="one"
            legend="One Line"
        />
        <WMarker
            :x="['Page C', 'Page E']"
            :y="[1500, 2700]"
            :borderSpacing="[0, 0.5, 0, 0.5]"
            #default="{ x, y, width, height, styles }"
        >
            <g :transform="'translate('+x+', '+y+')'">
                <rect
                    :x="0"
                    :y="0"
                    :width="width"
                    :height="height"
                    stroke="rgba(255, 150, 150, 1)"
                    stroke-width="2"
                    fill="rgba(255, 150, 150, 0.2)"
                    rx="40"
                    ry="40"
                />
                <text
                    :x="0"
                    :y="0"
                    fill="rgba(255, 150, 150, 1)"
                    text-anchor="middle"
                    :transform="'translate('+(width / 2)+', '+(height / 2)+') rotate(-20)'"
                >
                    This is my marker!
                </text>
            </g>
        </WMarker>
        <WXAxis datakey="name" />
        <WYAxis />
    </WCartesian>
</template>

<script>
export default {
    name: 'CustomMarkers',
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
                strokeWidth: 1,
                strokeDasharray: 0,
            },
        }
    }
}
</script>