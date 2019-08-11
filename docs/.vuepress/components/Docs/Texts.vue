
<template>
    <WCartesian
        :dataset="data"
        :height="200"
        responsive
    >
        <WLine
            datakey="one"
            :styles="{stroke: '#ddd'}"
        />
        <WXAxis
            datakey="name"
            :axisStyles="{stroke: '#ddd'}"
            :markStyles="{stroke: '#ddd'}"
            :tickStyles="{fill: colors.primary}"
        />
        <WYAxis
            :axisStyles="{stroke: '#ddd'}"
            :markStyles="{stroke: '#ddd'}"
            :tickStyles="{fill: colors.primary}"
        />
    </WCartesian>
</template>

<script>
import { chart as data } from '../data'
import colors from '../../colors'

export default {
    name: 'Texts',
    data () {
        return {
            data,
            colors
        }
    }
}
</script>