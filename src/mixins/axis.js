
import VueTypes from 'vue-types'
import { genTicks, genExactNbTicks } from '../utils/maths'
import WAxisText from '../components/Axis/WAxisText/WAxisText.vue'
import themeMixin from './theme'

const spaceLabel = (label, isX) => {
    const num = Array.isArray(label) ? label.length : 2
    if (isX) return [0, 50, (30 + (25 * num)), 50]
    return [50, 0, 0, (30 + (25 * num))]
}

export default {
    type: 'axis',
    inject: ['Chart'],
    mixins: [themeMixin],
    components: {
        WAxisText,
    },
    props: {
        // Settings
        name: VueTypes.string.def(''),
        datakey: VueTypes.string,
        textOffset: VueTypes.number.def(20),
        hideLine: VueTypes.bool.def(false),
        hideTickMark: VueTypes.bool.def(false),
        numTicks: VueTypes.number.def(8),
        format: VueTypes.func.def(value => value),
        label: VueTypes.oneOfType([
            VueTypes.string,
            VueTypes.arrayOf(VueTypes.string),
        ]).optional,
        labelSize: VueTypes.number.def(12),
        // Negative axis
        hideNegativeAxis: VueTypes.bool.def(false),
        // Style
        axisStyles: VueTypes.object,
        markStyles: VueTypes.object,
        labelStyles: VueTypes.object,
        tickStyles: VueTypes.object,
    },
    preload ({ parent, props, index }) {
        const {
            space, label, datakey, name,
        } = props
        // Check type axis
        const isX = this.axis === 'x'
        // Get spaces binding or default
        let spaces = space || this.props.space.default()
        // Set default space if has label and not space value
        if (!space && label) {
            spaces = spaceLabel(label, isX)
        }
        // Added spaces of parent
        parent.addSpaceObjects(spaces)
        if (isX) {
            parent.axis.x.datakey = datakey
            parent.axis.x.name = name || ''
        } else {
            parent.axis.y.datakey = datakey
            parent.axis.y.name = name || ''
        }
    },
    mounted () {
        // Show warn if used the label slot, the space prop it is mandatory
        if (this.$scopedSlots.label) console.warn('Remember, If you use the label slot, the space prop is mandatory.')
    },
    computed: {
        // Return name of axis
        id () {
            return this.$options.name
        },
        // Return and check if axis it is xAxis
        isX () {
            return this.$options.axis === 'x'
        },
        // Return and check if axis it is yAxis
        isY () {
            return this.$options.axis === 'y'
        },
        // Return text-anchor of ticks
        textAnchor () {
            return this.isX ? 'middle' : 'end'
        },
        // Generate ticks array
        ticks () {
            const {
                data, canvas, bounds, xBounds, padding, yScale, xScale, scatter,
            } = this.Chart

            // Return a empty array if we don't have any data
            if (!data || data.length === 0 || this.numTicks === 0) {
                return []
            }

            // If xAxis
            if (this.isX) {
                // If is scatter, x axis is non categorical
                if (scatter) {
                    // Generate array tick by d3, https://github.com/d3/d3-array
                    const getTicksFn = this.numTicks ? genExactNbTicks : genTicks
                    const ticks = getTicksFn(xBounds.min, xBounds.max, this.numTicks).reverse()
                    // Generate ticks objects by ticksNum or data of parents
                    return ticks.map((value, index) => {
                        // Calc size between ticks with scale parent
                        const x = xScale(value)
                        return {
                            mark: {
                                index,
                                x1: x,
                                y1: canvas.y1,
                                x2: x,
                                y2: canvas.y1 + 5,
                            },
                            text: {
                                index,
                                value: this.format(value),
                                x: x + this.tickStylesCmp.fontSize / 3,
                                y: canvas.y1 + this.textOffset,
                            },
                        }
                    })
                }
                // Calc offset
                const offset = padding[1] + padding[3]
                // Calc space
                const space = (canvas.width - offset) / Math.max(data.length - 1, 1)
                // Generate ticks objects by data of parents
                return data.map((props, index) => {
                    // Calc proportional size between ticks
                    const x = canvas.x0 + space * (data.length === 1 ? 0.5 : index) + padding[3]
                    const value = ['string', 'number'].includes(typeof props[this.datakey]) ? props[this.datakey] : index
                    return {
                        mark: {
                            index,
                            x1: x,
                            y1: canvas.y1,
                            x2: x,
                            y2: canvas.y1 + 5,
                        },
                        text: {
                            index,
                            value,
                            x,
                            y: canvas.y1 + this.textOffset,
                        },
                    }
                })
            }

            // Generate array tick by d3, https://github.com/d3/d3-array
            const getTicksFn = this.numTicks ? genExactNbTicks : genTicks
            const ticks = getTicksFn(bounds.min, bounds.max, this.numTicks).reverse()
            // Added 0 tick if has nevagative bound.min and hideNegativeAxis it is false
            if (bounds.min < 0 && !ticks.includes(0) && !this.hideNegativeAxis) ticks.push(0)
            // Generate ticks objects by ticksNum or data of parents
            return ticks.map((value, index) => {
                // Calc size between ticks with scale parent
                const y = yScale(value)
                return {
                    mark: {
                        index,
                        x1: canvas.x0 - 5,
                        y1: y,
                        x2: canvas.x0,
                        y2: y,
                    },
                    text: {
                        index,
                        value: this.format(value),
                        x: canvas.x0 - this.textOffset,
                        y: y + this.tickStylesCmp.fontSize / 3,
                    },
                }
            })
        },
        // Return y2 point
        x1 () {
            return this.Chart.canvas.x0
        },
        // Return y1 point
        y1 () {
            return this.isX ? this.Chart.canvas.y1 : this.Chart.canvas.y0
        },
        // Return x2 point
        x2 () {
            return this.isX ? this.Chart.canvas.x1 : this.Chart.canvas.x0
        },
        // Return y2 point
        y2 () {
            return this.Chart.canvas.y1
        },
        // Return label config
        labelsLength () {
            return (Array.isArray(this.label) ? this.label : [this.label]).length
        },
        labels () {
            const { label = [], labelAlign: textAnchor } = this
            const value = this.labelsLength > 1 ? label : [label]
            // Get setting of label
            const { x, y, transform } = (this.isX ? this.getLabelXAxis : this.getLabelYAxis)(textAnchor)

            return {
                x,
                y,
                transform,
                textAnchor,
                value,
            }
        },
        // Generate styles of axis
        axisStylesCmp () {
            return {
                ...this.themeStyles.styles,
                ...this.axisStyles,
            }
        },
        // Generate styles of tick
        markStylesCmp () {
            return {
                ...this.themeStyles.mark,
                ...this.markStyles,
            }
        },
        // Generate styles of text
        tickStylesCmp () {
            return {
                ...this.themeStyles.tick,
                ...this.tickStyles,
            }
        },
        // Generate styles of label
        labelStylesCmp () {
            return {
                fontSize: `${this.labelSize}px`,
                ...this.themeStyles.label,
                ...this.labelStyles,
            }
        },
    },
    watch: {
        // Set num ticks in axis setiings chart
        ticks: {
            handler (ticks) {
                const axis = this.isX ? 'x' : 'y'
                const numTicks = (ticks || []).length
                this.Chart.setAxisOptions({ [axis]: { numTicks } })
            },
            immediate: true,
        },
    },
    methods: {
        // Return coords of the label xAxis by align
        getLabelXAxis (align) {
            const pos = {
                start: this.Chart.canvas.x0,
                middle: (this.Chart.canvas.x1 - this.Chart.canvas.x0) / 2 + this.Chart.canvas.x0,
                end: this.Chart.canvas.x1,
            }
            // AxisPos + labelSize + halfSpaceBottom + (labelSize * labelLines)
            const y = (this.Chart.canvas.y1 + this.labelSize + (this.Chart.spaceObjects[2] / 2)) - (this.labelSize * (this.labelsLength / 2))
            const x = pos[align]

            return { x, y }
        },
        // Return coords and transform, of the label yAxis by align
        // Note: Use the <svg></svg> tag in slot, because solve the align vertical of text
        getLabelYAxis (align) {
            const pos = {
                start: this.Chart.canvas.y1,
                middle: (this.Chart.canvas.y1 - this.Chart.canvas.y0) / 2 + this.Chart.canvas.y0,
                end: this.Chart.canvas.y0,
            }
            // AxisPos - labelSize - halfSpaceLeft - (labelSize * labelLines)
            const x = this.Chart.canvas.x0 - this.labelSize - (this.Chart.spaceObjects[3] / 2) - (this.labelSize * (this.labelsLength / 2))
            const y = pos[align]

            return { x, y, transform: `rotate(-90 ${x} ${y})` }
        },
    },
}
