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

        <h3>padding (range padding)</h3>
        <section>
            <p>padding: (50 | [50, 50] | { start: 50, end: 50 })</p>
            <NumericAxisDemo :padding="50" />
        </section>
        <section>
            <p>padding: ([20, 100] | { start: 20, end: 100 })</p>
            <NumericAxisDemo :padding="[20, 100]" />
        </section>

        <h3>reversed</h3>
        <section>
            <p>reversed: true</p>
            <NumericAxisDemo reversed />
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
