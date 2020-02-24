/** *********************************************
 * Mathematical calculation for axes
********************************************** */

import scaleLinear from 'd3-scale/src/linear'
import { tickStep as d3TickStep } from 'd3-array'
import lodashRange from 'lodash/range'
import uniqWidth from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
import castArray from 'lodash/castArray'
import { getDatums, datakeyValue } from '../../utils'

// Obtain an array of categories for this axis
export function obtainCategories ({ dataset, datakeys, allowDuplicatedCategory }) {
    const values = []
    if (datakeys) {
        uniqWidth(Object.values(datakeys), isEqual).forEach(({ series, datakey }) => {
            const datums = getDatums({ dataset, series })
            datums.forEach((datum) => {
                const value = datakeyValue(datum, datakey)
                values.push(...castArray(value))
            })
        })
    }
    return allowDuplicatedCategory ? values : Array.from(new Set(values))
}

/**
 * Obtains the data domain for a value
 * @param {number|number[]|Object.<string,number>} value can be a single number, an array of numbers or an object of numbers
 * @returns {number[]} [min, max]
 */
export function obtainNumericDataDomainFromValue (value) {
    if (value === undefined) return undefined
    if (typeof value === 'number') return [value, value]
    const valuesArray = Array.isArray(value) ? value : Object.values(value)
    return [Math.min(...valuesArray), Math.max(...valuesArray)]
}
export function obtainNumericDataDomainFromDatakey ({ dataset, series, datakey }) {
    const datums = getDatums({ dataset, series })
    if (datums.length > 0) {
        let overallMin = Infinity
        let overallMax = -Infinity
        datums.forEach((datum) => {
            const value = datakeyValue(datum, datakey)
            const [currentMin, currentMax] = obtainNumericDataDomainFromValue(value)
            overallMin = Math.min(overallMin, currentMin)
            overallMax = Math.max(overallMax, currentMax)
        })
        return [overallMin, overallMax]
    }
    return [0, 1]
}

export function obtainNumericGlobalDataDomain ({ dataDomainByElement }) {
    const domains = Object.values(dataDomainByElement || {})
    if (domains.length === 0) return undefined
    return domains.length > 0 ? [Math.min(...domains.map(d => d[0])), Math.max(...domains.map(d => d[1]))] : [0, 1]
}

export function obtainNumericActualDomain ({ dataDomain, propDomain }) {
    if (!dataDomain) return undefined
    const [dataMin = 0, dataMax = 0] = Array.isArray(dataDomain) ? dataDomain : []
    const [propMin = undefined, propMax = undefined] = Array.isArray(propDomain) ? propDomain : []
    return [adjustedValue(dataMin, propMin), adjustedValue(dataMax, propMax)]
}
function adjustedValue (value, adjustedValueOrFunction) {
    if (typeof adjustedValueOrFunction === 'number') return adjustedValueOrFunction
    if (typeof adjustedValueOrFunction === 'function') return adjustedValueOrFunction(value)
    return value
}

export function obtainNumericStep ({ domain, numTicks, exactNumTicks }) {
    if (!domain) return undefined
    if (exactNumTicks) {
        return (domain[0] - domain[1]) / exactNumTicks
    }
    return d3TickStep(domain[0], domain[1], numTicks)
}

export function obtainNumericActualBounds ({ domain, step, propBounds }) {
    if (!domain) return undefined
    const [domainMin = 0, domainMax = 0] = Array.isArray(domain) ? domain : []
    const [propMin = undefined, propMax = undefined] = Array.isArray(propBounds) ? propBounds : []
    const boundMin = Math.floor(domainMin / step) * step
    const boundMax = Math.ceil(domainMax / step) * step
    const min = adjustedValue(boundMin, propMin)
    const max = adjustedValue(boundMax, propMax)
    if (min === max) {
        if (min === 0) return [0, 1]
        if (min < 0) return [-2 * min, 0]
        return [0, 2 * max]
    }
    return [min, max]
}

export function obtainNumericScale ({ bounds, range, reversed }) {
    if (!bounds) return undefined
    return scaleLinear().domain(reversed ? [...bounds].reverse() : bounds).range(range)
}

export function obtainCategoricalScale ({
    categories, range, reversed, padding = 0.5,
}) {
    if (!categories || !range) return undefined
    const bounds = [-padding, categories.length - 1 + padding]
    const numericScale = obtainNumericScale({
        bounds,
        range,
        reversed,
    })
    return x => numericScale(categories.indexOf(x))
}

export function obtainNumericActualTicks ({
    ticks,
    bounds,
    step,
}) {
    if (!bounds || !step) return []
    if (ticks) return ticks
    return lodashRange(bounds[0], bounds[1] + 10e-6, step)
}

export function obtainCategoricalActualTicks ({ ticks, categories }) {
    return ticks || categories
}
