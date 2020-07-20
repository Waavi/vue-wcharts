<template>
    <div style="margin-bottom: 50px">
        <h2>Custom Axes</h2>
        <h3>Logaritmic scale</h3>
        <section>
            <NumericAxisDemo
                :d3Scale="scaleLog()"
                :nums="[134, 830932]"
                :tickFormatter="tickFormatter"
            />
        </section>
    </div>
</template>

<script>
import { scaleLog, scalePow } from 'd3-scale'
import NumericAxisDemo from './NumericAxisDemo.vue'

export default {
    name: 'CustomAxesDemo',
    components: {
        NumericAxisDemo,
    },
    methods: {
        scaleLog,
        scalePow,
        tickFormatter (value) {
            return String(value)[0] === '1' ? value : undefined
        },
    },
}
</script>
