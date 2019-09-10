
<template>
    <g>
        <line
            v-bind="line"
            :stroke="stylesCmp.stroke"
            :stroke-width="stylesCmp.strokeWidth"
            :stroke-dasharray="stylesCmp.strokeDasharray"
            fill="none"
        />
        <slot
            v-bind="labelCoordinates"
            :isX="isX"
            :label="label"
            :value="value"
            :align="labelAlign"
            :style="labelStylesCmp"
        >
            <text
                v-bind="labelCoordinates"
                :text-anchor="isX ? 'end' : labelAlign"
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
        type: VueTypes.oneOf(['y', 'x']).def('y'),
        value: VueTypes.any.isRequired,
        label: VueTypes.string.def(''),
        labelAlign: VueTypes.oneOf(['start', 'end']).def('end'),
        styles: VueTypes.shape({
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            strokeDasharray: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
        }),
        labelStyles: VueTypes.object,
    },
    computed: {
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
        isX () {
            return this.type === 'x'
        },
        line () {
            const {
                data, canvas, yScale, padding, axis,
            } = this.Chart
            if (this.isX) {
                // Calculate left and right space
                const offset = padding[1] + padding[3]
                // Calculate space between lines
                const space = (canvas.width - offset) / Math.max(data.length - 1, 1)
                const index = data.findIndex(d => d[axis.x.datakey] === this.value)
                const x = canvas.x0 + space * (data.length === 1 ? 0.5 : index) + padding[3]
                return {
                    x1: x,
                    y1: canvas.y0,
                    x2: x,
                    y2: canvas.y1,
                }
            }
            const y = yScale(this.value)
            return {
                x1: canvas.x0,
                y1: y,
                x2: canvas.x1,
                y2: y,
            }
        },
        labelCoordinates () {
            if (this.isX) {
                return {
                    x: this.line.x1 - 5,
                    y: this.labelAlign === 'end' ? this.line.y1 : this.line.y2 + 5,
                    dy: this.labelAlign === 'end' ? 15 : -10,
                }
            }
            return {
                x: this.labelAlign === 'end' ? this.line.x2 - 5 : this.line.x1 + 5,
                y: this.line.y1,
                dy: -10,
            }
        },
    },
}
</script>
