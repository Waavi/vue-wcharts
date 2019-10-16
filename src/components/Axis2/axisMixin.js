
import VueTypes from 'vue-types'
// import { genTicks, genExactNbTicks } from '@/utils/maths'
import registerUidMixin from '../../mixins/registerUidMixin'
import themeMixin from '../../mixins/theme'

export const AXIS_TYPE = {
    NUMERIC: 'numeric',
    CATEGORICAL: 'categorical',
}
export const AXIS_TYPE_LIST = [AXIS_TYPE.NUMERIC, AXIS_TYPE.CATEGORICAL]
export const AXIS_DIMENSION = {
    X: 'x',
    Y: 'y',
    Z: 'z',
    ANGLE: 'angle',
    RADIUS: 'radius',
}

export default {
    type: 'axis',
    dimension: undefined, // 'x', 'y', 'z', 'radial', 'angle'
    inject: ['Chart'],
    mixins: [registerUidMixin, themeMixin],
    props: {
        // Settings
        id: VueTypes.string.isRequired,
        type: VueTypes.oneOf(AXIS_TYPE_LIST).isRequired,
        allowDuplicatedCategory: VueTypes.bool.def(false), // http://recharts.org/en-US/examples/LineChartHasMultiSeries
        datakey: VueTypes.string.optional,
        invisible: VueTypes.bool.def(false),
        domain: VueTypes.array.def([]),
        padding: VueTypes.object.def({}), // space between axis edges and bounds region

        // Ticks
        ticks: VueTypes.array.optional,
        numTicks: VueTypes.number.def(8),
        exactNumTicks: VueTypes.number.optional,
        tickformatter: VueTypes.func.def(value => value),

        // Label
        label: VueTypes.oneOfType([
            VueTypes.string,
            VueTypes.arrayOf(VueTypes.string),
        ]).optional,
        labelFontSize: VueTypes.number.def(12),

        grid: VueTypes.oneOfType([
            VueTypes.bool, // same as "1"
            VueTypes.number, // number of grid lines per tick
        ]).optional,

        // Negative axis
        hideNegativeAxis: VueTypes.bool.def(false),

        // Style
        hideLine: VueTypes.bool.def(false),
        hideTickMark: VueTypes.bool.def(false),
        axisStyles: VueTypes.object,
        markStyles: VueTypes.object,
        labelStyles: VueTypes.object,
        tickLength: VueTypes.number.def(5),
        tickStyles: VueTypes.object,

        gridStyles: VueTypes.object,
    },
    preload ({ chart, options, props }) {
        const { dimension } = options
        const { id, type, datakey } = props || {}
        // const uid = getUid(options, props)

        chart.registerAxis(id, {
            dimension,
            type,
            datakey,
        })
    },
    computed: {
        actualDomain () {
            return [0, 100]
        },
        actualBounds () {
            return this.actualDomain
        },
        actualTicks () {
            return [0, 50, 100]
        },

        scale () {
            return x => x
        },

        // Generate styles of axis
        axisStylesCmp () {
            return {
                ...this.themeStyles.styles,
                ...this.axisStyles,
            }
        },
    },
    created () {
        this.Chart.setAxisData(this.id, {
            domain: [1, 99],
            bounds: [0, 100],
            scale: x => x,
        })
    },
    methods: {

    },
}
