
import VueTypes from 'vue-types'
import { Maths } from '../utils'
import TickText from '../components/Axis/TickText.vue'

const axisStylesDefaultProp = {
    stroke: '#999',
}

const markStylesDefaultProp = {
    stroke: '#999',
}

const labelStylesDefaultProp = {
    stroke: 'none',
    fill: '#999',
    fontSize: 12,
}

export default {
    type: 'axis',
    inject: ['Cartesian'],
    components: {
        TickText,
    },
    props: {
        datakey: VueTypes.string,
        space: VueTypes.arrayOf(VueTypes.number).def([0, 20, 24, 20]),
        textOffsetY: VueTypes.number.def(20),
        hideLine: VueTypes.bool.def(false),
        hideTickMark: VueTypes.bool.def(false),
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
        labelStyles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            fontSize: VueTypes.oneOfType([String, Number]),
        }).def(() => ({
            ...labelStylesDefaultProp,
        })),
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
                dataset, canvas, bounds, padding,
            } = this.Cartesian
            const num = this.ticksNum || dataset.length
            const ticks = Maths.genTicks(bounds.min, bounds.max, num).reverse()
            const offset = (padding[0] + padding[2])
            const space = (canvas.height - offset) / (ticks.length - 1)

            return ticks.map((value, index) => {
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
                        value,
                        x: canvas.x0 - this.textOffsetY,
                        y: y + this.labelStylesCmp.fontSize / 3,
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
        labelStylesCmp () {
            return {
                ...labelStylesDefaultProp,
                ...this.labelStyles,
            }
        },
    },
}
