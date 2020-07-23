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

        <h3>padding (range padding)</h3>
        <section>
            <p>padding: (50 | [50, 50] | { start: 50, end: 50 })</p>
            <NumericAxisDemo
                :d3Scale="scaleLog()"
                :nums="[134, 830932]"
                :tickFormatter="tickFormatter"
                :padding="50"
            />
        </section>
        <section>
            <p>padding: ([20, 100] | { start: 20, end: 100 })</p>
            <NumericAxisDemo
                :d3Scale="scaleLog()"
                :nums="[134, 830932]"
                :tickFormatter="tickFormatter"
                :padding="[20, 100]"
            />
        </section>

        <h3>reversed</h3>
        <section>
            <p>reversed: true</p>
            <NumericAxisDemo
                :d3Scale="scaleLog()"
                :nums="[134, 830932]"
                :tickFormatter="tickFormatter"
                reversed
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
