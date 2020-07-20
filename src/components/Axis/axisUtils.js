/** *********************************************
 * Mathematical calculation for axes
********************************************** */

import {
    extent, min as d3Min, max as d3Max,
} from 'd3-array'
import uniqWidth from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
import castArray from 'lodash/castArray'
import { getDatums, datakeyValue, datakeyAccessor } from '../../utils'

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
    if (value === undefined || value === null) return undefined
    if (typeof value === 'number') return [value, value]
    const valuesArray = Array.isArray(value) ? value : Object.values(value).filter(v => typeof v === 'number')
    return valuesArray.length > 0 ? extent(valuesArray) : undefined
}
export function obtainNumericDataDomainFromDatakey ({ dataset, series, datakey }) {
    const datums = getDatums({ dataset, series })
    return datums.length > 0 ? extent(datums, datakeyAccessor(datakey)) : [0, 1]
}

export function obtainNumericGlobalDataDomain ({ dataDomainByElement }) {
    const domains = Object.values(dataDomainByElement || {})
    if (domains.length === 0) return undefined
    return domains.length > 0 ? [d3Min(domains, d => d[0]), d3Max(domains, d => d[1])] : [0, 1]
}

export function obtainNumericActualDomain ({ dataDomain, propDomain }) {
    if (!dataDomain) return undefined
    const [dataMin = 0, dataMax = 0] = Array.isArray(dataDomain) ? dataDomain : []
    const [propMin = undefined, propMax = undefined] = Array.isArray(propDomain) ? propDomain : []
    return [adjustedValue(propMin)(dataMin), adjustedValue(propMax)(dataMax)]
}
function adjustedValue (adjustedValueOrFunction) {
    if (typeof adjustedValueOrFunction === 'function') return adjustedValueOrFunction
    if (adjustedValueOrFunction !== undefined) return () => adjustedValueOrFunction
    return value => value
}

export function obtainNumericActualBounds ({
    d3Scale, domain, propBounds, numTicks,
}) {
    if (!domain) return undefined
    const [domainMin = 0, domainMax = 0] = Array.isArray(domain) ? domain : []
    const [propMin = undefined, propMax = undefined] = Array.isArray(propBounds) ? propBounds : []
    const [boundMin, boundMax] = d3Scale.copy().domain([domainMin, domainMax]).nice(numTicks).domain()
    const min = adjustedValue(propMin)(boundMin, domainMin)
    const max = adjustedValue(propMax)(boundMax, domainMax)
    if (min === max) {
        if (min === 0) return [0, 1]
        if (min < 0) return [-2 * min, 0]
        return [0, 2 * max]
    }
    return [min, max]
}
