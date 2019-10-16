<script>
import VueTypes from 'vue-types'
// import chartMixin from '../chartMixin'
import { getPercentValue } from '../../utils/mathsPie'

export default {
    name: 'WPieChart2',
    // mixins: [chartMixin],
    props: {
        cx: VueTypes.string.def('50%'),
        cy: VueTypes.string.def('50%'),
        startAngle: VueTypes.number.def(0),
        endAngle: VueTypes.number.def(360),
        paddingAngle: VueTypes.number.def(0),
    },
    computed: {
        center () {
            const { cx, cy, viewBox: { width, height } } = this
            return {
                x: getPercentValue({ percent: cx, totalValue: width, defaultValue: width / 2 }),
                y: getPercentValue({ percent: cy, totalValue: height, defaultValue: height / 2 }),
            }
        },
    },
    methods: {
    },
}
</script>
