<template>
    <div>
        <WCartesian :dataset="dataset">
            <WLine
                yAxisId="time"
                datakeyY="time"
            />
            <WLine
                yAxisId="performance"
                datakeyY="tiresPerformance"
            />
            <WXAxis type="categorical" datakey="lap" />
            <WYAxis id="time" />
            <WYAxis id="performance" />
        </WCartesian>
    </div>
</template>

<script>
export default {
    name: 'ExamplesMultiAxial',
    data () {
        return {
            dataset: [
                { lap: 'Lap 1', time: 37, tiresPerformance: 90 },
                { lap: 'Lap 2', time: 38, tiresPerformance: 85 },
                { lap: 'Lap 3', time: 36, tiresPerformance: 83 },
                { lap: 'Lap 4', time: 38, tiresPerformance: 79 },
                { lap: 'Lap 5', time: 39, tiresPerformance: 72 },
            ],
        }
    }
}
</script>
