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
            :axisStyles="{stroke: colors.primary}"
            :markStyles="{stroke: colors.primary}"
            :tickStyles="{fill: colors.primary}"
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
    name: 'XAxis',
    data () {
        return {
            data,
            colors
        }
    }
}
</script>