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
                :bandPadding="{ start: 0, inner: 0.3, end: 0 }"
            />
            <WYAxis
                id="fruits"
                position="left"
                :numTicks="4"
                :domain="[0]"
            />

            <AxisGroup
                :bandPadding="{ inner: 0.25 }"
            >
                <WBar
                    yDatakey="apples"
                    label="apples"
                    color="red"
                />

                <Stack>
                    <StackedBar
                        datakey="bananas"
                        label="bananas"
                        color="yellow"
                    />
                    <StackedBar
                        datakey="platanos"
                        label="platanos"
                        color="orange"
                    />
                </Stack>

                <WBar
                    yDatakey="pears"
                    label="pears"
                    color="green"
                />

                <Stack>
                    <StackedBar
                        datakey="cherries"
                        label="cherries"
                        color="blue"
                    />
                    <StackedBar
                        :datakey="d => d.cherries / 2"
                        label="berries"
                        color="aquamarine"
                    />
                </Stack>
            </AxisGroup>
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
import AxisGroup from '../../../../src/components/AxisGroup/AxisGroup.vue'
import Stack from '../../../../src/components/Stack/Stack.vue'
import StackedBar from '../../../../src/components/Stack/StackedBar.vue'
import Legend from '../../../../src/components/Legend/Legend.vue'
import { randomFruitsDataset } from '../randomDataset'

export default {
    name: 'BarsTest',
    components: {
        AxisGroup,
        Stack,
        StackedBar,
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
