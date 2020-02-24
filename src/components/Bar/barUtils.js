import clamp from 'lodash.clamp'

export function obtainBarWidth ({
    barWidthFromProp,
    constrainedWidth,
    DEFAULT_SLOT_WIDTH_WHEN_IS_CONSTRAINED = 0.6,
    DEFAULT_SLOT_WIDTH_WHEN_IS_NOT_CONSTRAINED = 20,
}) {
    const width =
        (barWidthFromProp > 1 && barWidthFromProp) ||
        (constrainedWidth && constrainedWidth * (barWidthFromProp || DEFAULT_SLOT_WIDTH_WHEN_IS_CONSTRAINED)) ||
        DEFAULT_SLOT_WIDTH_WHEN_IS_NOT_CONSTRAINED
    return clamp(width, 1, constrainedWidth || Infinity)
}

export function obtainRectBarLayoutGenerator ({
    barWidth, isHorizontal, valueAxisId, Chart,
}) {
    const reference = Chart.axisReferences[valueAxisId]
    const { canvas } = Chart
    if (isHorizontal) {
        const [boundMin, boundMax] = [canvas.left, canvas.left + canvas.width]
        return (x, y) => {
            const [x1, x2] = (Array.isArray(x) ? x : [reference, x]).map(n => clamp(n, boundMin, boundMax))
            const width = Math.abs(x1 - x2)
            return {
                x: Math.min(x1, x2),
                width,
                y: y - (barWidth / 2),
                height: barWidth,
            }
        }
    }
    const [boundMin, boundMax] = [canvas.top, canvas.top + canvas.height]
    return (x, y) => {
        const [y1, y2] = (Array.isArray(y) ? y : [reference, y]).map(n => clamp(n, boundMin, boundMax))
        const height = Math.abs(y1 - y2)
        return {
            x: x - (barWidth / 2),
            width: barWidth,
            y: Math.min(y1, y2),
            height,
        }
    }
}
