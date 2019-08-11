<template>
    <WCartesian
        :dataset="data"
        :gap="10"
        responsive
    >
        <WMarker
            type="x"
            value="Page C"
            :styles="{stroke: colors.primary, strokeWidth: 2}"
            :labelStyles="{fill: colors.primary}"
            label="Marker x"
        />
        <WMarker
            type="y"
            :value="2000"
            :styles="{stroke: colors.primary, strokeWidth: 2}"
            :labelStyles="{fill: colors.primary}"
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
import { chart as data } from '../data'
import colors from '../../colors'

export default {
    name: 'Markers',
    data () {
        return {
            data,
            colors
        }
    }
}
</script>