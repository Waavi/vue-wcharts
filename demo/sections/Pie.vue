<template>
    <WPieChart
        :dataset="data"
        responsive
    >
        <WPie
            datakey="one"
            :radius="[0, 150]"
        />
        <WTooltip />
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
