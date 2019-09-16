<template>
    <g>
        <line
            v-for="(line, index) in lines"
            :key="`gridLine${index}`"
            :style="stylesCmp"
            v-bind="line"
        />
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import themeMixin from '../../mixins/theme'
import { genTicks, genExactNbTicks } from '../../utils/maths'

export default {
    name: 'WCartesianGrid',
    type: 'grid',
    inject: ['Chart'],
    mixins: [themeMixin],
    props: {
        hideH: VueTypes.bool.def(false),
        hideV: VueTypes.bool.def(false),
        numLinesH: VueTypes.number,
        numLinesV: VueTypes.number,
        styles: VueTypes.shape({
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            strokeDasharray: VueTypes.oneOfType([String, Number]),
        }),
    },
    computed: {
        hNum () {
            return this.numLinesH || this.Chart.axis.y.numTicks
        },
        vNum () {
            return this.numLinesV || this.Chart.axis.x.numTicks
        },
        hLines () {
            const {
                data, canvas, bounds, yScale,
            } = this.Chart
            // Return a empty array if we don't want to show horizontal lines
            if (this.hideH || !data || data.length === 0) return []
            // Calculate number of lines to paint
            const numLines = this.hNum
            // Select the correct function and generate the value of the lines. ex: [100, 500, 1500, 2500, 5000]
            const getLinesFn = this.hNum ? genExactNbTicks : genTicks
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
            const {
                data, canvas, padding, xBounds, xScale, scatter,
            } = this.Chart
            // Return a empty array if we don't want to show vertical lines
            if (this.hideV || !data || data.length === 0) return []
            // Calculate number of lines to generate
            const numLines = this.vNum
            if (scatter) {
                // Select the correct function and generate the value of the lines. ex: [100, 500, 1500, 2500, 5000]
                const getLinesFn = this.vNum ? genExactNbTicks : genTicks
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
            const space = (canvas.width - offset) / (numLines <= 1 ? 0.5 : (numLines - 1))
            // Generate lines coordinates

            return Array.from({ length: numLines }).map((props, index) => {
                // X position is calculated taking x0 canvas position adding space between lines times index (0...numLines-1) and adding left space
                const x = canvas.x1 - (space * index) - padding[3]
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
        // Styles
        stylesCmp () {
            return {
                ...this.themeStyles.styles,
                ...this.styles,
            }
        },
    },
}
</script>
