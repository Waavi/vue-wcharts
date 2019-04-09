<template>
    <WCartesian :dataset="values">
        <WLine dataKey="value" />
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
                { value: 1600 },
                { value: 1500 },
                { value: 3040 },
                { value: 1900 },
                { value: 4910 },
                { value: 1300 },
            ]
        }, 8000)
    },
}
</script>
