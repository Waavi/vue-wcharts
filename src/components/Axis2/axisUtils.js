import scaleLinear from 'd3-scale/src/linear'
import { tickStep as d3TickStep } from 'd3-array'
import lodashRange from 'lodash/range'

export function getFlattenDataset ({ dataset, datakeys }) {
    const data = []
    if (datakeys) {
        Object.values(datakeys).forEach(({ series, datakey }) => {
            const datums = series ? dataset[series] : dataset
            datums.forEach((datum) => {
                data.push(datum[datakey])
            })
        })
    }
    return data
}

export function obtainCategories ({ dataset, datakeys, allowDuplicatedCategory }) {
    const data = getFlattenDataset({ dataset, datakeys })
    return allowDuplicatedCategory ? data : Array.from(new Set(data))
}

export function obtainNumericDataDomain ({ dataset, datakeys }) {
    const data = getFlattenDataset({ dataset, datakeys })
    return data.length > 0 ? [Math.min(...data), Math.max(...data)] : [0, 1]
}

export function obtainNumericActualDomain ({ dataDomain, propDomain }) {
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
    if (exactNumTicks) {
        return (domain[0] - domain[1]) / exactNumTicks
    }
    return d3TickStep(domain[0], domain[1], numTicks)
}

export function obtainNumericActualBounds ({ domain, step, propBounds }) {
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
    return scaleLinear().domain(reversed ? [...bounds].reverse() : bounds).range(range)
}

export function obtainCategoricalScale ({ categories, range, reversed }) {
    const bounds = [0, categories.length - 1]
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
    if (ticks) return ticks
    return lodashRange(bounds[0], bounds[1] + 10e-6, step)
}

export function obtainCategoricalActualTicks ({ ticks, categories }) {
    return ticks || categories
}
