import d3Line from 'd3-shape/src/line'
import d3Transition from 'd3-transition/dist/d3-transition'
import { monotoneX as curveMonotoneX } from 'd3-shape/src/curve/monotone'

export function pathGenerator ({ xAccessor, yAccessor, curve }) {
    const genLine = d3Line().x(xAccessor).y(yAccessor)
    if (curve === false) return genLine
    const curveFn = typeof curve === 'function' ? curve : curveMonotoneX
    return genLine.curve(curveFn)
}

export function pathAnimateTo ({ pathRef, newPathValue, duration }) {
    d3Transition
        .select(pathRef)
        .transition()
        .duration(duration)
        .attr('d', newPathValue)
}
