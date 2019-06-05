<template>
    <WCartesian
        :dataset="data"
        :gap="10"
        :height="200"
    >
        <WLine
            datakey="one"
            :styles="{stroke: '#ddd', strokeWidth: 1}"
        />
         <WXAxis
            datakey="name"
            :axisStyles="{stroke: '#ddd'}"
            :markStyles="{stroke: '#ddd'}"
            :tickStyles="{fill: '#ddd'}"
        />
        <WYAxis
            :axisStyles="{stroke: '#3fb1e3'}"
            :markStyles="{stroke: '#3fb1e3'}"
            :tickStyles="{fill: '#3fb1e3'}"
        />
    </WCartesian>
</template>

<script>
import { chart as data } from './data'

export default {
    name: 'YAxis',
    data () {
        return {
            data
        }
    }
}
</script>