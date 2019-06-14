<template>
    <WCartesian
        :dataset="data"
        responsive
        :bound="[0]"
    >
        <!-- <WLine
            datakey="two"
            area
            dot
            legend="One Line"
        /> -->
        <WBar
            stacked
            datakey="one"
            legend="One Bar"
            showLabel
            :width="80"
        />
        <WBar
            datakey="two"
            legend="Two Bar"
            showLabel
            :width="80"
        />
        <WBar
            stacked
            datakey="three"
            legend="Three Bar"
            showLabel
            :width="80"
        />
        <WBar
            datakey="four"
            legend="Four Bar"
            showLabel
            :width="80"
        />
        <WBar
            stacked
            datakey="five"
            legend="Five Bar"
            showLabel
            :width="80"
        />
        <WXAxis
            datakey="name"
            :space="[0, 50, 80, 50]"
        />
        <WYAxis :space="[25, 0, 0, 50]" />
        <WLegend
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
