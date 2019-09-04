<template>
    <WCartesian
        :height="100"
        responsive
    >
        <WDot
            key="dot"
            :index="1"
            :cartesianIndex="1"
            :x="45"
            :y="45"
            :styles="{
                stroke: colors.secondary,
                fill: colors.primary,
                strokeWidth: 5,
                radius: 40
            }"
            transition="all 200ms ease"
        />
    </WCartesian>
</template>

<script>
import { chart as data } from '../data'
import colors from '../../colors'

export default {
    name: 'Dots',
    data () {
        return {
            data,
            colors
        }
    }
}
</script>