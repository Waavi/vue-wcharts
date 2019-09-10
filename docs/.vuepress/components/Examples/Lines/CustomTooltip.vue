<template>
    <WCartesian
        :dataset="data"
        responsive
    >
        <WLine
            dot
            datakey="one"
        />
        <WLine
            dot
            datakey="two"
            legend="Two Line"
        />
        <WXAxis
            datakey="name"
        />
        <WYAxis />
        <WTooltip :style="styles">
            <template #default="{ point, value }">
                <div class="Wrapper" v-for="({ value : text , color }, index) in value" :key="index">
                    <div :style="labelStyle"><strong>Category</strong>: {{ text }}</div>
                    <div :style="labelStyle"><strong>Point</strong>: {{ point }}</div>
                    <div :style="{ ...lineStyle, background: color }"></div>
                </div>
            </template>
        </WTooltip>
    </WCartesian>
</template>

<script>
export default {
    name: 'CustomTooltip',
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
            styles: {
                background: '#eee',
            },
            labelStyle: {
                color: '#333',
                fontSize: '12px',
            },
            lineStyle: {
                height: '2px',
                width: '50px',
                marginTop: '5px',
            },
        }
    }
}
</script>