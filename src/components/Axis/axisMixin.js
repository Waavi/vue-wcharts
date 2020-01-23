
import VueTypes from 'vue-types'
import {
    obtainCategories,
    obtainNumericGlobalDataDomain,
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
        formatter: VueTypes.func.def(value => value), // default formatter (for ticks and drawable values that belong to this)
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
            // if (this.id === 'time' || true) debugger
            if (!isCategorical) return undefined
            return obtainCategories({
                dataset: Chart.dataset,
                datakeys: Chart.axisDatakeys[id],
                allowDuplicatedCategory,
            })
        },

        dataDomain () {
            const { id, isNumeric, Chart } = this
            // if (this.id === 'time' || true) debugger
            if (!isNumeric) return undefined
            return obtainNumericGlobalDataDomain({
                dataDomainByElement: Chart.axisDataDomainsByElement[id],
            })
        },

        actualDomain () {
            const { isNumeric, dataDomain, domain } = this
            // if (this.id === 'time' || true) debugger
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
            // if (this.id === 'time' || true) debugger
            if (isCategorical) return 1
            return obtainNumericStep({ domain: actualDomain, numTicks, exactNumTicks })
        },

        actualBounds () {
            const {
                isNumeric, actualDomain, step, bounds,
            } = this
            // if (this.id === 'time' || true) debugger
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
            // if (this.id === 'time' || true) debugger
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

        // axisInformation () {
        //     const {
        //         id, dataDomain, actualBounds, scale, actualTicks,
        //     } = this
        //     if (this.id === 'time' || true) debugger
        //     return {
        //         id,
        //         domain: dataDomain,
        //         bounds: actualBounds,
        //         scale,
        //         ticks: actualTicks,
        //     }
        // },
    },
    watch: {
        axisDefinition: {
            handler (definition) {
                this.Chart.registerAxisDefinition(definition.id, definition)
            },
            immediate: true,
        },
        dataDomain: {
            handler (value) {
                this.Chart.setAxisDomain(this.id, value)
            },
            immediate: true,
        },
        actualBounds: {
            handler (value) {
                this.Chart.setAxisBound(this.id, value)
            },
            immediate: true,
        },
        scale: {
            handler (value) {
                this.Chart.setAxisScale(this.id, value)
            },
            immediate: true,
        },
        ticks: {
            handler (value) {
                this.Chart.setAxisTicks(this.id, value)
            },
            immediate: true,
        },

        // axisInformation: {
        //     handler (data) {
        //         if (this.id === 'time' || true) debugger
        //         this.Chart.setAxisInformation(data.id, data)
        //     },
        //     immediate: true,
        // },
    },
}
