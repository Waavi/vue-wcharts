<template>
    <WCartesian
        :dataset="data"
        :height="300"
        responsive
    >
        <WBar
            datakey="one"
            showLabel
            labelPosition="inside"
            :width="45"
            stacked
        />
        <WBar
            datakey="two"
            showLabel
            labelPosition="inside"
            :width="45"
            stacked
        />
        <WBar
            datakey="three"
            showLabel
            labelPosition="inside"
            :width="45"
            stacked
        />
        <WLine datakey="four" dot />
        <WXAxis
            datakey="name"
            :space="[0, 50, 80, 50]"
        />
        <WYAxis :space="[25, 0, 0, 50]" />
    </WCartesian>
</template>

<script>
export default {
    name: 'StackedWithLine',
    data () {
        return {
            data: [
                {
                    name: 'Page A', one: 3000, two: 1400, three: 400, four: 1400,
                },
                {
                    name: 'Page B', one: 2000, two: 2398, three: 1210, four: 110,
                },
                {
                    name: 'Page C', one: 10, two: 8800, three: 1290, four: 22290,
                },
                {
                    name: 'Page D', one: 1780, two: 1908, three: 2000, four: 24000,
                },
                {
                    name: 'Page E', one: 4890, two: 8800, three: 5700, four: 21700,
                },
                {
                    name: 'Page F', one: 5390, two: 6800, three: 7500, four: 16500,
                },
                {
                    name: 'Page G', one: 8490, two: 6300, three: 6100, four: 18000,
                },
            ],
        }
    }
}
</script>