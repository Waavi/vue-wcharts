/* eslint-disable prefer-destructuring */
import VueTypes from 'vue-types'
// import debounce from 'lodash.debounce'
import { max, round } from '../utils/maths'
import { getPercentValue } from '../utils/mathsPie'

/** ***********************************
 * VueTypes utils
************************************ */

export const marginVueType = VueTypes.oneOfType([
    VueTypes.number,
    VueTypes.arrayOf(VueTypes.number),
    VueTypes.shape({
        top: VueTypes.number,
        right: VueTypes.number,
        bottom: VueTypes.number,
        left: VueTypes.number,
    }),
]).def(0)
export const marginHorizontalVueType = VueTypes.oneOfType([
    VueTypes.number,
    VueTypes.arrayOf(VueTypes.number),
    VueTypes.shape({
        right: VueTypes.number,
        left: VueTypes.number,
    }),
]).def(0)
export const marginVerticalVueType = VueTypes.oneOfType([
    VueTypes.number,
    VueTypes.arrayOf(VueTypes.number),
    VueTypes.shape({
        top: VueTypes.number,
        bottom: VueTypes.number,
    }),
]).def(0)

/** ***********************************
 * Margin and padding normalizations
************************************ */

/**
 * Normalizes a margin (or padding)
 */
export function normalizedMargin (margin) {
    let top = 0
    let right = 0
    let bottom = 0
    let left = 0
    if (Array.isArray(margin)) {
        top = margin[0] || 0
        right = margin[1] || 0
        bottom = margin[2] || margin[0] || 0
        left = margin[3] || margin[1] || 0
    } else if (typeof margin === 'object') {
        top = margin.top || 0
        right = margin.right || 0
        bottom = margin.bottom || 0
        left = margin.left || 0
    } else if (typeof margin === 'number') {
        top = margin
        right = margin
        bottom = margin
        left = margin
    }
    return {
        top: max(round(top), 0),
        right: max(round(right), 0),
        bottom: max(round(bottom), 0),
        left: max(round(left), 0),
    }
}

/**
 * Normalizes a horizontal margin (or padding)
 */
export function normalizedMarginHorizontal (margin) {
    let right = 0
    let left = 0
    if (Array.isArray(margin)) {
        right = margin[0] || 0
        left = margin[1] || margin[0] || 0
    } else if (typeof margin === 'object') {
        right = margin.right || 0
        left = margin.left || 0
    } else if (typeof margin === 'number') {
        right = margin
        left = margin
    }
    return {
        right: max(round(right), 0),
        left: max(round(left), 0),
    }
}

/**
 * Normalizes a vertical margin (or padding)
 */
export function normalizedMarginVertical (margin) {
    let top = 0
    let bottom = 0
    if (Array.isArray(margin)) {
        top = margin[0] || 0
        bottom = margin[1] || margin[0] || 0
    } else if (typeof margin === 'object') {
        top = margin.top || 0
        bottom = margin.bottom || 0
    } else if (typeof margin === 'number') {
        top = margin
        bottom = margin
    }
    return {
        top: max(round(top), 0),
        bottom: max(round(bottom), 0),
    }
}

/** ***********************************
 * Outer Elements' utils
************************************ */

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

function getSanitizedSides ({
    start, end, size, max: maxValue,
}) {
    let sanitizedStart = getPercentValue({ percent: start, totalValue: maxValue, defaultValue: null })
    let sanitizedEnd = getPercentValue({ percent: end, totalValue: maxValue, defaultValue: null })
    let sanitizedSize = getPercentValue({ percent: size, totalValue: maxValue, defaultValue: null })
    if (sanitizedStart !== null && sanitizedEnd !== null) {
        sanitizedSize = maxValue - sanitizedStart - sanitizedEnd
    } else if (sanitizedStart !== null && sanitizedSize !== null) {
        sanitizedEnd = maxValue - sanitizedStart - sanitizedSize
    } else if (sanitizedEnd !== null && sanitizedSize !== null) {
        sanitizedStart = maxValue - sanitizedEnd - sanitizedSize
    }
    return {
        start: sanitizedStart,
        end: sanitizedEnd,
        size: sanitizedSize,
    }
}

/** *********************************************
 * Enqueue register utilities for performance
********************************************** */

/** TODO: COMMENT THIS! */
export function enqueueRegisterUpdateFactory (onFlush, wait = 50, id) {
    return (key, value) => {
        onFlush([{ key, value }])
    }
    // let queue = []
    // const debouncedFlush = debounce(() => {
    //     // console.log('flushing ', id)
    //     onFlush(queue)
    //     queue = []
    // }, wait)
    // return (key, value) => {
    //     // console.log('enqueue ', id)
    //     if (queue.find(item => item.key === key)) {
    //         delete queue[key]
    //     }
    //     queue.push({ key, value })
    //     debouncedFlush()
    // }
}
