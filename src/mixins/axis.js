
import VueTypes from 'vue-types'
import { genTicks, genExactNbTicks } from '../utils/maths'
import TickText from '../components/Axis/TickText.vue'

const axisStylesDefaultProp = {
    stroke: '#999',
}

const markStylesDefaultProp = {
    stroke: '#999',
}

const labelStylesDefaultProp = {
    fill: '#999',
}

const tickStylesDefaultProp = {
    stroke: 'none',
    fill: '#999',
    fontSize: 12,
}

const spaceLabelX = [0, 50, 65, 50]
const spaceLabelY = [50, 0, 0, 80]

export default {
    type: 'axis',
    inject: ['Chart'],
    components: {
        TickText,
    },
    props: {
        // Settings
        name: VueTypes.string.def(''),
        datakey: VueTypes.string,
        textOffsetY: VueTypes.number.def(20),
        hideLine: VueTypes.bool.def(false),
        hideTickMark: VueTypes.bool.def(false),
        numTicks: VueTypes.number.def(0),
        format: VueTypes.func.def(value => value),
        // Label
        labelText: VueTypes.string,
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
            space, labelText, datakey, name,
        } = props
        // Check type axis
        const isX = this.axis === 'x'
        // Get spaces binding or default
        let spaces = space || this.props.space.default()
        // Set default space if has labelText and not space value
        if (!space && labelText) {
            spaces = isX ? spaceLabelX : spaceLabelY
        }
        // Added spaces of parent
        parent.addSpaceObjects(spaces)
        if (isX) {
            parent.axisXDatakey = datakey
            parent.axisXName = name || ''
        } else {
            parent.axisYDatakey = datakey
            parent.axisYName = name || ''
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
                dataset, canvas, bounds, xBounds, padding, yScale, xScale, scatter,
            } = this.Chart

            // If xAxis
            if (this.isX) {
                // If is scatter, x axis is non categorical
                if (scatter) {
                    // Ticks num
                    const numTicks = this.numTicks || dataset.length
                    // Generate array tick by d3, https://github.com/d3/d3-array
                    const getTicksFn = this.numTicks ? genExactNbTicks : genTicks
                    const ticks = getTicksFn(xBounds.min, xBounds.max, numTicks).reverse()
                    // Generate ticks objects by ticksNum or dataset of parents
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
                                y: canvas.y1 + this.textOffsetY,
                            },
                        }
                    })
                }
                // Calc offset
                const offset = padding[1] + padding[3]
                // Calc space
                const space = (canvas.width - offset) / (dataset.length - 1)
                // Generate ticks objects by dataset of parents
                return dataset.map((props, index) => {
                    // Calc proportional size between ticks
                    const x = canvas.x0 + (space * index) + padding[3]
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
                            value: props[this.datakey] || index,
                            x,
                            y: canvas.y1 + this.textOffsetY,
                        },
                    }
                })
            }

            // Ticks num
            const numTicks = this.numTicks || dataset.length
            // Generate array tick by d3, https://github.com/d3/d3-array
            const getTicksFn = this.numTicks ? genExactNbTicks : genTicks
            const ticks = getTicksFn(bounds.min, bounds.max, numTicks).reverse()
            // Added 0 tick if has nevagative bound.min and hideNegativeAxis it is false
            if (bounds.min < 0 && !ticks.includes(0) && !this.hideNegativeAxis) ticks.push(0)
            // Generate ticks objects by ticksNum or dataset of parents
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
                        x: canvas.x0 - this.textOffsetY,
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
        label () {
            const { labelTextAnchor: textAnchor, labelSize: fontSize } = this
            // Get setting of label
            const { x, y, transform } = (this.isX ? this.getLabelXAxis : this.getLabelYAxis)(textAnchor)

            return {
                x,
                y,
                transform,
                textAnchor,
                fontSize,
            }
        },
        // Generate styles of axis
        axisStylesCmp () {
            return {
                ...axisStylesDefaultProp,
                ...this.axisStyles,
            }
        },
        // Generate styles of tick
        markStylesCmp () {
            return {
                ...markStylesDefaultProp,
                ...this.markStyles,
            }
        },
        // Generate styles of text
        tickStylesCmp () {
            return {
                ...tickStylesDefaultProp,
                ...this.tickStyles,
            }
        },
        // Generate styles of label
        labelStylesCmp () {
            return {
                fontSize: this.labelSize,
                ...labelStylesDefaultProp,
                ...this.labelStyles,
            }
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
            const y = this.Chart.canvas.y1 + (this.Chart.spaceObjects[2] / 2 + this.textOffsetY)
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
            const x = this.Chart.canvas.x0 - (this.Chart.spaceObjects[3] / 2 + this.textOffsetY)
            const y = pos[align]

            return { x, y, transform: `rotate(-90 ${x} ${y})` }
        },
    },
}
