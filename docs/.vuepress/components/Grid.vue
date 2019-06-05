<template>
    <WCartesian
        :dataset="data"
        :gap="10"
    >
        <WCartesianGrid
            :styles="{stroke: colors.primary, strokeWidth: 2}"
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
import colors from '../colors'

export default {
    name: 'Grid',
    data () {
        return {
            data,
            colors
        }
    }
}
</script>