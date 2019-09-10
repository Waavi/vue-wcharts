<template>
    <WCartesian
        :dataset="data"
        :gap="10"
        responsive
    >
        <WLine
            datakey="one"
            dot
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
    name: 'Lines',
    data () {
        return {
            data
        }
    }
}
</script>