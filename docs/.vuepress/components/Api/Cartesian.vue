<template>
    <WCartesian
        :dataset="data"
        responsive
    >
        <WLine
            datakey="one"
            dot
        />
        <WLine
            datakey="two"
            dot
        />
        <WLine
            datakey="three"
            dot
        />
        <WXAxis
            datakey="name"
        />
        <WYAxis />
        <WTooltip />
    </WCartesian>
</template>

<script>
import { chart as data } from '../data'

export default {
    name: 'Cartesian',
    data () {
        return {
            data
        }
    }
}
</script>