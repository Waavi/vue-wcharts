<template>
    <WCartesian :dataset="values">
        <WLine datakey="value" />
    </WCartesian>
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
                { value: 3200 },
                { value: 2600 },
                { value: 4500 },
                { value: 3040 },
                { value: 6900 },
                { value: 4910 },
                { value: 2300 },
            ],
        }
    },
    mounted () {
        setTimeout(() => {
            this.values = [
                { value: 1200 },
                { value: 2600 },
                { value: 2500 },
                { value: 3040 },
                { value: 2900 },
                { value: 4910 },
                { value: 2300 },
            ]
        }, 3000)
    },
}
</script>
