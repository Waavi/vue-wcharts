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
        <!-- <section>
            <p>domain: [0, 104]</p>
            <TemporalAxisDemo
            :numTicks="4"
                :domain="[0, 104]"
            />
        </section>
        <section>
            <p>domain: [0, n => n + 20]</p>
            <TemporalAxisDemo
            :numTicks="4"
                :domain="[0, n => n + 20]"
            />
        </section> -->
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
