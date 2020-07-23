<template>
    <div style="margin-bottom: 50px">
        <h2>Temporal Axes</h2>
        <h3>type: "temporal"</h3>
        <section>
            <TemporalAxisDemo />
        </section>
        <section>
            <p>numTicks: 3</p>
            <TemporalAxisDemo :numTicks="3" />
        </section>
        <section>
            <p>numTicks: 4</p>
            <TemporalAxisDemo :numTicks="4" />
        </section>
        <section>
            <p>domain: [new Date(2019, 11, 28)]</p>
            <TemporalAxisDemo
                :numTicks="4"
                :domain="[new Date(2019, 11, 28)]"
            />
        </section>
        <section>
            <p>bounds: [, d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 3)]</p>
            <TemporalAxisDemo
                :numTicks="4"
                :bounds="[, d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 3)]"
            />
        </section>

        <h3>padding (range padding)</h3>
        <section>
            <p>padding: (50 | [50, 50] | { start: 50, end: 50 })</p>
            <TemporalAxisDemo
                :numTicks="4"
                :padding="50"
            />
        </section>
        <section>
            <p>padding: ([20, 100] | { start: 20, end: 100 })</p>
            <TemporalAxisDemo
                :numTicks="4"
                :padding="[20, 100]"
            />
        </section>

        <h3>reversed</h3>
        <section>
            <p>reversed: true</p>
            <TemporalAxisDemo
                :numTicks="4"
                reversed
            />
        </section>
    </div>
</template>

<script>
import TemporalAxisDemo from './TemporalAxisDemo.vue'

export default {
    name: 'TemporalAxesDemo',
    components: {
        TemporalAxisDemo,
    },
}
</script>
