import VueTypes from 'vue-types'
import { AXIS_DIMENSION, AXIS_TYPE_CHECKERS } from './axisMixin'
import { datakeyValue, scaledArray } from '../../utils'
import { obtainNumericDataDomainFromValue, obtainNumericDataDomainFromDatakey } from './axisUtils'
import withUidMixin from '../../mixins/withUidMixin'
import activeMixin from '../../mixins/activeMixin'

export const withXAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.X)
export const withYAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.Y)
export const withZAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.Z)
export const withAngleAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.ANGLE)
export const withRadiusAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.RADIUS)
export const withAxisMixin = withAxisMixinFactory

const numberOrStringVueType = VueTypes.oneOf([VueTypes.number, VueTypes.string])
const numberOrStringOrArrayVueType = VueTypes.oneOf([
    numberOrStringVueType,
    VueTypes.arrayOf(numberOrStringVueType),
]).optional

function withAxisMixinFactory (dimension) {
    const dimensionFirstLetter = dimension.charAt(0)
    const dimensionWithoutFirstLetter = dimension.slice(1)
    const lowercasedDimension = dimensionFirstLetter.toLowerCase() + dimensionWithoutFirstLetter
    const capitalizedDimension = dimensionFirstLetter.toUpperCase() + dimensionWithoutFirstLetter
    const a = lowercasedDimension
    const aAxisId = `${lowercasedDimension}AxisId`
    const aDatakey = `${lowercasedDimension}Datakey`
    const actualAAxisId = `actual${capitalizedDimension}AxisId`
    const actualADatakey = `actual${capitalizedDimension}Datakey`
    const aDatakeyData = `${lowercasedDimension}DatakeyData`
    const aDataDomain = `${lowercasedDimension}DataDomain`
    const aDataDomainData = `${lowercasedDimension}DataDomainData`
    const aCoordForDatum = `${lowercasedDimension}CoordForDatum`
    const aScale = `${lowercasedDimension}Scale`
    const aScaled = `${lowercasedDimension}Scaled`
    return {
        mixins: [
            withUidMixin,
            activeMixin,
        ],
        inject: {
            AxisGroup: { default: undefined },
        },
        props: {
            [aAxisId]: VueTypes.string.optional,
            [a]: numberOrStringOrArrayVueType,
            series: VueTypes.string.optional,
            [aDatakey]: numberOrStringOrArrayVueType,
        },
        computed: {
            [actualAAxisId] () {
                const { Chart } = this
                return this[aAxisId] ||
                    Chart.inferredAxisId.byDimension[dimension] ||
                    dimension
            },
            [actualADatakey] () {
                return this[aDatakey] || (this.Chart.axisDefinitions[this[actualAAxisId]] || {}).datakey
            },
            [aDatakeyData] () {
                return {
                    axisId: this[actualAAxisId],
                    series: this.series,
                    datakey: this[actualADatakey],
                }
            },

            [aDataDomain] () {
                if (AXIS_TYPE_CHECKERS.isNumeric((this.Chart.axisDefinitions[this[actualAAxisId]] || {}).type)) {
                    return obtainNumericDataDomainFromValue(this[a]) ||
                        obtainNumericDataDomainFromDatakey({
                            dataset: this.Chart.dataset,
                            series: this.series,
                            datakey: this[actualADatakey],
                        })
                }
                return undefined
            },
            [aDataDomainData] () {
                return {
                    axisId: this[actualAAxisId],
                    domain: this[aDataDomain],
                }
            },

            [aScale] () {
                const { Chart, AxisGroup } = this
                const scales = Chart.axisScales
                const axisId = this[actualAAxisId]
                !Object.prototype.hasOwnProperty.call(scales, axisId) && console.error(`WChart ERROR - Axis scale "${axisId}" is not found.`)
                return (AxisGroup && AxisGroup.getSlottedScale(this.uid, axisId)) || scales[axisId]
            },
            [aScaled] () {
                const value = this[a]
                const scale = this[aScale]
                if (value !== undefined && scale) {
                    return scaledArray(scale, value)
                }
                return undefined
            },

            [aCoordForDatum] () {
                const datakey = this[actualADatakey]
                const scale = this[aScale]
                if (scale) {
                    return (datum) => {
                        const value = datakeyValue(datum, datakey)
                        return {
                            [lowercasedDimension]: value,
                            [aScaled]: scaledArray(scale, value),
                        }
                    }
                }
                return null
            },
        },
        watch: {
            [aDatakeyData]: {
                handler (data) {
                    this.Chart.registerAxisDatakey(this.uid, data)
                },
                immediate: true,
            },
            [aDataDomainData]: {
                handler (data) {
                    if (data && data.domain) {
                        this.Chart.registerAxisDataDomain(this.uid, data)
                    }
                },
                immediate: true,
            },
            isActive (value) {
                if (value) {
                    this.activate()
                    this.Chart.registerAxisDatakey(this.uid, this[aDatakeyData])
                    this.Chart.registerAxisDataDomain(this.uid, this[aDataDomainData])
                } else {
                    this.deactivate()
                }
            },
        },
        created () {
            this.activate()
        },
        beforeDestroy () {
            this.deactivate()
        },
        methods: {
            activate () {
                const { registerIntoSlot } = this.AxisGroup || {}
                registerIntoSlot && registerIntoSlot(this.uid)
            },
            deactivate () {
                const { unregisterIntoSlot } = this.AxisGroup || {}
                unregisterIntoSlot && unregisterIntoSlot(this.uid)
                this.Chart.unregisterAxisDatakey(this.uid)
                this.Chart.unregisterAxisDataDomain(this.uid)
            },
        },
    }
}
