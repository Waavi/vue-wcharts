<template>
    <WCartesian
        :dataset="data"
        :height="200"
    >
        <WBar
            datakey="two"
        />
        <WXAxis
            datakey="name"
            :axisStyles="{stroke: '#ddd'}"
            :markStyles="{stroke: '#ddd'}"
            :tickStyles="{fill: '#ddd'}"
        />
        <WYAxis
            :axisStyles="{stroke: '#ddd'}"
            :markStyles="{stroke: '#ddd'}"
            :tickStyles="{fill: '#ddd'}"
        />
    </WCartesian>
</template>

<script>
import { chart as data } from './data'

export default {
    name: 'Bars',
    data () {
        return {
            data
        }
    }
}
</script>