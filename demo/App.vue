<template>
    <div class="Container">
        <WCartesian :dataset="jaime">
            <WLine datakey="one" />
            <WLine datakey="two" />
            <WXAxis
                datakey="name"
                :space="[0, 50, 50, 50]"
            />
            <WYAxis :space="[50, 0, 0, 50]" />
        </WCartesian>
    </div>
</template>

<script>
import {
    WCartesian, WLine, WXAxis, WYAxis,
} from '../src'

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
                { name: 'Category 1', one: 3200, two: 1200 },
                { name: 'Category 2', one: 2600, two: 1600 },
                { name: 'Category 3', one: 4500, two: 1500 },
                { name: 'Category 4', one: 3040, two: 1040 },
                { name: 'Category 5', one: 6900, two: 1900 },
                { name: 'Category 6', one: 4910, two: 1910 },
                { name: 'Category 7', one: 2300, two: 1300 },
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
