<template>
    <div class="Container">
        <WCartesian :dataset="values">
            <WLine datakey="value" />
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
