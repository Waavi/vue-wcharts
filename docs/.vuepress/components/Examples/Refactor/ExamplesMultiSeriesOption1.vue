<template>
    <div>
        <WCartesian2 :dataset="dataset">
            <WLine
                datakeyY="seatTime"
            />
            <WLine
                datakeyY="chevroletTime"
            />
            <WXAxis2 type="categorical" datakey="lap" />
            <WYAxis2 />
        </WCartesian2>

        <WCartesian2 :dataset="dataseries1">
            <WLine
                series="seat"
                datakeyY="lap"
            />
            <WLine
                series="chevrolet"
                datakeyY="lap"
            />
            <WXAxis2 type="categorical" datakey="time" />
            <WYAxis2 />
        </WCartesian2>

        <WCartesian2 :dataset="dataseries2">
            <WLine
                series="seat"
                datakeyY="time"
                datakeyX="lap"
            />
            <WLine
                series="chevrolet"
                datakeyY="totalTime"
                datakeyX="num"
            />
            <WXAxis2 type="categorical" />
            <WYAxis2 />
        </WCartesian2>
    </div>
</template>

<script>
export default {
    name: 'ExamplesMultiSeriesOption1',
    data () {
        return {
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
    }
}
</script>