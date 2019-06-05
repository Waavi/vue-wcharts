<template>
    <WCartesian
        :dataset="data"
        :height="200"
    >
        <WLine
            datakey="one"
            :styles="{stroke: '#ddd'}"
        />
        <WXAxis
            datakey="name"
            :axisStyles="{stroke: '#3fb1e3'}"
            :markStyles="{stroke: '#3fb1e3'}"
            :tickStyles="{fill: '#3fb1e3'}"
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
    name: 'XAxis',
    data () {
        return {
            data
        }
    }
}
</script>