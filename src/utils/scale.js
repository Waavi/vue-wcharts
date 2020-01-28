/**
 * Get the scaled value of an array of them
 * @param {function} scale the scale function
 * @param {any|any[]} value the value or array of values to scale
 * @returns {number|number[]}
 */
export function scaledArray (scale, value) {
    return Array.isArray(value) ? value.map(v => scale(v)) : scale(value)
}
