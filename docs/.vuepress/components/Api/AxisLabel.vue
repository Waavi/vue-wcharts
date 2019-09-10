
<template>
    <WCartesian
        :dataset="data"
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
            :tickStyles="{fill: '#ddd'}"
            label="Categories"
            labelAlign="middle"
            :labelStyles="labelStyles"
        />
        <WYAxis
            :axisStyles="{stroke: '#ddd'}"
            :markStyles="{stroke: '#ddd'}"
            :tickStyles="{fill: '#ddd'}"
            :numTicks="4"
            labelAlign="middle"
            :label="['Values', '(€/year)']"
            :labelStyles="labelStyles"
        />
    </WCartesian>
</template>

<script>
import { chart as data } from '../data'
import colors from '../../colors'

export default {
    name: 'AxisLabel',
    data () {
        return {
            data,
            colors,
            labelStyles: {
                fill: colors.primary,
            }
        }
    }
}
</script>