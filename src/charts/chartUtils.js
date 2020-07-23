/* eslint-disable prefer-destructuring */
import VueTypes from 'vue-types'
import clamp from 'lodash.clamp'
// import debounce from 'lodash.debounce'
import { max } from '../utils/maths'
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
]).optional

function marginStartEndVueTypeFactory (startName = 'start', endName = 'end') {
    return VueTypes.oneOfType([
        VueTypes.number,
        VueTypes.arrayOf(VueTypes.number),
        VueTypes.shape({
            [startName]: VueTypes.number,
            [endName]: VueTypes.number,
        }),
    ]).optional
}
export const marginStartEndVueType = marginStartEndVueTypeFactory()
export const marginHorizontalVueType = marginStartEndVueTypeFactory('left', 'right')
export const marginVerticalVueType = marginStartEndVueTypeFactory('top', 'bottom')
export const paddingStartEndVueType = marginStartEndVueType
export const paddingHorizontalVueType = marginHorizontalVueType
export const paddingVerticalVueType = marginVerticalVueType

function paddingBandVueTypeFactory (startName = 'start', innerName = 'inner', endName = 'end') {
    return VueTypes.oneOfType([
        VueTypes.number,
        VueTypes.arrayOf(VueTypes.number),
        VueTypes.shape({
            [startName]: VueTypes.number,
            [innerName]: VueTypes.number,
            [endName]: VueTypes.number,
        }),
    ]).optional
}
export const paddingBandVueType = paddingBandVueTypeFactory()
export const paddingHorizontalBandVueType = paddingBandVueTypeFactory('left', 'right')
export const paddingVerticalBandVueType = paddingBandVueTypeFactory('top', 'bottom')

/** ***********************************
 * Margin and padding normalizations
************************************ */

function firstDefined (...items) {
    return items.find(n => n !== undefined)
}
function positive (number) {
    return max(number, 0)
}

/**
 * Normalizes a margin (or padding)
 */
export function normalizeMargin (margin) {
    let top = 0
    let right = 0
    let bottom = 0
    let left = 0
    if (Array.isArray(margin)) {
        top = firstDefined(margin[0], 0)
        right = firstDefined(margin[1], 0)
        bottom = firstDefined(margin[2], margin[0], 0)
        left = firstDefined(margin[3], margin[1], 0)
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
        top: positive(top),
        right: positive(right),
        bottom: positive(bottom),
        left: positive(left),
    }
}

/**
 * Normalizes a "start-end" margin (or padding)
 */
export function normalizeMarginStartEnd (margin, startName = 'start', endName = 'end') {
    let start = 0
    let end = 0
    if (Array.isArray(margin)) {
        start = firstDefined(margin[0], 0)
        end = firstDefined(margin[1], margin[0], 0)
    } else if (typeof margin === 'object') {
        start = margin[startName] || 0
        end = margin[endName] || 0
    } else if (typeof margin === 'number') {
        start = margin
        end = margin
    }
    return {
        [startName]: positive(start),
        [endName]: positive(end),
    }
}
export const normalizePaddingStartEnd = normalizeMarginStartEnd

const DEFAULT_INNER_BAND_PADDING = 0.2
const DEFAULT_INNER_POINT_PADDING = 1

export function normalizePaddingBand (margin, startName = 'start', innerName = 'inner', endName = 'end') {
    let start = 0
    let inner = 0
    let end = 0
    if (typeof margin === 'string') {
        const [type, align] = margin.split(':')
        if (type === 'band') {
            inner = DEFAULT_INNER_BAND_PADDING
        } else if (type === 'point') {
            inner = DEFAULT_INNER_POINT_PADDING
        } else {
            const innerNumber = Number(type)
            inner = clamp(Number.isNaN(innerNumber) ? DEFAULT_INNER_BAND_PADDING : innerNumber, 0, 1)
        }
        if (align === 'center') {
            start = 0.5
            end = 0.5
        } else if (align === 'start') {
            start = 0
            end = 1
        } else if (align === 'end') {
            start = 1
            end = 0
        } else if (align) {
            const alignNumber = Number(align)
            const alpha = clamp(Number.isNaN(alignNumber) ? 0.5 : alignNumber, 0, 1)
            start = alpha
            end = 1 - start
        }
    } else if (Array.isArray(margin)) {
        start = firstDefined(margin[0], 0)
        inner = (margin.length === 3 && margin[1]) || DEFAULT_INNER_BAND_PADDING
        end = firstDefined(margin[2], margin[1], margin[0], 0)
    } else if (typeof margin === 'object') {
        start = margin[startName] || 0
        inner = margin[innerName] || DEFAULT_INNER_BAND_PADDING
        end = margin[endName] || 0
    } else if (typeof margin === 'number') {
        start = margin
        inner = margin
        end = margin
    } else {
        inner = DEFAULT_INNER_BAND_PADDING
    }
    return {
        [startName]: positive(start),
        [innerName]: positive(inner),
        [endName]: positive(end),
    }
}

/**
 * Normalizes a horizontal margin (or padding)
 */
export function normalizeMarginHorizontal (margin) {
    return normalizeMarginStartEnd(margin, 'left', 'right')
}
export function normalizePaddingHorizontal (margin) {
    return normalizePaddingBand(margin, 'left', 'inner', 'right')
}

/**
 * Normalizes a vertical margin (or padding)
 */
export function normalizeMarginVertical (margin) {
    return normalizeMarginStartEnd(margin, 'top', 'bottom')
}
export function normalizePaddingVertical (margin) {
    return normalizePaddingBand(margin, 'top', 'inner', 'bottom')
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
 * Gets the axisId
********************************************** */

export function uniqueAxesBy (axes, field) {
    const fieldValues = Array.from(new Set(axes.map(axis => axis[field]).filter(value => typeof value === 'string')))
    return fieldValues.reduce(
        (acc, fieldValue) => {
            const axesWithFieldValue = axes.filter(axis => axis[field] === fieldValue)
            return axesWithFieldValue.length === 1 ? { ...acc, [fieldValue]: axesWithFieldValue[0].axisId } : acc
        },
        {}
    )
}

/** *********************************************
 * Enqueue register utilities for performance
********************************************** */

/** TODO: COMMENT THIS! */
export function enqueueRegisterUpdateFactory (needsToBeUpdated, onFlush, wait = 50, id) {
    return (key, value) => {
        if (value === undefined || needsToBeUpdated(key, value)) {
            onFlush([{ key, value }])
        }
    }
    // let queue = []
    // const debouncedFlush = debounce(() => {
    //     // console.log('flushing ', id)
    //     onFlush(queue)
    //     queue = []
    // }, wait)
    // return (key, value) => {
    //     // console.log('enqueue ', id)
    //     const indexWithinQueue = queue.findIndex(item => item.key === key) !== undefined
    //     if (indexWithinQueue >= 0) {
    //         delete queue[key]
    //     }
    //     if (indexWithinQueue >= 0 || value === undefined || needsToBeUpdated(key, value)) {
    //         queue.push({ key, value })
    //     }
    //     debouncedFlush()
    // }
}
