<template>
    <WCartesian
        :dataset="data"
        responsive
        stacked
    >
        <WLine
            datakey="two"
            area
            dot
            legend="One Line"
        />
        <!-- <WBar
            legend="One Bar"
            datakey="one"
            showLabel
            :width="30"
        />
        <WBar
            datakey="two"
            legend="Two Bar"
            showLabel
            :width="30"
        />
        <WBar
            datakey="three"
            legend="Three Bar"
            showLabel
            :width="30"
        /> -->
        <WXAxis
            datakey="name"
            :space="[0, 50, 80, 50]"
        />
        <WYAxis :space="[25, 0, 0, 50]" />
        <WLegends
            position="top"
            align="end"
            selectable
        />
        <WTooltip />
    </WCartesian>
</template>

<script>
import { curveStep } from 'd3-shape'
import VueTypes from 'vue-types'

export default {
    name: 'Cartesian',
    props: {
        data: VueTypes.any,
    },
    data () {
        return {
            curveStep,
        }
    },
}
</script>
