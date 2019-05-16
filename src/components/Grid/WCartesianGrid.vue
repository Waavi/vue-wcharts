<template>
    <g>
        <line
            v-for="(line, index) in lines"
            :key="`gridLine${index}`"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            :stroke="stylesCmp.stroke"
            :stroke-width="stylesCmp.strokeWidth"
            :stroke-dasharray="stylesCmp.strokeDasharray"
            fill="none"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import { genTicks, genExactNbTicks } from '../../utils/maths'

const stylesDefaultProp = {
    stroke: '#ccc',
    strokeWidth: 1,
    strokeDasharray: '3',
}

export default {
    name: 'WCartesianGrid',
    type: 'cartesian',
    inject: ['Chart'],
    props: {
        hideH: VueTypes.bool.def(false),
        hideV: VueTypes.bool.def(false),
        numLinesH: VueTypes.number.def(0),
        numLinesV: VueTypes.number.def(0),
        styles: VueTypes.shape({
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            strokeDasharray: VueTypes.oneOfType([String, Number]),
        }).def(() => ({
            ...stylesDefaultProp,
        })),
    },
    computed: {
        stylesCmp () {
            return {
                ...stylesDefaultProp,
                ...this.styles,
            }
        },
        hLines () {
            // Return a empty array if we don't want to show horizontal lines
            if (this.hideH) return []
            const {
                dataset, canvas, bounds, yScale,
            } = this.Chart
            // Calculate number of lines to paint
            const numLines = this.numLinesH || dataset.length
            // Select the correct function and generate the value of the lines. ex: [100, 500, 1500, 2500, 5000]
            const getLinesFn = this.numLinesH ? genExactNbTicks : genTicks
            const lines = getLinesFn(bounds.min, bounds.max, numLines).reverse()
            // Generate lines coordinates
            return lines.map((value, index) => {
                const y = yScale(value)
                return {
                    x1: canvas.x0,
                    y1: y,
                    x2: canvas.x1,
                    y2: y,
                }
            })
        },
        vLines () {
            // Return a empty array if we don't want to show vertical lines
            if (this.hideV) return []
            const {
                dataset, canvas, padding, xBounds, xScale, scatter,
            } = this.Chart
            // Calculate number of lines to generate
            const numLines = this.numLinesV || dataset.length
            if (scatter) {
                // Select the correct function and generate the value of the lines. ex: [100, 500, 1500, 2500, 5000]
                const getLinesFn = this.numLinesH ? genExactNbTicks : genTicks
                const lines = getLinesFn(xBounds.min, xBounds.max, numLines).reverse()
                // Generate lines coordinates
                return lines.map((value, index) => {
                    const x = xScale(value)
                    return {
                        x1: x,
                        y1: canvas.y0,
                        x2: x,
                        y2: canvas.y1,
                    }
                })
            }
            // Calculate left and right space
            const offset = padding[1] + padding[3]
            // Calculate space between lines
            const space = (canvas.width - offset) / (numLines - 1)
            // Generate lines coordinates

            return Array.from({ length: numLines }).map((props, index) => {
                // X position is calculated taking x0 canvas position adding space between lines times index (0...numLines-1) and adding left space
                const x = canvas.x0 + (space * index) + padding[3]
                return {
                    x1: x,
                    y1: canvas.y0,
                    x2: x,
                    y2: canvas.y1,
                }
            })
        },
        lines () {
            return [...this.hLines, ...this.vLines]
        },
    },
}
</script>
