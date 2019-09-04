<template>
    <WCartesian
        :dataset="data"
        :gap="10"
        :height="200"
        responsive
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
            :axisStyles="{stroke: colors.primary}"
            :markStyles="{stroke: colors.primary}"
            :tickStyles="{fill: colors.primary}"
        />
    </WCartesian>
</template>

<script>
import { chart as data } from '../data'
import colors from '../../colors'

export default {
    name: 'YAxis',
    data () {
        return {
            data,
            colors
        }
    }
}
</script>