<template>
    <g>
        <circle
            v-if="circleProps"
            v-bind="circleProps"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import drawableCartesianMixin from '../../../mixins/drawable/drawableCartesianMixin'
import { withXAxisMixin, withYAxisMixin, withZAxisMixin } from '../../Axis2/withAxisMixin'

export default {
    name: 'WPoint',
    mixins: [
        drawableCartesianMixin,
        withXAxisMixin,
        withYAxisMixin,
        withZAxisMixin,
    ],
    props: {
        x: VueTypes.oneOfType([VueTypes.number, VueTypes.string]).isRequired,
        y: VueTypes.oneOfType([VueTypes.number, VueTypes.string]).isRequired,
        z: VueTypes.oneOfType([VueTypes.number, VueTypes.string]).optional,
        size: VueTypes.number.optional,
        shape: VueTypes.string.def('circle'),
    },
    computed: {
        coords () {
            const {
                x, y, z, xCoordForDatum, yCoordForDatum, zCoordForDatum,
            } = this

            return {
                ...xCoordForDatum(x),
                ...yCoordForDatum(y),
                ...zCoordForDatum(z),
            }
        },
        circleProps () {
            const { shape, coords } = this
            if (shape === 'circle') {
                return {
                    cx: coords.xScaled,
                    cy: coords.yScaled,
                    r: coords.zScaled / 2,
                    stroke: '#000',
                    'stroke-width': 2,
                    fill: 'none',
                }
            }
            return undefined
        },
    },
}
</script>
