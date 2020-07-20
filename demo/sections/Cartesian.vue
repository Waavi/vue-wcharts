<template>
    <div>
        <WChart
            :dataset="dataset"
            responsive
            :padding="chartPadding"
        >
            <WXAxis
                id="lap"
                type="categorical"
                datakey="lap"
                position="top"
            />
            <WXAxis
                id="lapNumerical"
                datakey="lapNumerical"
                position="bottom"
            />
            <WYAxis
                id="time"
                datakey="time"
                position="left"
                :numTicks="4"
                :domain2="[0, n => n]"
                :tickFormatter="yTickFormatter"
                :styles="{
                    line: {
                        stroke: '#b88'
                    },
                }"
            />
            <WYAxis
                id="performance"
                datakey="performance"
                position="right"
                :numTicks="4"
                :domain2="[0, n => n]"
                :tickFormatter="yTickFormatter"
                :styles="{
                    line: {
                        stroke: '#88b'
                    },
                }"
            />
            <Stack
                baseAxisId="lap"
                cumulativeAxisId="time"
            >
                <StackedLine
                    datakey="time"
                    color="red"
                />
                <StackedLine
                    :datakey="d => d.time / 2"
                    color="green"
                />
            </Stack>
            <AxisGroup
                axisId="lap"
            >
                <Stack
                    cumulativeAxisId="time"
                >
                    <LegendItem
                        label="redStack"
                        color="red"
                        #default="{ isActive }"
                    >
                        <StackedBar
                            :active="isActive"
                            datakey="time"
                            color="red"
                        />
                    </LegendItem>
                    <StackedBar
                        :datakey="d => d.time / 2"
                        color="green"
                    />
                </Stack>
                <WBar
                    xAxisId="lap"
                    yAxisId="time"
                    color="red"
                />
                <WBar
                    xAxisId="lap"
                    yAxisId="performance"
                    yDatakey="performance"
                    color="blue"
                />
                <LegendItem
                    label="red"
                    color="red"
                    #default="{ isActive }"
                >
                    <WLine
                        v-if="isActive"
                        key="redOne"
                        uniqueId="redOne"
                        keepColor
                        xAxisId="lap"
                        yAxisId="time"
                        color="red"
                    />
                </LegendItem>
            </AxisGroup>

            <WLine
                v-if="showElement"
                key="blueOne"
                uniqueId="blueOne"
                xAxisId="lapNumerical"
                yAxisId="performance"
                label="blue"
                color="blue"
            />
            <WLine
                key="greenOne"
                uniqueId="greenOne"
                xAxisId="lapNumerical"
                yAxisId="performance"
                :yDatakey="d => d.performance + 10"
                label="green"
                color="green"
            />
            <Scaled
                :valuesByAxes="{ lapNumerical: 4.25, performance: [25, 50] }"
                adjustAxes
                #default="scaled"
            >
                <g
                    v-for="(performance, index) in scaled.performance"
                    :key="index"
                >
                    <circle
                        :cx="scaled.lapNumerical"
                        :cy="performance"
                        r="5"
                        stroke="green"
                        stroke-width="3"
                        fill="none"
                    />
                    <circle
                        :cx="scaled.lapNumerical"
                        :cy="performance"
                        r="8"
                        stroke="red"
                        stroke-width="3"
                        fill="none"
                    />
                </g>
            </Scaled>
            <!-- <Scaled
                :dataset="[
                    {
                        lap: 'LAP 1', time: 35,
                    },
                    {
                        lap: 'LAP 2', time: 49,
                    },
                ]"
                :datakeyByAxes="{ lap: 'lap', time: 'time' }"
                adjustAxes
                #default="scaled"
            >
            </Scaled> -->
            <Legend />
        </WChart>

        <div>
            <button
                class="Btn"
                @click="change"
            >
                Change
            </button>
        </div>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import Legend from '../../src/components/Legend/Legend.vue'
import LegendItem from '../../src/components/Legend/LegendItem.vue'
import AxisGroup from '../../src/components/AxisGroup/AxisGroup.vue'
import Stack from '../../src/components/Stack/Stack.vue'
import StackedBar from '../../src/components/Stack/StackedBar.vue'
import StackedLine from '../../src/components/Stack/StackedLine.vue'

export default {
    name: 'Cartesian',
    components: {
        Legend,
        LegendItem,
        AxisGroup,
        Stack,
        StackedBar,
        StackedLine,
    },
    props: {
        data: VueTypes.any,
    },
    data () {
        return {
            dataset: this.randomDataset(),
            xAxisPosition: 'bottom',
            yAxisPosition: 'left',
            yDatakey: 'time',
            chartPadding: [20, 30, 40, 50],
            showElement: true,
        }
    },
    methods: {
        change () {
            this.dataset = this.randomDataset()
            this.xAxisPosition = this.xAxisPosition === 'top' ? 'bottom' : 'top'
            this.yAxisPosition = this.yAxisPosition === 'left' ? 'right' : 'left'
            this.showElement = !this.showElement
        },
        yTickFormatter (value) {
            if (typeof value === 'number') {
                return value.toFixed(2)
            }
            return value
        },
        randomDataset () {
            const nearTo = (x, delta) => Math.round(x - delta + 2 * delta * Math.random())
            return [
                {
                    lap: 'LAP 1', time: nearTo(37, 3), performance: nearTo(90, 5), lapNumerical: 1,
                },
                {
                    lap: 'LAP 2', time: nearTo(38, 3), performance: nearTo(87, 5), lapNumerical: 2.5,
                },
                {
                    lap: 'LAP 3', time: nearTo(36, 3), performance: nearTo(86, 5), lapNumerical: 3,
                },
                {
                    lap: 'LAP 4', time: nearTo(39, 3), performance: nearTo(80, 5), lapNumerical: 4.5,
                },
                {
                    lap: 'LAP 5', time: nearTo(37, 3), performance: nearTo(72, 5), lapNumerical: 5,
                },
            ]
        },
    },
}
</script>
