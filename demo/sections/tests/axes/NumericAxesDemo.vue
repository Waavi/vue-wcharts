<template>
    <div style="margin-bottom: 50px">
        <h2>Numeric Axes</h2>
        <h3>type: "numeric"</h3>
        <section>
            <NumericAxisDemo />
        </section>
        <section>
            <p>numTicks: 3</p>
            <NumericAxisDemo :numTicks="3" />
        </section>
        <section>
            <p>numTicks: 4</p>
            <NumericAxisDemo :numTicks="4" />
        </section>
        <section>
            <p>bounds: [0, 100]</p>
            <NumericAxisDemo
                :bounds="[0, 100]"
            />
        </section>
        <section>
            <p>domain: [0, 104]</p>
            <NumericAxisDemo
                :domain="[0, 104]"
            />
        </section>
        <section>
            <p>domain: [0, n => n + 20]</p>
            <NumericAxisDemo
                :domain="[0, n => n + 20]"
            />
        </section>
    </div>
</template>

<script>
import NumericAxisDemo from './NumericAxisDemo.vue'

export default {
    name: 'NumericAxesDemo',
    components: {
        NumericAxisDemo,
    },
}
</script>
