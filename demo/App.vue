<template>
    <div class="Container">
        <div class="Wrapper">
            <WCartesian
                :dataset="data"
                responsive
            >
                <WLine
                    dot
                    curve
                    datakey="one"
                    legend="One Line"
                />
                <WCartesianGrid
                    :numLinesH="0"
                    :numLinesV="0"
                    :hideH="false"
                    :hideV="false"
                />
                <WXAxis
                    datakey="name"
                    :space="[0, 50, 50, 50]"
                >
                    <template #label="label">
                        <svg
                            width="100%"
                            height="100%"
                        >
                            <text
                                :x="label.x"
                                :y="label.y"
                                :text-anchor="label.textAnchor"
                                :transform="label.transform"
                                :font-size="label.fontSize"
                                fill="#999"
                            >
                                Categories
                            </text>
                        </svg>
                    </template>
                </WXAxis>
                <WYAxis
                    labelText="Value"
                />
                <WLegend
                    selectable
                    position="bottom"
                />
            </WCartesian>
            <button
                class="Btn"
                @click="changeData"
            >
                Change Data
            </button>
        </div>
    </div>
</template>

<script>
import { curveStep } from 'd3-shape'
import {
    WCartesian, WLine, WXAxis, WYAxis, WLegend, WCartesianGrid,
} from '../src'

const dataOne = [
    {
        name: 'Page A', one: 4000, two: 2400, three: 2400,
    },
    {
        name: 'Page B', one: 3000, two: 1398, three: 2210,
    },
    {
        name: 'Page C', one: 2000, two: 9800, three: 2290,
    },
    {
        name: 'Page D', one: 2780, two: 3908, three: 2000,
    },
    {
        name: 'Page E', one: 1890, two: 4800, three: 1700,
    },
    {
        name: 'Page F', one: 2390, two: 3800, three: 2500,
    },
    {
        name: 'Page G', one: 3490, two: 4300, three: 2100,
    },
]

const dataTwo = [
    {
        name: 'Page A', one: 3000, two: 1400, three: 400,
    },
    {
        name: 'Page B', one: 2000, two: 2398, three: 1210,
    },
    {
        name: 'Page C', one: 2500, two: 8800, three: 1290,
    },
    {
        name: 'Page D', one: 1780, two: 1908, three: 2000,
    },
    {
        name: 'Page E', one: 4890, two: 8800, three: 5700,
    },
    {
        name: 'Page F', one: 5390, two: 6800, three: 7500,
    },
    {
        name: 'Page G', one: 8490, two: 6300, three: 6100,
    },
]

export default {
    name: 'App',
    components: {
        WCartesian,
        WLine,
        WXAxis,
        WYAxis,
        WLegend,
        WCartesianGrid,
    },
    data () {
        return {
            data: dataOne,
            curveStep,
        }
    },
    methods: {
        changeData () {
            this.data = this.data === dataOne ? dataTwo : dataOne
        },
    },
}
</script>
<style lang="scss">
    body {
        display: flex;
        padding: 0;
        margin: 0;
        min-width: 100vw;
        min-height: 100vh;
        font-family: sans-serif;
    }
</style>
<style lang="scss" scoped>
.Container {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #f9f9f9
}
.Wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 800px;
}
.WCartesian {
    border: 1px solid rgba(0,0,0,0.125);
    background: #FFF;
    // padding: 0 0 2rem 0;
}
.Btn {
    margin-top: 1rem;
    padding: .75rem 1.5rem;
    background: #626c91;
    border-radius: 6px;
    color: #FFF;
    font-size: 16px;
    outline: none;
}
</style>
