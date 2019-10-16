<script>
import VueTypes from 'vue-types'
import chartMixin from '../chartMixin'

export const CHART_LAYOUT = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
}
const CHART_LAYOUT_ARRAY = [CHART_LAYOUT.HORIZONTAL, CHART_LAYOUT.VERTICAL]

export default {
    name: 'WCartesian2',
    mixins: [chartMixin],
    props: {
        layout: VueTypes.oneOf(CHART_LAYOUT_ARRAY).def(CHART_LAYOUT.HORIZONTAL),
    },
    computed: {
    },
    methods: {
    },
}
</script>
