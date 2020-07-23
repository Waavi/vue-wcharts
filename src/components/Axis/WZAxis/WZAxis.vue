<script>
import VueTypes from 'vue-types'
import { scaleSqrt } from 'd3-scale'
import axisMixin, { AXIS_TYPE, AXIS_TYPE_LIST, AXIS_DIMENSION } from '../axisMixin'

export default {
    name: 'WZAxis',
    dimension: AXIS_DIMENSION.Z,
    mixins: [axisMixin],
    props: {
        id: VueTypes.string.def(AXIS_DIMENSION.Z),
        type: VueTypes.oneOf(AXIS_TYPE_LIST).def(AXIS_TYPE.NUMERIC),
        d3ScaleFactor: VueTypes.func.def(scaleSqrt()),
        range: VueTypes.arrayOf(VueTypes.number).def([0, 30]),
    },
    computed: {
        actualRange () {
            return this.range
        },
    },
    render () {
        return undefined
    },
}
</script>
