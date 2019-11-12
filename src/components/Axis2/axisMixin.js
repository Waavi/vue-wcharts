
import VueTypes from 'vue-types'
import {
    obtainCategories,
    obtainNumericDataDomain,
    obtainNumericActualDomain,
    obtainNumericStep,
    obtainNumericActualBounds,
    obtainCategoricalScale,
    obtainNumericScale,
    obtainCategoricalActualTicks,
    obtainNumericActualTicks,
} from './axisUtils'
// import { genTicks, genExactNbTicks } from '@/utils/maths'
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
    mixins: [themeMixin],
    props: {
        // Settings
        id: VueTypes.string.isRequired,
        type: VueTypes.oneOf(AXIS_TYPE_LIST).isRequired,
        reversed: VueTypes.bool.def(false),
        allowDuplicatedCategory: VueTypes.bool.def(false), // http://recharts.org/en-US/examples/LineChartHasMultiSeries
        datakey: VueTypes.string.optional,
        invisible: VueTypes.bool.def(false),
        domain: VueTypes.array.def([]),
        bounds: VueTypes.array.def([]),
        padding: VueTypes.object.def({}), // space between axis edges and bounds region

        // Ticks
        ticks: VueTypes.array.optional,
        numTicks: VueTypes.number.def(8),
        exactNumTicks: VueTypes.number.optional,
        tickFormatter: VueTypes.func.def(value => value),

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

        chart.registerAxis(id, {
            dimension,
            type,
            datakey,
        })
    },
    computed: {
        isNumeric () {
            return this.type === AXIS_TYPE.NUMERIC
        },
        isCategorical () {
            return this.type === AXIS_TYPE.CATEGORICAL
        },

        categories () {
            const { isCategorical, Chart, allowDuplicatedCategory } = this
            if (!isCategorical) return undefined
            return obtainCategories({
                dataset: Chart.dataset,
                datakeys: Chart.axes[this.id].datakeys,
                allowDuplicatedCategory,
            })
        },

        dataDomain () {
            const { id, isNumeric, Chart } = this
            if (!isNumeric) return undefined
            return obtainNumericDataDomain({
                dataset: Chart.dataset,
                datakeys: Chart.axes[id].datakeys,
            })
        },

        actualDomain () {
            const { isNumeric, dataDomain, domain } = this
            if (!isNumeric) return undefined
            return obtainNumericActualDomain({
                dataDomain,
                propDomain: domain,
            })
        },
        step () {
            const {
                isCategorical, actualDomain, numTicks, exactNumTicks,
            } = this
            if (isCategorical) return 1
            return obtainNumericStep({ domain: actualDomain, numTicks, exactNumTicks })
        },

        actualBounds () {
            const {
                isNumeric, actualDomain, step, bounds,
            } = this
            if (!isNumeric) return undefined
            return obtainNumericActualBounds({
                domain: actualDomain,
                step,
                propBounds: bounds,
            })
        },

        scale () {
            const {
                isCategorical, reversed, actualBounds, categories, padding, Chart,
            } = this
            if (isCategorical) {
                return obtainCategoricalScale({
                    categories,
                    range: this.getRange(Chart.canvas, padding),
                    reversed,
                })
            }
            return obtainNumericScale({
                bounds: actualBounds,
                range: this.getRange(Chart.canvas, padding),
                reversed,
            })
        },

        actualTicks () {
            const {
                isCategorical, categories, actualBounds, ticks, step,
            } = this
            if (isCategorical) {
                return obtainCategoricalActualTicks({ ticks, categories })
            }
            return obtainNumericActualTicks({
                ticks,
                bounds: actualBounds,
                step,
            })
        },

        // Generate styles of axis
        axisStylesCmp () {
            return {
                ...this.themeStyles.styles,
                ...this.axisStyles,
            }
        },
        // Generate styles of tick
        markStylesCmp () {
            return {
                ...this.themeStyles.mark,
                ...this.markStyles,
            }
        },
        // Generate styles of text
        tickStylesCmp () {
            return {
                ...this.themeStyles.tick,
                ...this.tickStyles,
            }
        },
        // Generate styles of label
        labelStylesCmp () {
            return {
                fontSize: `${this.labelSize}px`,
                ...this.themeStyles.label,
                ...this.labelStyles,
            }
        },
    },
    created () {
        this.setAxisData()
    },
    updated () {
        this.setAxisData()
    },
    methods: {
        getRange (canvas, padding) {
            // ej: x axis should return [canvas.left + padding.left, canvas.left + canvas.width - padding.right]
            throw new Error('axisMixin: implement "getRange"')
        },
        setAxisData () {
            const {
                dataDomain, actualBounds, scale, actualTicks,
            } = this
            this.Chart.setAxisData(this.id, {
                domain: dataDomain,
                bounds: actualBounds,
                scale,
                ticks: actualTicks,
            })
        },
    },
}
