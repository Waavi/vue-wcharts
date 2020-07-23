<template>
    <g
        v-if="arcData"
        :transform="`translate(${cx},${cy})`"
    >
        <path
            ref="path"
            :d="initialPath"
            v-bind="$attrs"
        />
        <g
            v-if="$slots.default"
            ref="centroid"
            :transform="initialCentroidTransform"
        >
            <slot
                :cx="cx"
                :cy="cy"
                :startAngle="startAngle"
                :endAngle="endAngle"
                :arcGenerator="actualArcGenerator"
            />
        </g>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import withAnimation from '../../../transitions/Animation/withAnimation'
import { arcGeneratorFactory, arcPathAnimateTo, arcCentroidAnimateTo } from '../d3Utils'

export default {
    name: 'BasicArc',
    mixins: [withAnimation],
    props: {
        cx: VueTypes.number.def(0),
        cy: VueTypes.number.def(0),
        startAngle: VueTypes.number.def(0),
        endAngle: VueTypes.number.def(2 * Math.PI),
        padAngle: VueTypes.number.def(0),
        outerRadius: VueTypes.number.optional,
        innerRadius: VueTypes.number.optional,
        padRadius: VueTypes.number.optional,
        cornerRadius: VueTypes.number.optional,
        arcGenerator: VueTypes.func.optional,
    },
    computed: {
        arcData () {
            const data = {
                startAngle: this.startAngle,
                endAngle: this.endAngle,
                padAngle: this.padAngle,
            }
            if (this.outerRadius) {
                data.outerRadius = this.outerRadius
            }
            if (this.innerRadius) {
                data.innerRadius = this.innerRadius
            }
            if (this.padRadius) {
                data.padRadius = this.padRadius
            }
            if (this.cornerRadius) {
                data.cornerRadius = this.cornerRadius
            }
            return data
        },
        actualArcGenerator () {
            return this.arcGenerator || arcGeneratorFactory({
                outerRadius: this.outerRadius || 50,
                innerRadius: this.innerRadius || 0,
                padAngle: this.padAngle || 0,
                padRadius: this.padRadius || 0,
                cornerRadius: this.cornerRadius || 0,
            })
        },
    },
    watch: {
        arcData: {
            handler (newArcData, oldArcData) {
                const generator = this.actualArcGenerator
                if (oldArcData) {
                    const duration = this.actualAnimDuration
                    arcPathAnimateTo({
                        pathRef: this.$refs.path, oldArcData, newArcData, generator, duration,
                    })
                    arcCentroidAnimateTo({
                        centroidRef: this.$refs.centroid, oldArcData, newArcData, generator, duration,
                    })
                } else {
                    this.initialPath = generator(newArcData)
                    const centroid = generator.centroid(newArcData)
                    this.initialCentroidTransform = `translate(${centroid[0]},${centroid[1]})`
                }
            },
            immediate: true,
        },
    },
}
</script>
