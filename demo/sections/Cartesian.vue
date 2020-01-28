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
                position="top"
            />
            <WXAxis
                id="lapNumerical"
                position="bottom"
            />
            <WYAxis
                id="time"
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
            <LegendItem
                label="red"
                #default="{ isActive }"
            >
                <WLine
                    v-if="isActive"
                    xAxisId="lap"
                    xDatakey="lap"
                    yAxisId="time"
                    yDatakey="time"
                    :styles="{
                        line: {
                            stroke: 'red'
                        },
                    }"
                />
            </LegendItem>
            <WLine
                v-if="showElement"
                xAxisId="lapNumerical"
                xDatakey="lapNumerical"
                yAxisId="performance"
                yDatakey="performance"
                label="blue"
                :styles="{
                    line: {
                        stroke: 'blue'
                    },
                }"
            />
            <Scaled
                :valuesByAxes="{ lapNumerical: 6.5, performance: [-25, 25] }"
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

export default {
    name: 'Cartesian',
    components: {
        Legend,
        LegendItem,
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
