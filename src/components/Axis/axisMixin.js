
import VueTypes from 'vue-types'
import {
    obtainCategories,
    obtainNumericDataDomain,
    obtainNumericActualDomain,
    obtainNumericStep,
    obtainNumericActualBounds,
    obtainCategoricalScale,
    obtainNumericScale,
} from './axisUtils'
// import { genTicks, genExactNbTicks } from '@/utils/maths'
import withUidMixin from '../../mixins/withUidMixin'
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
    mixins: [
        withUidMixin,
        themeMixin,
    ],
    props: {
        // Settings
        id: VueTypes.string.isRequired,
        type: VueTypes.oneOf(AXIS_TYPE_LIST).isRequired,
        reversed: VueTypes.bool.def(false),
        allowDuplicatedCategory: VueTypes.bool.def(false), // http://recharts.org/en-US/examples/LineChartHasMultiSeries
        series: VueTypes.string.optional,
        datakey: VueTypes.string.optional,
        domain: VueTypes.array.def([]),
        bounds: VueTypes.array.def([]),
        formatter: VueTypes.func.def(value => value),
    },
    computed: {
        axisDefinition () {
            const {
                id, type, series, datakey, $options: { dimension },
            } = this
            return {
                id,
                dimension,
                type,
                series,
                datakey,
            }
        },
        isNumeric () {
            return this.type === AXIS_TYPE.NUMERIC
        },
        isCategorical () {
            return this.type === AXIS_TYPE.CATEGORICAL
        },

        actualRange () {
            // ej: x axis should return [canvas.left + padding.left, canvas.left + canvas.width - padding.right]
            throw new Error('axisMixin: implement "actualRange"')
        },

        categories () {
            const {
                id, isCategorical, Chart, allowDuplicatedCategory,
            } = this
            if (!isCategorical) return undefined
            return obtainCategories({
                dataset: Chart.dataset,
                datakeys: Chart.axisDefs[id].datakeys,
                allowDuplicatedCategory,
            })
        },

        dataDomain () {
            const { id, isNumeric, Chart } = this
            if (!isNumeric) return undefined
            return obtainNumericDataDomain({
                dataset: Chart.dataset,
                datakeys: Chart.axisDefs[id].datakeys,
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
                actualRange, isCategorical, reversed, actualBounds, categories,
            } = this
            if (isCategorical) {
                return obtainCategoricalScale({
                    categories,
                    range: actualRange,
                    reversed,
                })
            }
            return obtainNumericScale({
                bounds: actualBounds,
                range: actualRange,
                reversed,
            })
        },

        axisData () {
            const {
                id, dataDomain, actualBounds, scale, actualTicks,
            } = this
            return {
                id,
                domain: dataDomain,
                bounds: actualBounds,
                scale,
                ticks: actualTicks,
            }
        },
    },
    watch: {
        axisDefinition: {
            handler (definition) {
                this.Chart.registerAxis(definition.id, definition)
            },
            immediate: true,
        },
        axisData: {
            handler (data) {
                this.Chart.setAxisData(data.id, data)
            },
            immediate: true,
        },
    },
}
