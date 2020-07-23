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
            />
            <WYAxis
                id="fruits"
                position="left"
                :numTicks="4"
            />

            <Animation
                :animDuration="1000"
                appearFromReferenceAlongAxis="fruits"
            >
                <Stack curve>
                    <StackedLine
                        datakey="apples"
                        label="apples"
                        color="red"
                    />
                    <StackedLine
                        datakey="bananas"
                        label="bananas"
                        color="yellow"
                    />
                    <StackedLine
                        datakey="pears"
                        label="pears"
                        color="green"
                    />
                    <StackedLine
                        datakey="cherries"
                        label="cherries"
                        color="blue"
                    />
                </Stack>
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
import Stack from '../../../../src/components/Stack/Stack.vue'
import StackedLine from '../../../../src/components/Stack/StackedLine.vue'
import Legend from '../../../../src/components/Legend/Legend.vue'
import { randomFruitsDataset } from '../randomDataset'
import { Animation } from '../../../../src/transitions'

export default {
    name: 'StackedLinesTest',
    components: {
        Stack,
        StackedLine,
        Legend,
        Animation,
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
