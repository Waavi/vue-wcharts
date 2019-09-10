<template>
    <WCartesian
     :dataset="data"
     :gap="40"
     responsive
     scatter
>
        <WScatter datakey="one" legend="One Scatter" />
        <WScatter datakey="two" legend="Two Scatter" />
        <WXAxis
            name="one"
            datakey="one"
            :axisStyles="{stroke: '#ddd'}"
            :markStyles="{stroke: '#ddd'}"
            :tickStyles="{fill: '#ddd'}"
        />
        <WYAxis
            name="two"
            datakey="two"
            :axisStyles="{stroke: '#ddd'}"
            :markStyles="{stroke: '#ddd'}"
            :tickStyles="{fill: '#ddd'}"
        />
        <WZAxis
            name="three"
            datakey="three"
            :range="[100, 1000]"
        />
        <WTooltip />
    </WCartesian>
</template>

<script>
import { chart as data } from '../data'

export default {
    name: 'Scatter',
    data () {
        return {
            data: {
                one: data,
                two: [
                        {
                            name: 'Page A', one: 4000, two: 1400, three: 300,
                        },
                        {
                            name: 'Page B', one: 2000, two: 6210, three: 1398,
                        },
                        {
                            name: 'Page C', one: 2800, two: 8200, three: 100,
                        },
                    ],
            }
        }
    }
}
</script>