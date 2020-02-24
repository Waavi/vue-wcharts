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
            />

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

export default {
    name: 'StackedLinesTest',
    components: {
        Stack,
        StackedLine,
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
