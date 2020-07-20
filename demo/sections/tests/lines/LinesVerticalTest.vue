<template>
    <div>
        <WChart
            :dataset="dataset"
            responsive
            :padding="30"
        >
            <WXAxis
                id="fruits"
                position="top"
                reversed
                :numTicks="4"
                :domain="[0]"
            />
            <WYAxis
                id="month"
                type="categorical"
                bandPadding="point"
                datakey="month"
                position="right"
            />

            <WLine
                xDatakey="apples"
                label="apples"
                color="red"
            />
            <WLine
                xDatakey="bananas"
                label="bananas"
                color="yellow"
            />
            <WLine
                xDatakey="pears"
                label="pears"
                color="green"
            />
            <WLine
                xDatakey="cherries"
                label="cherries"
                color="blue"
            />
            <Legend />
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
import Legend from '../../../../src/components/Legend/Legend.vue'
import { randomFruitsDataset } from '../randomDataset'

export default {
    name: 'LinesVerticalTest',
    components: {
        Legend,
    },
    data () {
        return {
            dataset: randomFruitsDataset(),
        }
    },
    methods: {
        change () {
            this.dataset = randomFruitsDataset()
        },
    },
}
</script>
