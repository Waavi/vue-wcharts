<template>
    <div class="Container">
        <WPieChart
            :dataset="data"
            responsive
        >
            <WPie datakey="one" :radius="[120, 150]" />
        </WPieChart>
    </div>
</template>

<script>
import { chart as data } from './data'

export default {
    name: 'Pie',
    data () {
        return {
            data,
        }
    }
}
</script>