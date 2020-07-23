<template>
    <g
        v-if="sectors.length > 0"
        :transform="`translate(${center.x},${center.y})`"
    >
        <PieSector
            v-for="(sector, index) in sectors"
            :key="index"
            :arcGenerator="arcGenerator"
            :animDuration="animDuration"
            v-bind="sector"
            #default="scopedProps"
        >
            <slot
                name="sector"
                v-bind="scopedProps"
            />
        </PieSector>

        <slot />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import { getDatums, datakeyAccessor } from '../../utils/dataset'
import { arcGeneratorFactory, pieGeneratorFactory } from '../basicsElements/d3Utils'
import PieSector from './PieSector.vue'

export default {
    name: 'WPie',
    type: 'drawable',
    inject: ['Chart'],
    components: {
        PieSector,
    },
    props: {
        datakey: VueTypes.string.isRequired,
        series: VueTypes.string.optional,
        cx: VueTypes.oneOfType([VueTypes.number, VueTypes.string]).optional,
        cy: VueTypes.oneOfType([VueTypes.number, VueTypes.string]).optional,
        startAngle: VueTypes.number.def(0),
        endAngle: VueTypes.number.def(360),
        outerRadius: VueTypes.oneOfType([VueTypes.number, VueTypes.string]).optional,
        innerRadius: VueTypes.oneOfType([VueTypes.number, VueTypes.string]).optional,
        padAngle: VueTypes.number.def(0),
        padRadius: VueTypes.number.def(0),
        cornerRadius: VueTypes.number.def(0),
        sort: VueTypes.func.optional,
        animDuration: VueTypes.number.optional,
    },
    data () {
        return {
            hasBeenMounted: false,
        }
    },
    computed: {
        center () {
            const { Chart, cx, cy } = this
            const { canvas } = Chart
            return {
                x: canvas.left + this.normalizeNumberOrPercent(cx, canvas.width, canvas.width / 2),
                y: canvas.top + this.normalizeNumberOrPercent(cy, canvas.height, canvas.height / 2),
            }
        },
        maxRadius () {
            const { canvas } = this.Chart
            return Math.min(canvas.width, canvas.height) / 2
        },
        normalizedOuterRadius () {
            const { maxRadius } = this
            return this.normalizeNumberOrPercent(this.outerRadius, maxRadius, maxRadius)
        },
        normalizedInnerRadius () {
            const { maxRadius } = this
            return this.normalizeNumberOrPercent(this.innerRadius, maxRadius, 0)
        },
        arcGenerator () {
            return arcGeneratorFactory({
                innerRadius: this.normalizedInnerRadius,
                outerRadius: this.normalizedOuterRadius,
                padRadius: this.padRadius,
                cornerRadius: this.cornerRadius,
            })
        },
        pieGenerator () {
            const {
                datakey, startAngle, endAngle, padAngle, sort, hasBeenMounted,
            } = this
            return pieGeneratorFactory({
                startAngle: startAngle * Math.PI / 180,
                endAngle: endAngle * Math.PI / 180,
                padAngle: (hasBeenMounted ? padAngle : 0) * Math.PI / 180,
                sort,
                value: hasBeenMounted ? datakeyAccessor(datakey) : () => 0,
            })
        },
        datums () {
            const { Chart, series } = this
            return getDatums({ dataset: Chart.dataset, series })
        },
        sectors () {
            const { datums, pieGenerator } = this
            return pieGenerator(datums)
        },
    },
    mounted () {
        this.hasBeenMounted = true
    },
    methods: {
        normalizeNumberOrPercent (center, width, defaultValue) {
            if (typeof center === 'number') return center
            if (typeof center === 'string' && center[center.length - 1] === '%') return width * Number(center.slice(0, -1)) / 100
            return defaultValue
        },
    },
}
</script>
