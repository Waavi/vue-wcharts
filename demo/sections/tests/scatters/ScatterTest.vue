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
                bandPadding="point"
                datakey="month"
                position="bottom"
                :numTicks="4"
            />
            <WYAxis
                id="fruits"
                position="left"
                :numTicks="4"
                :domain="[0]"
            />
            <WZAxis />

            <Animation
                :animDuration="1000"
                appearFromReferenceAlongAxis="fruits"
            >
                <WScatter
                    yDatakey="apples"
                    zDatakey="apples"
                    label="apples"
                    color="red"
                />
                <WScatter
                    yDatakey="bananas"
                    zDatakey="bananas"
                    label="bananas"
                    color="yellow"
                />
                <WScatter
                    yDatakey="pears"
                    zDatakey="pears"
                    label="pears"
                    color="green"
                />
                <WScatter
                    yDatakey="cherries"
                    zDatakey="cherries"
                    label="cherries"
                    color="blue"
                />
            </Animation>
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
import { Animation } from '../../../../src/transitions'

export default {
    name: 'ScatterTest',
    components: {
        Animation,
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
