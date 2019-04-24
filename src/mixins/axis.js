
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
        datakey: VueTypes.string,
        textOffsetY: VueTypes.number.def(20),
        hideLine: VueTypes.bool.def(false),
        hideTickMark: VueTypes.bool.def(false),
        numTicks: VueTypes.number.def(0),
        format: VueTypes.func.def(value => value),
        labelText: VueTypes.string,
        labelSize: VueTypes.number.def(12),
        /** Styles */
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
        const isX = this.axis === 'x'
        let spaces = space || this.props.space.default()
        // Set default space with labelText
        if (!space && labelText) {
            spaces = isX ? spaceLabelX : spaceLabelY
        }

        parent.addSpaceObjects(spaces)
    },
    mounted () {
        if (this.$scopedSlots.label) console.warn('Remember, If you use the label slot, the space prop is mandatory.')
    },
    computed: {
        isX () {
            return this.$options.axis === 'x'
        },
        id () {
            return this.$options.name
        },
        textAnchor () {
            return this.isX ? 'middle' : 'end'
        },
        ticks () {
            if (this.isX) {
                const { dataset, canvas, padding } = this.Cartesian
                const offset = padding[1] + padding[3]
                const space = (canvas.width - offset) / (dataset.length - 1)
                return dataset.map((props, index) => {
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
            const {
                dataset, canvas, bounds, yScale,
            } = this.Cartesian
            const numTicks = this.numTicks || dataset.length
            const getTicksFn = this.numTicks ? genExactNbTicks : genTicks
            const ticks = getTicksFn(bounds.min, bounds.max, numTicks).reverse()

            return ticks.map((value, index) => {
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
        x1 () {
            return this.Cartesian.canvas.x0
        },
        y1 () {
            return this.isX ? this.Cartesian.canvas.y1 : this.Cartesian.canvas.y0
        },
        x2 () {
            return this.isX ? this.Cartesian.canvas.x1 : this.Cartesian.canvas.x0
        },
        y2 () {
            return this.Cartesian.canvas.y1
        },
        label () {
            return {
                x: this.labelX,
                y: this.labelY,
                textAnchor: this.labelAnchor,
                transform: this.labelTransform,
                fontSize: this.labelSize,
            }
        },
        labelX () {
            if (this.isX) return this.Cartesian.canvas.x1
            return this.Cartesian.canvas.x0 - (this.Cartesian.spaceObjects[3] / 2 + this.textOffsetY)
        },
        labelY () {
            if (this.isX) return this.Cartesian.canvas.y1 + (this.Cartesian.spaceObjects[2] / 2 + this.textOffsetY)
            return (this.Cartesian.canvas.y1 - this.Cartesian.canvas.y0) / 2 + this.Cartesian.canvas.y0
        },
        labelTransform () {
            if (!this.isX) return `rotate(-90 ${this.labelX} ${this.labelY})`
            return null
        },
        axisStylesCmp () {
            return {
                ...axisStylesDefaultProp,
                ...this.axisStyles,
            }
        },
        markStylesCmp () {
            return {
                ...markStylesDefaultProp,
                ...this.markStyles,
            }
        },
        tickStylesCmp () {
            return {
                ...tickStylesDefaultProp,
                ...this.tickStyles,
            }
        },
        labelStylesCmp () {
            return {
                fontSize: this.labelSize,
                ...labelStylesDefaultProp,
                ...this.labelStyles,
            }
        },
    },
}
