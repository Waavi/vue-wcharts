
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

const spaceLabelX = [0, 50, 50, 50]
const spaceLabelY = [50, 0, 0, 80]

export default {
    type: 'axis',
    inject: ['Cartesian'],
    components: {
        TickText,
    },
    props: {
        // Settings
        datakey: VueTypes.string,
        textOffsetY: VueTypes.number.def(20),
        hideLine: VueTypes.bool.def(false),
        hideTickMark: VueTypes.bool.def(false),
        numTicks: VueTypes.number.def(0),
        format: VueTypes.func.def(value => value),
        // Label
        labelText: VueTypes.string,
        labelSize: VueTypes.number.def(12),
        // Style
        axisStyles: VueTypes.shape({
            stroke: VueTypes.string,
        }).def(() => ({
            ...axisStylesDefaultProp,
        })),
        markStyles: VueTypes.shape({
            stroke: VueTypes.string,
        }).def(() => ({
            ...axisStylesDefaultProp,
        })),
        labelStyles: VueTypes.object,
        tickStyles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            fontSize: VueTypes.oneOfType([String, Number]),
        }).def(() => ({
            ...tickStylesDefaultProp,
        })),
    },
    preload ({ parent, props, index }) {
        const { space, labelText } = props
        // Check type axi
        const isX = this.axis === 'x'
        // Get spaces binding or default
        let spaces = space || this.props.space.default()
        // Set default space if has labelText and not space value
        if (!space && labelText) {
            spaces = isX ? spaceLabelX : spaceLabelY
        }
        // Added spaces of parent
        parent.addSpaceObjects(spaces)
    },
    mounted () {
        // Show warn if used the label slot, the space prop it is mandatory
        if (this.$scopedSlots.label) console.warn('Remember, If you use the label slot, the space prop is mandatory.')
    },
    computed: {
        isX () {
            return this.$options.axis === 'x'
        },
        id () {
            return this.$options.name
        },
        ticks () {
            const {
                dataset, canvas, bounds, padding,
            } = this.Cartesian

            // If xAxis
            if (this.isX) {
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
            const numTicks = this.ticksNum || dataset.length
            // Generate array tick by d3, https://github.com/d3/d3-array
            const getTicksFn = this.numTicks ? genExactNbTicks : genTicks
            const ticks = getTicksFn(bounds.min, bounds.max, numTicks).reverse()
            // Calc offset
            const offset = (padding[0] + padding[2])
            // Calc space
            const space = (canvas.height - offset) / (ticks.length - 1)
            // Generate ticks objects by ticksNum or dataset of parents
            return ticks.map((value, index) => {
                // Calc size between ticks with scale parent
                const y = canvas.y0 + (space * index) + padding[2]
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
            return this.Cartesian.canvas.x0
        },
        // Return y1 point
        y1 () {
            return this.isX ? this.Cartesian.canvas.y1 : this.Cartesian.canvas.y0
        },
        // Return x2 point
        x2 () {
            return this.isX ? this.Cartesian.canvas.x1 : this.Cartesian.canvas.x0
        },
        // Return y2 point
        y2 () {
            return this.Cartesian.canvas.y1
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
        // Generate styles of axi
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
                start: this.Cartesian.canvas.x0,
                middle: (this.Cartesian.canvas.x1 - this.Cartesian.canvas.x0) / 2 + this.Cartesian.canvas.x0,
                end: this.Cartesian.canvas.x1,
            }
            const y = this.Cartesian.canvas.y1 + (this.Cartesian.spaceObjects[2] / 2 + this.textOffsetY)
            const x = pos[align]

            return { x, y }
        },
        // Return coords and transform, of the label yAxis by align
        getLabelYAxis (align) {
            const pos = {
                start: this.Cartesian.canvas.y1,
                middle: (this.Cartesian.canvas.y1 - this.Cartesian.canvas.y0) / 2 + this.Cartesian.canvas.y0,
                end: this.Cartesian.canvas.y0,
            }
            const x = this.Cartesian.canvas.x0 - (this.Cartesian.spaceObjects[3] / 2 + this.textOffsetY)
            const y = pos[align]

            return { x, y, transform: `rotate(-90 ${x} ${y})` }
        },
    },
}
