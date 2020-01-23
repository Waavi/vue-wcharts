import VueTypes from 'vue-types'
import { AXIS_DIMENSION, AXIS_TYPE } from './axisMixin'
import {
    datakeyValue,
    obtainNumericDataDomainFromValue,
    obtainNumericDataDomainFromDatakey,
} from './axisUtils'
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
        data () {
            return {
                hasBeenMounted: false,
            }
        },
        computed: {
            [actualAAxisId] () {
                console.log('computed ', actualAAxisId)
                // debugger
                return this[aAxisId] || dimension
            },
            [actualADatakey] () {
                console.log('computed ', actualADatakey)
                // debugger
                return this[aDatakey] || (this.Chart.axisDefinitions[this[actualAAxisId]] || {}).datakey
            },
            [aDatakeyData] () {
                console.log('computed ', aDatakeyData)
                // debugger
                return {
                    axisId: this[actualAAxisId],
                    series: this.series,
                    datakey: this[actualADatakey],
                }
            },

            [aDataDomain] () {
                if (!this.hasBeenMounted) return undefined
                console.log('computed ', aDataDomain)
                // debugger
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
                if (!this.hasBeenMounted) return undefined
                console.log('computed ', aDataDomainData)
                // debugger
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
                if (!this.hasBeenMounted) return undefined
                const scales = this.Chart.axisScales
                const axisId = this[actualAAxisId]
                !Object.prototype.hasOwnProperty.call(scales, axisId) && console.error(`WChart ERROR - Axis scale "${axisId}" is not found.`)
                // debugger
                return scales[axisId]
            },
            [aScaled] () {
                if (!this.hasBeenMounted) return undefined
                const value = this[a]
                const scale = this[aScale]
                if (value !== undefined && scale) {
                    return Array.isArray(value) ? value.map(v => scale(v)) : scale(value)
                }
                return undefined
            },

            [aCoordForDatum] () {
                console.log('aCoordForDatum: ', aCoordForDatum)
                if (!this.hasBeenMounted) return undefined
                const datakey = this[actualADatakey]
                const scale = this[aScale] || (x => x)
                return (datum) => {
                    const value = datakeyValue({ datum, datakey })
                    return {
                        [lowercasedDimension]: value,
                        [aScaled]: Array.isArray(value) ? value.map(v => scale(v)) : scale(value),
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
        mounted () {
            this.hasBeenMounted = true
        },
    }
}
