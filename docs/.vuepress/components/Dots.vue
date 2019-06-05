<template>
    <WCartesian
        :height="100"
    >
        <WDot
            key="dot"
            :index="1"
            :cartesianIndex="1"
            :x="45"
            :y="45"
            :styles="{
                stroke: '#6be6c1',
                fill: '#3fb1e3',
                strokeWidth: 5,
                radius: 40
            }"
            transition="all 200ms ease"
        />
    </WCartesian>
</template>

<script>
import { chart as data } from './data'

export default {
    name: 'Dots',
    data () {
        return {
            data
        }
    }
}
</script>