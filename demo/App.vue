<template>
    <div class="Container">
        <WCartesian :dataset="jaime">
            <WLine
                dot
                :styles="{ stroke: '#000' }"
                datakey="one"
            />
            <WLine
                dot
                curve
                datakey="two"
            />
            <WLine
                dot
                datakey="three"
            />
        </WCartesian>
    </div>
</template>

<script>
import { WCartesian, WLine } from '../src'

export default {
    name: 'App',
    components: {
        WCartesian,
        WLine,
    },
    data () {
        return {
            values: [
                { name: 'Category 1', value: 3200 },
                { name: 'Category 2', value: 2600 },
                { name: 'Category 3', value: 4500 },
                { name: 'Category 4', value: 3040 },
                { name: 'Category 5', value: 6900 },
                { name: 'Category 6', value: 4910 },
                { name: 'Category 7', value: 2300 },
            ],
            jaime: [
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
            ],
        }
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
    background-color: #f9f9f9
}
</style>
