<template>
    <WPieChart
        :dataset="data"
        responsive
    >
        <p>Pie</p>
    </WPieChart>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'Pie',
    props: {
        data: VueTypes.any,
    },
}
</script>
