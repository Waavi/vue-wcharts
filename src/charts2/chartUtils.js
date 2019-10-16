/* eslint-disable prefer-destructuring */
import { getPercentValue } from '../utils/mathsPie'

export function getElementLayout ({
    position,
    element,
    canvas,
    viewBox,
}) {
    let top
    let height
    let bottom
    let left
    let width
    let right

    if (position === 'top') {
        top = canvas.top - element.distanceFromCanvas - element.height
        bottom = canvas.bottom + canvas.height + element.distanceFromCanvas
    } else if (position === 'bottom') {
        top = canvas.top + canvas.height + element.distanceFromCanvas
        bottom = canvas.bottom - element.distanceFromCanvas - element.height
    } else if (position === 'left') {
        left = canvas.left - element.distanceFromCanvas - element.width
        right = canvas.right + canvas.width + element.distanceFromCanvas
    } else if (position === 'right') {
        left = canvas.left + canvas.width + element.distanceFromCanvas
        right = canvas.right - element.distanceFromCanvas - element.width
    }

    const withRefCanvas = element.reference === 'canvas'

    if (position === 'top' || position === 'bottom') {
        height = element.height
        const { start, end, size } = getSanitizedSides({
            start: element.left,
            end: element.right,
            size: element.width,
            max: withRefCanvas ? canvas.width : viewBox.width,
        })
        left = (withRefCanvas ? canvas.left : 0) + start
        width = size
        right = (withRefCanvas ? canvas.right : 0) + end
    } else if (position === 'left' || position === 'right') {
        width = element.width
        const { start, end, size } = getSanitizedSides({
            start: element.top,
            end: element.bottom,
            size: element.height,
            max: withRefCanvas ? canvas.height : viewBox.height,
        })
        top = (withRefCanvas ? canvas.top : 0) + start
        height = size
        bottom = (withRefCanvas ? canvas.bottom : 0) + end
    }

    return {
        ...element,
        top,
        height,
        bottom,
        left,
        width,
        right,
    }
}

function getSanitizedSides ({
    start, end, size, max,
}) {
    let sanitizedStart = getPercentValue({ percent: start, totalValue: max, defaultValue: null })
    let sanitizedEnd = getPercentValue({ percent: end, totalValue: max, defaultValue: null })
    let sanitizedSize = getPercentValue({ percent: size, totalValue: max, defaultValue: null })
    if (sanitizedStart !== null && sanitizedEnd !== null) {
        sanitizedSize = max - sanitizedStart - sanitizedEnd
    } else if (sanitizedStart !== null && sanitizedSize !== null) {
        sanitizedEnd = max - sanitizedStart - sanitizedSize
    } else if (sanitizedEnd !== null && sanitizedSize !== null) {
        sanitizedStart = max - sanitizedEnd - sanitizedSize
    }
    return {
        start: sanitizedStart,
        end: sanitizedEnd,
        size: sanitizedSize,
    }
}
