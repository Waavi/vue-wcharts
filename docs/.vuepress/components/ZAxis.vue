<template>
    <WCartesian
     :dataset="data"
     :gap="40"
     responsive
     scatter
>
        <WScatter />
        <WXAxis
            name="one"
            datakey="one"
            :axisStyles="{stroke: '#ddd'}"
            :markStyles="{stroke: '#ddd'}"
            :tickStyles="{fill: '#ddd'}"
        />
        <WYAxis
            name="two"
            datakey="two"
            :axisStyles="{stroke: '#ddd'}"
            :markStyles="{stroke: '#ddd'}"
            :tickStyles="{fill: '#ddd'}"
        />
        <WZAxis
            name="three"
            datakey="three"
            :range="[100, 1000]"
        />
        <WTooltip />
    </WCartesian>
</template>

<script>
import { chart as data } from './data'

export default {
    name: 'ZAxis',
    data () {
        return {
            data
        }
    }
}
</script>