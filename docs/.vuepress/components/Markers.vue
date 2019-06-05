<template>
    <WCartesian
        :dataset="data"
        :gap="10"
    >
        <WMarker
            type="x"
            value="Page C"
            :styles="{stroke: '#3fb1e3', strokeWidth: 2}"
            :labelStyles="{fill: '#3fb1e3'}"
            label="Marker x"
        />
        <WMarker
            type="y"
            :value="2000"
            :styles="{stroke: '#3fb1e3', strokeWidth: 2}"
            :labelStyles="{fill: '#3fb1e3'}"
            label="Marker y"
        />
        <WLine
            datakey="one"
            :styles="{stroke: '#ddd'}"
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
    name: 'Markers',
    data () {
        return {
            data
        }
    }
}
</script>