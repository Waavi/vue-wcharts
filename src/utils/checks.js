export const isBoolean = val => typeof val === 'boolean'

export const isFunc = val => typeof val === 'function'

export const isNumber = val => typeof val === 'number'

export const isString = val => typeof val === 'string'

export const isObj = val => typeof val === 'object' && !Array.isArray(val)

export const isArray = val => Array.isArray(val)

export const isNil = val => val === null || val === undefined

// eslint-disable-next-line func-names
export const isNaN = Number.isNaN || function (value) {
    // eslint-disable-next-line no-self-compare
    return value !== value
}

export const isPercent = value => (
    isString(value) && value.indexOf('%') === value.length - 1
)

export function noNilInArray (arr) {
    return !arr.some(isNil)
}

export default {
    isBoolean,
    isFunc,
    isNumber,
    isString,
    isObj,
    isArray,
    isNaN,
    isPercent,
    isNil,
    noNilInArray,
}
