<template>
    <div class="Container">
        <div class="Wrapper">
            <div class="Tabs">
                <button
                    class="Btn"
                    @click="activeComponent = 'Cartesian'"
                >
                    Cartesian
                </button>
                <button
                    class="Btn"
                    @click="activeComponent = 'Pie'"
                >
                    Pie
                </button>
                <button
                    class="Btn"
                    @click="activeComponent = 'Scatter'"
                >
                    Scatter
                </button>
            </div>
            <h2>{{ activeComponent }}</h2>
            <component
                :is="activeComponent"
                class="Chart"
                :data="data"
            />
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
import { Cartesian, Pie, Scatter } from './sections'

const dataOne = [
    {
        name: 'Page A', one: 4000, two: -2400, three: 2300, four: 1200, five: 2300,
    },
    {
        name: 'Page B', one: 3000, two: 2210, three: 1398, four: 1200, five: 1398,
    },
    {
        name: 'Page C', one: 9800, two: 2200, three: 0, four: 1200, five: 0,
    },
    {
        name: 'Page D', one: 2780, two: 3908, three: 2000, four: 1200, five: 2000,
    },
    {
        name: 'Page E', one: 1890, two: 4800, three: 1700, four: 1200, five: 1700,
    },
    {
        name: 'Page F', one: -2390, two: 3800, three: -2500, four: 1200, five: 2500,
    },
    {
        name: 'Page G', one: 3490, two: 4300, three: 2100, four: 1200, five: 2100,
    },
]

const dataTwo = [
    {
        name: 'Page A', one: 3000, two: 1400, three: 400, four: 1200, five: 2300,
    },
    {
        name: 'Page B', one: 2000, two: 2398, three: 1210, four: 1200, five: 1398,
    },
    {
        name: 'Page C', one: 2500, two: 8800, three: 1290, four: 1200, five: 0,
    },
    {
        name: 'Page D', one: 1780, two: 1908, three: 2000, four: 1200, five: 2000,
    },
    {
        name: 'Page E', one: 4890, two: 8800, three: 5700, four: 1200, five: 1700,
    },
    {
        name: 'Page F', one: 5390, two: 6800, three: 7500, four: 1200, five: 2500,
    },
    {
        name: 'Page G', one: 8490, two: 6300, three: 6100, four: 1200, five: 2100,
    },
]

export default {
    name: 'App',
    components: {
        Cartesian,
        Pie,
        Scatter,
    },
    data () {
        return {
            data: dataTwo,
            activeComponent: 'Cartesian',
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
.Tabs {
    margin-bottom: 50px;
    > * {
        margin: 0 15px;
    }
}
.Chart {
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
    cursor: pointer;
}
</style>
