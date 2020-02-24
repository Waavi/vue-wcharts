<template>
    <div>
        <WChart
            :dataset="dataset"
            responsive
            :padding="30"
        >
            <WXAxis
                id="month"
                type="categorical"
                datakey="month"
                position="bottom"
                :categoricalPadding="0"
            />
            <WYAxis
                id="fruits"
                position="left"
                :numTicks="4"
                :domain="[0]"
            />

            <WLine
                yDatakey="apples"
                label="apples"
                color="red"
            />
            <WLine
                yDatakey="bananas"
                label="bananas"
                color="yellow"
            />
            <WLine
                yDatakey="pears"
                label="pears"
                color="green"
            />
            <WLine
                yDatakey="cherries"
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
    name: 'LinesTest',
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
