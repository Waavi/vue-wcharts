
import VueTypes from 'vue-types'
import { scaleLinear, scaleTime } from 'd3-scale'
import {
    obtainCategories,
    obtainNumericGlobalDataDomain,
    obtainNumericActualDomain,
} from './axisUtils'
import {
    obtainCategoricalScale,
    obtainNumericScale,
} from './axisScaleUtils'
import withUidMixin from '../../mixins/withUidMixin'
import stylesMixin from '../../mixins/stylesMixin'
import {
    paddingBandVueType,
    paddingStartEndVueType,
    normalizePaddingBand,
    normalizePaddingStartEnd,
} from '../../charts/chartUtils'

export const AXIS_TYPE = {
    NUMERIC: 'numeric',
    TEMPORAL: 'temporal',
    CATEGORICAL: 'categorical',
}
export const AXIS_NUMERIC_TYPES = [AXIS_TYPE.NUMERIC, AXIS_TYPE.TEMPORAL]
export const AXIS_CATEGORICAL_TYPES = [AXIS_TYPE.CATEGORICAL]
export const AXIS_TYPE_LIST = [...AXIS_NUMERIC_TYPES, ...AXIS_CATEGORICAL_TYPES]

export const AXIS_TYPE_CHECKERS = {
    isNumeric: type => AXIS_NUMERIC_TYPES.includes(type),
    isTemporal: type => type === AXIS_TYPE.TEMPORAL,
    isCategorical: type => type === AXIS_TYPE.CATEGORICAL,
}

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
        stylesMixin,
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
        numTicks: VueTypes.any.def(8),
        d3Scale: VueTypes.func.optional,
        d3ScaleFactor: VueTypes.func.optional,
        padding: paddingStartEndVueType,
        bandPadding: paddingBandVueType,
        formatter: VueTypes.func.def(value => value), // default formatter (for ticks and drawable values that belong to this)
    },
    computed: {
        axisDefinition () {
            const {
                id, type, series, datakey, formatter, $options: { dimension },
            } = this
            return {
                id,
                dimension,
                type,
                series,
                datakey,
                formatter,
            }
        },
        isNumeric () {
            return AXIS_TYPE_CHECKERS.isNumeric(this.type)
        },
        isTemporal () {
            return AXIS_TYPE_CHECKERS.isTemporal(this.type)
        },
        isCategorical () {
            return AXIS_TYPE_CHECKERS.isCategorical(this.type)
        },

        normalizedPadding () {
            return normalizePaddingStartEnd(this.padding)
        },
        normalizedBandPadding () {
            return normalizePaddingBand(this.bandPadding)
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
                datakeys: Chart.axisDatakeys[id],
                allowDuplicatedCategory,
            })
        },

        dataDomain () {
            const { id, isNumeric, Chart } = this
            if (!isNumeric) return undefined
            return obtainNumericGlobalDataDomain({
                dataDomainByElement: Chart.axisDataDomainsByElement[id],
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

        scale () {
            const {
                isTemporal, d3Scale, d3ScaleFactor, actualRange, isCategorical, reversed, actualDomain,
                bounds: propBounds, numTicks, categories, normalizedPadding, normalizedBandPadding,
            } = this
            if (isCategorical) {
                return obtainCategoricalScale({
                    categories,
                    range: actualRange,
                    rangePadding: normalizedPadding,
                    bandPadding: normalizedBandPadding,
                    reversed,
                    d3ScaleFactor,
                })
            }
            return obtainNumericScale({
                d3Scale: d3Scale || (isTemporal ? scaleTime() : scaleLinear()),
                dataDomain: actualDomain,
                propBounds,
                numTicks,
                range: actualRange,
                rangePadding: normalizedPadding,
                reversed,
                d3ScaleFactor,
            })
        },

        actualBounds () {
            const {
                isNumeric, scale,
            } = this
            if (!isNumeric || !scale) return undefined
            return scale.bounds()
        },

        reference () {
            const {
                dimension, isCategorical, scale, actualRange,
            } = this
            if (isCategorical || !scale) {
                return dimension === AXIS_DIMENSION.Y ? actualRange[1] : actualRange[0]
            }
            return scale(0)
        },
    },
    watch: {
        axisDefinition: {
            handler (definition) {
                this.Chart.registerAxisDefinition(this.id, definition)
            },
            immediate: true,
        },
        dataDomain: {
            handler (value) {
                this.Chart.setAxisDomain(this.id, value)
            },
            immediate: true,
        },
        scale: {
            handler (value) {
                this.Chart.setAxisScale(this.id, value)
            },
            immediate: true,
        },
        actualBounds: {
            handler (value) {
                this.Chart.setAxisBound(this.id, value)
            },
            immediate: true,
        },
        reference: {
            handler (value) {
                this.Chart.setAxisReference(this.id, value)
            },
            immediate: true,
        },
    },
    beforeDestroy () {
        this.Chart.unregisterAxis(this.id)
    },
}
