<template>
    <div>
        <WCartesian2
            :dataset="dataset"
            responsive
            :padding="chartPadding"
        >
            <WLine2
                datakeyY="seatTime"
            />
            <!-- <WLine
                series="chevrolet"
                datakeyY="speed"
                datakeyX="timestamp"
            /> -->
            <WXAxis2 datakey="lap" />
            <WYAxis2 />
        </WCartesian2>
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
                    { lap: 'Lap 5', time: 37 },
                ],
                chevrolet: [
                    { num: 'Lap 1', totalTime: 32 },
                    { num: 'Lap 2', totalTime: 33 },
                    { num: 'Lap 3', totalTime: 31 },
                    { num: 'Lap 4', totalTime: 32 },
                    { num: 'Lap 5', totalTime: 33 },
                ],
            },
        }
    },
    created () {
        // setTimeout(() => {
        //     this.chartPadding = 0
        // }, 2000)
    }
}
</script>