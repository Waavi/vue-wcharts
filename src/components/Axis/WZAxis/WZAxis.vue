<template>
    <g :id="id">
        <path />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import axisMixin, { AXIS_TYPE, AXIS_TYPE_LIST, AXIS_DIMENSION } from '../axisMixin'

export default {
    name: 'WZAxis',
    dimension: AXIS_DIMENSION.Z,
    mixins: [axisMixin],
    props: {
        id: VueTypes.string.def(AXIS_DIMENSION.Z),
        type: VueTypes.oneOf(AXIS_TYPE_LIST).def(AXIS_TYPE.NUMERIC),
        scaleFn: VueTypes.oneOfType([VueTypes.string, VueTypes.func]).def('circleArea'),
        range: VueTypes.arrayOf(VueTypes.number).def([0, 50]),
    },
    computed: {
        actualRange () {
            return this.range
        },
        actualTicks () {
            return []
        },
    },
}
</script>
