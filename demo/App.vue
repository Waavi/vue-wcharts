<template>
    <Chart>
        <Line />
    </Chart>
</template>

<script>
import Line from '@/components/Line.vue'
import Chart from '@/components/Chart.vue'

export default {
    name: 'App',
    components: {
        Line,
        Chart,
    },
}
</script>
