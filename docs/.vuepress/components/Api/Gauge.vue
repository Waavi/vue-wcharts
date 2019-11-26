<template>
    <WPieChart
        :dataset="data"
        responsive
    >
        <WGauge
            datakey="one"
            borderRadius="8"
            :maxValue="100"
            :startAngle="180"
            :endAngle="0"
            :radius="[135, 150]"
        />
    </WPieChart>
</template>

<script>
export default {
    name: 'Custom',
    data () {
        return {
            data: [
                {
                    name: 'Page A', one: 60, two: 10,
                },
            ],
        }
    }
}
</script>