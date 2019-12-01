<template>
    <div>
        <WChart
            :dataset="dataset"
            responsive
            :padding="chartPadding"
        >
            <WXAxis
                type="categorical"
                datakey="lap"
                :position="xAxisPosition"
            />
            <WYAxis
                id="time"
                :position="yAxisPosition"
                :numTicks="4"
                :domain2="[0, n => n]"
                :tickFormatter="yTickFormatter"
                :styles="{
                    line: {
                        stroke: '#b88'
                    },
                }"
            />
            <WLine
                yAxisId="time"
                :yDatakey="yDatakey"
                color="#f55"
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
            dataset: [
                { lap: 'LAP 1', seatTime: 37, chevroletTime: 32 },
                { lap: 'LAP 2', seatTime: 38, chevroletTime: 33 },
                { lap: 'LAP 3', seatTime: 36, chevroletTime: 31 },
                { lap: 'LAP 4', seatTime: 39, chevroletTime: 32 },
                { lap: 'LAP 5', seatTime: 37, chevroletTime: 33 },
            ],
            xAxisPosition: 'bottom',
            yAxisPosition: 'left',
            yDatakey: 'seatTime',
            chartPadding: [20, 30, 40, 50],
        }
    },
    methods: {
        change () {
            // this.xAxisPosition = this.xAxisPosition === 'top' ? 'bottom' : 'top'
            // this.yAxisPosition = this.yAxisPosition === 'left' ? 'right' : 'left'
            this.yDatakey = this.yDatakey === 'seatTime' ? 'chevroletTime' : 'seatTime'
        },
        yTickFormatter (value) {
            if (typeof value === 'number') {
                return value.toFixed(2)
            }
            return value
        },
    },
}
</script>
