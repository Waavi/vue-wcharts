<template>
    <div>
        <WCartesian2
            :dataset="dataset2"
            responsive
            :padding="chartPadding"
        >
            <WLine2
                id="time"
                yAxisId="time"
                yDatakey="time"
                color="#f55"
            />
            <WLine2
                id="performance"
                yAxisId="performance"
                yDatakey="tiresPerformance"
                color="#55f"
            />
            <!-- <WLine
                series="chevrolet"
                xDatakey="timestamp"
                yDatakey="speed"
            /> -->
            <WXAxis2 type="categorical" datakey="lap" position="bottom" />
            <WYAxis2
                id="time"
                position="left"
                :numTicks="4"
                :domain2="[0, n => n]"
                :axisStyles="{
                    stroke: '#b88'
                }"
            />
            <WYAxis2
                id="performance"
                position="right"
                :numTicks="4"
                :domain2="[0]"
                :tickFormatter2="xTickFormatter"
                :axisStyles="{
                    stroke: '#88b'
                }"
            />
        </WCartesian2>
<!--
        <WCartesian2
            :dataset="dataseries2"
            responsive
            :padding="chartPadding"
        >
            <WLine2
                series="seat"
                xDatakey="lap"
                yDatakey="time"
                color="#f55"
            />
            <WLine2
                series="chevrolet"
                xDatakey="num"
                yDatakey="totalTime"
                color="#55f"
            />
			<WPoint x="Lap 3" :y="35" :z="5" />
            <WXAxis2 type="categorical" position="bottom" />
            <WYAxis2
                position="left"
                :numTicks="4"
                :domain2="[0, n => n]"
            />
            <WZAxis2
				type="numeric"
				series="chevrolet"
				datakey="z"
				scaleFn="circleArea"
				:range="[0, 50]"
			/>
        </WCartesian2> -->
    </div>
</template>

<script>
export default {
    name: 'Tests',
    data () {
        return {
            chartPadding: [20, 30, 40, 50],

            dataset: [
                { lap: 'Lap 1', seatTime: 37, chevroletTime: 32 },
                { lap: 'Lap 2', seatTime: 38, chevroletTime: 33 },
                { lap: 'Lap 3', seatTime: 36, chevroletTime: 31 },
                { lap: 'Lap 4', seatTime: 39, chevroletTime: 32 },
                { lap: 'Lap 5', seatTime: 37, chevroletTime: 33 },
            ],
            dataset2: [
                { lap: 'Lap 1', time: 37, tiresPerformance: 90 },
                { lap: 'Lap 2', time: 38, tiresPerformance: 85 },
                { lap: 'Lap 3', time: 36, tiresPerformance: 83 },
                { lap: 'Lap 4', time: 38, tiresPerformance: 79 },
                { lap: 'Lap 5', time: 39, tiresPerformance: 72 },
            ],
            dataseries1: {
                seat: [
                    { lap: 'Lap 1', time: 37 },
                    { lap: 'Lap 2', time: 38 },
                    { lap: 'Lap 3', time: 36 },
                    { lap: 'Lap 4', time: 39 },
                    { lap: 'Lap 5', time: 37 },
                ],
                chevrolet: [
                    { lap: 'Lap 1', time: 32 },
                    { lap: 'Lap 2', time: 33 },
                    { lap: 'Lap 3', time: 31 },
                    { lap: 'Lap 4', time: 32 },
                    { lap: 'Lap 5', time: 33 },
                ],
            },
            dataseries2: {
                seat: [
                    { lap: 'Lap 1', time: 37 },
                    { lap: 'Lap 2', time: 38 },
                    { lap: 'Lap 3', time: 36 },
                    { lap: 'Lap 4', time: 39 },
                ],
                chevrolet: [
                    { num: 'Lap 2', totalTime: 33, z: 0 },
                    { num: 'Lap 3', totalTime: 31, z: 5 },
                    { num: 'Lap 4', totalTime: 32, z: 8 },
                    { num: 'Lap 5', totalTime: 33, z: 10 },
                ],
            },
        }
    },
    created () {
        // setTimeout(() => {
        //     this.chartPadding = 0
		// }, 2000)
		setTimeout(() => {
			this.refreshDataset()
		}, 5000)
		setTimeout(() => {
			this.refreshDataset()
		}, 10000)
    },
    methods: {
        xTickFormatter (value, index) {
            return index % 2 === 0 ? value : null
        },
		refreshDataset () {
			const r = (mean, delta = 2) => mean - delta + Math.round(Math.random() * 2 * delta)
			this.dataset2 = [
                { lap: 'Lap 1', time: r(37), tiresPerformance: r(90) },
                { lap: 'Lap 2', time: r(38), tiresPerformance: r(85) },
                { lap: 'Lap 3', time: r(36), tiresPerformance: r(83) },
                { lap: 'Lap 4', time: r(38), tiresPerformance: r(79) },
                { lap: 'Lap 5', time: r(39), tiresPerformance: r(72) },
            ]
		},
    },
}
</script>
