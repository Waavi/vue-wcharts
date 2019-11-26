/* eslint-disable prefer-destructuring */
import { getPercentValue } from '../utils/mathsPie'

/**
 * Generate an "Unique Id" for the component within the chart
 */

export function generateUid (options, props) {
    const { type, name } = options || {}
    const { id, uid } = props || {}
    if (uid) return uid
    // const random = Math.round(Math.random() * 10000)
    return [type, name, id].filter(x => x)./* concat(random). */join('-')
}

/**
 * Gets the layout for an outer element
 * @param {Object} obj object with parameters.
 * @param {string} obj.position "top", "left", "right", "bottom".
 * @param {Object} obj.element element information.
 * @param {number} obj.element.distanceFromCanvas distance from canvas.
 * @param {string} [obj.element.reference="canvas"] "canvas" or "view-box". Determines the layout's boundings for this component
 * @param {number} [obj.element.left] left (take "reference" into account).
 * @param {number} [obj.element.width] width (take "reference" into account).
 * @param {number} [obj.element.right] right (take "reference" into account).
 * @param {number} [obj.element.top] top (take "reference" into account).
 * @param {number} [obj.element.height] height (take "reference" into account).
 * @param {number} [obj.element.bottom] bottom (take "reference" into account).
 * @param {Object} obj.canvas canvas layout.
 * @param {number} obj.canvas.left canvas' left value.
 * @param {number} obj.canvas.width canvas' width value.
 * @param {number} obj.canvas.right canvas' right value.
 * @param {number} obj.canvas.top canvas' top value.
 * @param {number} obj.canvas.height canvas' height value.
 * @param {number} obj.canvas.bottom canvas' bottom value.
 * @param {Object} obj.viewBox viewBox layout.
 * @param {number} obj.viewBox.width viewBox's width value.
 * @param {number} obj.viewBox.height viewBox's height value.
 */
export function getOuterElementLayout ({
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

/**
 *
*/
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
