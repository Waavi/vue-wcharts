<template>
    <div>
        <WChart
            :dataset="dataset"
            responsive
            :padding="30"
        >
            <WRadiusAxis
                id="fruits"
                :domain="[0]"
            />
            <WAngleAxis
                id="month"
                type="categorical"
                bandPadding="point:start"
                datakey="month"
            />
            <PolarLine
                radiusDatakey="apples"
                label="apples"
                color="red"
            />
        </WChart>

        <div>
            <button
                class="Btn"
                @click="change"
            >
                Change dataset
            </button>
        </div>
    </div>
</template>

<script>
import WRadiusAxis from '../../../../src/components/Axis/WRadiusAxis/WRadiusAxis.vue'
import WAngleAxis from '../../../../src/components/Axis/WAngleAxis/WAngleAxis.vue'
import PolarLine from '../../../../src/components/Line/PolarLine.vue'
// import { randomFruitsDataset } from '../randomDataset'

export default {
    name: 'PolarTest',
    components: {
        WRadiusAxis,
        WAngleAxis,
        PolarLine,
    },
    data () {
        return {
            // dataset: randomFruitsDataset(),
            dataset: [
                {
                    month: 'Jan', apples: 4000, bananas: 1020, platanos: 900, pears: 2780, cherries: 960,
                },
                {
                    month: 'Feb', apples: 3000, bananas: 840, platanos: 600, pears: 1450, cherries: 960,
                },
                {
                    month: 'Mar', apples: 2000, bananas: 600, platanos: 360, pears: 540, cherries: 640,
                },
                {
                    month: 'Apr', apples: 1000, bananas: 300, platanos: 180, pears: 380, cherries: 640,
                },
            ],
        }
    },
    methods: {
        change () {
            // this.dataset = randomFruitsDataset()
        },
    },
}
</script>
