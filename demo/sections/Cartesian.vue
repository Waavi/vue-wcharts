<template>
    <div>
        <WChart
            :dataset="dataset"
            responsive
            :padding="chartPadding"
        >
            <WXAxis
                id="lap"
                type="categorical"
                position="top"
            />
            <WXAxis
                id="lapReversed"
                position="bottom"
            />
            <WYAxis
                id="time"
                position="left"
                :numTicks="4"
                :domain2="[0, n => n]"
                :tickFormatter="yTickFormatter"
                :styles="{
                    line: {
                        stroke: '#b88'
                    },
                }"
            />
            <WYAxis
                id="performance"
                position="right"
                :numTicks="4"
                :domain2="[0, n => n]"
                :tickFormatter="yTickFormatter"
                :styles="{
                    line: {
                        stroke: '#88b'
                    },
                }"
            />
            <WLine
                xAxisId="lap"
                xDatakey="lap"
                yAxisId="time"
                yDatakey="time"
                :styles="{
                    line: {
                        stroke: 'red'
                    },
                }"
            />
            <WLine
                xAxisId="lapReversed"
                xDatakey="lapReversed"
                yAxisId="performance"
                yDatakey="performance"
                :styles="{
                    line: {
                        stroke: 'blue'
                    },
                }"
            />
        </WChart>

        <div>
            <button
                class="Btn"
                @click="change"
            >
                Change
            </button>
        </div>
    </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'Cartesian',
    props: {
        data: VueTypes.any,
    },
    data () {
        return {
            dataset: this.randomDataset(),
            xAxisPosition: 'bottom',
            yAxisPosition: 'left',
            yDatakey: 'time',
            chartPadding: [20, 30, 40, 50],
        }
    },
    methods: {
        change () {
            this.dataset = this.randomDataset()
            this.xAxisPosition = this.xAxisPosition === 'top' ? 'bottom' : 'top'
            this.yAxisPosition = this.yAxisPosition === 'left' ? 'right' : 'left'
        },
        yTickFormatter (value) {
            if (typeof value === 'number') {
                return value.toFixed(2)
            }
            return value
        },
        randomDataset () {
            const nearTo = (x, delta) => Math.round(x - delta + 2 * delta * Math.random())
            return [
                {
                    lap: 'LAP 1', time: nearTo(37, 3), performance: nearTo(90, 5), lapReversed: 5,
                },
                {
                    lap: 'LAP 2', time: nearTo(38, 3), performance: nearTo(87, 5), lapReversed: 4.5,
                },
                {
                    lap: 'LAP 3', time: nearTo(36, 3), performance: nearTo(86, 5), lapReversed: 3,
                },
                {
                    lap: 'LAP 4', time: nearTo(39, 3), performance: nearTo(80, 5), lapReversed: 2.5,
                },
                {
                    lap: 'LAP 5', time: nearTo(37, 3), performance: nearTo(72, 5), lapReversed: 1,
                },
            ]
        },
    },
}
</script>
