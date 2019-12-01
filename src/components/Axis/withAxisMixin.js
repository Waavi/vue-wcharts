import VueTypes from 'vue-types'
import { AXIS_DIMENSION } from './axisMixin'
import withUidMixin from '../../mixins/withUidMixin'

export const withXAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.X)
export const withYAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.Y)
export const withZAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.Z)
export const withAngleAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.ANGLE)
export const withRadiusAxisMixin = withAxisMixinFactory(AXIS_DIMENSION.RADIUS)

function withAxisMixinFactory (dimension) {
    const lowercasedAxis = dimension.charAt(0).toLowerCase() + dimension.slice(1)
    const capitalizedAxis = dimension.charAt(0).toUpperCase() + dimension.slice(1)
    const aAxisId = `${lowercasedAxis}AxisId`
    const aDatakey = `${lowercasedAxis}Datakey`
    const actualAAxisId = `actual${capitalizedAxis}AxisId`
    const aAxis = `${lowercasedAxis}Axis`
    const actualADatakey = `actual${capitalizedAxis}Datakey`
    const aCoordForDatum = `${lowercasedAxis}CoordForDatum`
    const aScaled = `${lowercasedAxis}Scaled`
    return {
        mixins: [withUidMixin],
        props: {
            series: VueTypes.string.optional,
            [aAxisId]: VueTypes.string.optional,
            [aDatakey]: VueTypes.string.optional,
        },
        computed: {
            [actualAAxisId] () {
                return this[aAxisId] || dimension
            },
            [aAxis] () {
                const axis = this.Chart.axes[this[actualAAxisId]]
                !axis && console.error(`WChart ERROR - Axis "${this[actualAAxisId]}" is not found.`)
                return axis
            },
            [actualADatakey] () {
                return this[aDatakey] || this[aAxis].datakey
            },
            datakeyData () {
                return {
                    axisId: this[actualAAxisId],
                    series: this.series,
                    datakey: this[actualADatakey],
                }
            },
        },
        watch: {
            datakeyData: {
                handler (data) {
                    this.Chart.registerAxisDatakey(this.uid, data)
                },
                immediate: true,
            },
        },
        methods: {
            [aCoordForDatum] (datum) {
                const a = typeof datum === 'object' ? datum[this[actualADatakey]] : datum
                return {
                    [lowercasedAxis]: a,
                    [aScaled]: this[aAxis].scale(a),
                }
            },
        },
    }
}
