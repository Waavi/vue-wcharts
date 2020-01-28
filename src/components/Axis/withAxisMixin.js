import VueTypes from 'vue-types'
import { AXIS_DIMENSION, AXIS_TYPE } from './axisMixin'
import { datakeyValue, scaledArray } from '../../utils'
import { obtainNumericDataDomainFromValue, obtainNumericDataDomainFromDatakey } from './axisUtils'
import withUidMixin from '../../mixins/withUidMixin'

export const withXAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.X)
export const withYAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.Y)
export const withZAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.Z)
export const withAngleAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.ANGLE)
export const withRadiusAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.RADIUS)

const numberOfStringVueType = VueTypes.oneOf([VueTypes.number, VueTypes.string])
const numberOfStringOrArrayVueType = VueTypes.oneOf([
    numberOfStringVueType,
    VueTypes.arrayOf(numberOfStringVueType),
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
    // const aAxis = `${lowercasedDimension}Axis`
    const actualADatakey = `actual${capitalizedDimension}Datakey`
    const aDatakeyData = `${lowercasedDimension}DatakeyData`
    const aDataDomain = `${lowercasedDimension}DataDomain`
    const aDataDomainData = `${lowercasedDimension}DataDomainData`
    const aCoordForDatum = `${lowercasedDimension}CoordForDatum`
    const aScale = `${lowercasedDimension}Scale`
    const aScaled = `${lowercasedDimension}Scaled`
    return {
        mixins: [withUidMixin],
        props: {
            [aAxisId]: VueTypes.string.optional,
            [a]: numberOfStringOrArrayVueType,
            series: VueTypes.string.optional,
            [aDatakey]: numberOfStringOrArrayVueType,
        },
        computed: {
            [actualAAxisId] () {
                return this[aAxisId] || dimension
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
                if ((this.Chart.axisDefinitions[this[actualAAxisId]] || {}).type === AXIS_TYPE.NUMERIC) {
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

            // // [aAxis] () {
            // //     const axis = this.Chart.axes[this[actualAAxisId]]
            // //     !axis && console.error(`WChart ERROR - Axis "${this[actualAAxisId]}" is not found.`)
            // //     return axis
            // // },

            [aScale] () {
                const scales = this.Chart.axisScales
                const axisId = this[actualAAxisId]
                !Object.prototype.hasOwnProperty.call(scales, axisId) && console.error(`WChart ERROR - Axis scale "${axisId}" is not found.`)
                return scales[axisId]
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
                const scale = this[aScale] || (x => x)
                return (datum) => {
                    const value = datakeyValue(datum, datakey)
                    return {
                        [lowercasedDimension]: value,
                        [aScaled]: scaledArray(scale, value),
                    }
                }
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
        },
        beforeDestroy () {
            this.Chart.unregisterAxisDatakey(this.uid)
            this.Chart.unregisterAxisDataDomain(this.uid)
        },
    }
}
