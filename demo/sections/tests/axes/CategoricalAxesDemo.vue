<template>
    <div style="margin-bottom: 50px">
        <h2>Categorical Axes (use of bandPadding)</h2>
        <h3>type: "categorical" (Band)</h3>
        <section>
            <p>bandPadding: (undefined | "band" | [0, 0.2, 0] | { start: 0, inner: 0.2, end: 0 })</p>
            <CategoricalAxisDemo
                type="band"
            />
        </section>
        <section>
            <p>bandPadding: ("band:start" | [0, 0.2, 1] | { start: 0, inner: 0.2, end: 1 })</p>
            <CategoricalAxisDemo
                type="band"
                bandPadding="band:start"
            />
        </section>
        <section>
            <p>bandPadding: ("band:0.25" | [0.25, 0.2, 0.75] | { start: 0.25, inner: 0.2, end: 0.75 })</p>
            <CategoricalAxisDemo
                type="band"
                bandPadding="band:0.25"
            />
        </section>
        <section>
            <p>bandPadding: ("band:center" | [0.5, 0.2, 0.5] | { start: 0.5, inner: 0.2, end: 0.5 })</p>
            <CategoricalAxisDemo
                type="band"
                bandPadding="band:center"
            />
        </section>
        <section>
            <p>bandPadding: ("band:0.75" | [0.75, 0.2, 0.25] | { start: 0.75, inner: 0.2, end: 0.25 })</p>
            <CategoricalAxisDemo
                type="band"
                bandPadding="band:0.75"
            />
        </section>
        <section>
            <p>bandPadding: ("band:end" | [1, 0.2, 0] | { start: 1, inner: 0.2, end: 0 })</p>
            <CategoricalAxisDemo
                type="band"
                bandPadding="band:end"
            />
        </section>
        <section>
            <p>bandPadding: ("0" | 0 | [0, 0, 0] | { start: 0, inner: 0, end: 0 })</p>
            <CategoricalAxisDemo
                type="band"
                bandPadding="0"
            />
        </section>
        <section>
            <p>bandPadding: ("0.5" | [0, 0.5, 0] | { start: 0, inner: 0.5, end: 0 })</p>
            <CategoricalAxisDemo
                type="band"
                bandPadding="0.5"
            />
        </section>
        <section>
            <p>bandPadding: ("0.8" | [0, 0.8, 0] | { start: 0, inner: 0.8, end: 0 })</p>
            <CategoricalAxisDemo
                type="band"
                bandPadding="0.8"
            />
        </section>
        <section>
            <p>bandPadding: ("point" | [0, 1, 0] | { start: 0, inner: 1, end: 0 })</p>
            <CategoricalAxisDemo
                type="band"
                bandPadding="point"
            />
        </section>

        <h3>type: "categorical" (Point)</h3>
        <section>
            <p>bandPadding: ("point" | [0, 1, 0] | { start: 0, inner: 1, end: 0 })</p>
            <CategoricalAxisDemo
                type="point"
                bandPadding="point"
            />
        </section>
        <section>
            <p>bandPadding: (1 | [1, 1, 1] | { start: 1, inner: 1, end: 1 })</p>
            <CategoricalAxisDemo
                type="point"
                :bandPadding="1"
            />
        </section>
        <section>
            <p>bandPadding: ("point:start" | [0, 1, 1] | { start: 0, inner: 1, end: 1 })</p>
            <CategoricalAxisDemo
                type="point"
                bandPadding="point:start"
            />
        </section>
        <section>
            <p>bandPadding: ("point:0.25" | [0.25, 1, 0.75] | { start: 0.25, inner: 1, end: 0.75 })</p>
            <CategoricalAxisDemo
                type="point"
                bandPadding="point:0.25"
            />
        </section>
        <section>
            <p>bandPadding: ("point:center" | [0.5, 1, 0.5] | { start: 0.5, inner: 1, end: 0.5 })</p>
            <CategoricalAxisDemo
                type="point"
                bandPadding="point:center"
            />
        </section>
        <section>
            <p>bandPadding: ("point:0.75" | [0.75, 1, 0.25] | { start: 0.75, inner: 1, end: 0.25 })</p>
            <CategoricalAxisDemo
                type="point"
                bandPadding="point:0.75"
            />
        </section>
        <section>
            <p>bandPadding: ("point:end" | [1, 1, 0] | { start: 1, inner: 1, end: 0 })</p>
            <CategoricalAxisDemo
                type="point"
                bandPadding="point:end"
            />
        </section>
    </div>
</template>

<script>
import CategoricalAxisDemo from './CategoricalAxisDemo.vue'

export default {
    name: 'CategoricalAxesDemo',
    components: {
        CategoricalAxisDemo,
    },
}
</script>
