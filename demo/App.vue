<template>
    <div class="Container">
        <WCartesian
            :dataset="data"
            :bound="[0, n => n + 1000]"
        >
            <WLine
                dot
                :styles="{ stroke: 'red', strokeDasharray: '4' }"
                datakey="one"
            />
            <WLine
                dot
                curve
                datakey="two"
            />
            <WLine
                dot
                :curve="curveStep"
                datakey="three"
            />
            <WXAxis
                datakey="name"
                :space="[0, 50, 50, 50]"
            />
            <WYAxis :space="[50, 0, 0, 50]" />
        </WCartesian>
        <button @click="changeData">
            Change Data
        </button>
    </div>
</template>

<script>
import { curveStep } from 'd3-shape'
import {
    WCartesian, WLine, WXAxis, WYAxis,
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
        name: 'Page G', one: 6490, two: 6300, three: 6100,
    },
]

export default {
    name: 'App',
    components: {
        WCartesian,
        WLine,
        WXAxis,
        WYAxis,
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
    svg{
        border: 1px solid rgba(0,0,0,0.125);
        background: #FFF;
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
    width: 90%;
    max-width: 800px;
}
</style>
