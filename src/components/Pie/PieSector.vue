<template>
    <g v-if="isActive">
        <BasicArc
            :arcGenerator="arcGenerator"
            :startAngle="startAngle"
            :endAngle="endAngle"
            :padAngle="padAngle"
            v-bind="{
                ...actualStyles.sector,
                ...$attrs,
            }"
        >
            <slot
                :datum="data"
                :value="value"
                :arcGenerator="arcGenerator"
                :startAngle="startAngle"
                :endAngle="endAngle"
                :styles="actualStyles.sector"
            />
        </BasicArc>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import drawableCartesianMixin from '../../mixins/drawable/drawableCartesianMixin'
import BasicArc from '../basicsElements/BasicArc/BasicArc.vue'

export default {
    name: 'PieSector',
    components: {
        BasicArc,
    },
    mixins: [drawableCartesianMixin],
    inheritAttrs: false,
    props: {
        arcGenerator: VueTypes.func.isRequired,
        startAngle: VueTypes.number.isRequired,
        endAngle: VueTypes.number.isRequired,
        padAngle: VueTypes.number.isRequired,
        data: VueTypes.any.isRequired,
        value: VueTypes.any.isRequired,
    },
}
</script>
