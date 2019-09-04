
<template>
    <g>
        <line
            v-if="line"
            v-bind="line"
            :stroke="stylesCmp.stroke"
            :stroke-width="stylesCmp.strokeWidth"
            :stroke-dasharray="stylesCmp.strokeDasharray"
        />
        <circle
            v-if="circle"
            v-bind="circle"
            :stroke="stylesCmp.stroke"
            :stroke-width="stylesCmp.strokeWidth"
            :stroke-dasharray="stylesCmp.strokeDasharray"
            :fill="stylesCmp.fill"
            :r="stylesCmp.r"
        />
        <rect
            v-if="rect"
            v-bind="rect"
            :stroke="stylesCmp.stroke"
            :stroke-width="stylesCmp.strokeWidth"
            :stroke-dasharray="stylesCmp.strokeDasharray"
            :fill="stylesCmp.fill"
        />
        <slot
            v-if="['xLine', 'yLine'].includes(type)"
            v-bind="labelCoordinates"
            :value="type === 'xLine' ? x : y"
            :label="label"
            :align="labelAlign"
            :style="labelStylesCmp"
        >
            <text
                v-bind="labelCoordinates"
                :text-anchor="type === 'xLine' ? 'end' : labelAlign"
                :style="labelStylesCmp"
            >
                {{ label }}
            </text>
        </slot>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import themeMixin from '../../mixins/theme'

export default {
    name: 'WMarker',
    type: 'cartesian',
    inject: ['Chart'],
    mixins: [themeMixin],
    props: {
        x: VueTypes.oneOfType([VueTypes.number, VueTypes.arrayOf(VueTypes.number)]).optional,
        y: VueTypes.oneOfType([VueTypes.number, VueTypes.arrayOf(VueTypes.number)]).optional,
        borderSpacing: VueTypes.oneOfType([VueTypes.number, VueTypes.arrayOf(VueTypes.number)]).def([0, 0, 0, 0]),
        label: VueTypes.string.def(''),
        labelAlign: VueTypes.oneOf(['start', 'end']).def('end'),
        styles: VueTypes.object.def({}),
        labelStyles: VueTypes.object,
    },
    computed: {
        scaledX () {
            if (Array.isArray(this.x) && this.x.length === 2) {
                return this.x.map(x => this.getScaledValue({ value: x, isX: true, isCategory: !this.Chart.scatter })).sort()
            }
            if (this.x !== undefined) {
                return this.getScaledValue({ value: this.x, isX: true, isCategory: !this.Chart.scatter })
            }
            return undefined
        },
        scaledY () {
            if (Array.isArray(this.y) && this.y.length === 2) {
                return this.y.map(y => this.getScaledValue({ value: y, isX: false, isCategory: false })).sort()
            }
            if (this.y !== undefined) {
                return this.getScaledValue({ value: this.y, isX: false, isCategory: false })
            }
            return undefined
        },
        type () {
            const withXRange = Array.isArray(this.scaledX)
            const withXPoint = !withXRange && this.scaledX !== undefined
            const withYRange = Array.isArray(this.scaledY)
            const withYPoint = !withYRange && this.scaledY !== undefined
            return (withXRange && withYRange && 'rect') ||
                (withXRange && 'xRange') ||
                (withYRange && 'yRange') ||
                (withXPoint && withYPoint && 'point') ||
                (withXPoint && 'xLine') ||
                (withYPoint && 'yLine') ||
                undefined
        },
        // Generate styles of line
        stylesCmp () {
            return {
                ...this.themeStyles.styles,
                ...this.styles,
            }
        },
        // Generate styles of label
        labelStylesCmp () {
            return {
                ...this.themeStyles.label,
                ...this.labelStyles,
            }
        },
        circle () {
            if (this.type === 'point') {
                return {
                    cx: this.scaledX,
                    cy: this.scaledY,
                }
            }
            return undefined
        },
        line () {
            if (this.type === 'xLine') {
                const { canvas } = this.Chart
                return {
                    x1: this.scaledX,
                    y1: canvas.y0,
                    x2: this.scaledX,
                    y2: canvas.y1,
                }
            }
            if (this.type === 'yLine') {
                const { canvas } = this.Chart
                return {
                    x1: canvas.x0,
                    y1: this.scaledY,
                    x2: canvas.x1,
                    y2: this.scaledY,
                }
            }
            return undefined
        },
        rect () {
            if (['rect', 'xRange', 'yRange'].includes(this.type)) {
                const { canvas } = this.Chart
                const x1 = this.type === 'yRange'
                    ? canvas.x0
                    : this.scaledX[0] - this.getBorderSpacing({ index: 3, isX: true, isCategory: !this.Chart.scatter })
                const x2 = this.type === 'yRange'
                    ? canvas.x1
                    : this.scaledX[1] + this.getBorderSpacing({ index: 1, isX: true, isCategory: !this.Chart.scatter })
                const y1 = this.type === 'xRange'
                    ? canvas.y0
                    : this.scaledY[0] - this.getBorderSpacing({ index: 0, isX: false, isCategory: false })
                const y2 = this.type === 'xRange'
                    ? canvas.y1
                    : this.scaledY[1] + this.getBorderSpacing({ index: 2, isX: false, isCategory: false })
                return {
                    x: Math.min(x1, x2),
                    y: Math.min(y1, y2),
                    width: Math.abs(x1 - x2),
                    height: Math.abs(y1 - y2),
                }
            }
            return undefined
        },
        labelCoordinates () {
            if (this.type === 'xLine') {
                return {
                    x: this.line.x1 - 5,
                    y: this.labelAlign === 'end' ? this.line.y1 : this.line.y2 + 5,
                    dy: this.labelAlign === 'end' ? 15 : -10,
                }
            }
            if (this.type === 'yLine') {
                return {
                    x: this.labelAlign === 'end' ? this.line.x2 - 5 : this.line.x1 + 5,
                    y: this.line.y1,
                    dy: -10,
                }
            }
            return {}
        },
    },
    methods: {
        getScaledValue ({ value, isX, isCategory }) {
            if (value === undefined) return undefined
            if (isCategory) {
                const {
                    data, canvas, padding, axis,
                } = this.Chart
                // Calculate left and right space
                const offset = padding[isX ? 1 : 0] + padding[isX ? 3 : 2]
                // Calculate space between lines
                const space = (canvas[isX ? 'width' : 'height'] - offset) / Math.max(data.length - 1, 1)
                const index = data.findIndex(d => d[axis[isX ? 'x' : 'y'].datakey] === value)
                return canvas[isX ? 'x0' : 'y0'] + space * (data.length === 1 ? 0.5 : index) + padding[isX ? 3 : 4]
            }
            return this.Chart[isX ? 'xScale' : 'yScale'](value)
        },
        getBorderSpacing ({ index, isX, isCategory }) {
            const spacing = (this.borderSpacing || [])[index] || 0
            if (isCategory && spacing > 0) {
                const {
                    data, canvas, padding,
                } = this.Chart
                // Calculate left and right space
                const offset = padding[isX ? 1 : 0] + padding[isX ? 3 : 2]
                // Calculate space between lines
                const space = (canvas[isX ? 'width' : 'height'] - offset) / Math.max(data.length - 1, 1)
                return spacing * space
            }
            return spacing
        },
    },
}
</script>
