/* eslint-disable */
import { tickStep } from 'd3-array/src/ticks'
import { isNumber } from './checks'

/**
 * Returns nick ticks
 */
export function genTicks (min, max, count) {
    if (max < min) {
        [min, max] = [max, min]
    }

    const step = tickStep(min, max, count)
    const first = Math.floor(min / step) * step
    const ticks = [first]
    let cur = first

    while (cur < max) {
        cur += step
        ticks.push(cur)
    }

    if (Math.abs(min - ticks[1]) < step) {
        ticks.shift()
        ticks[0] = min
    }

    if (Math.abs(max - ticks[ticks.length - 2]) < step) {
        ticks.pop()
        ticks[ticks.length - 1] = max
    }

    return ticks
}

export function genExactNbTicks (min, max, count) {
    const diff = max - min
    const step = diff / (count - 1)
    const ticks = []

    for (let i = 0; i < (count - 1); i++) {
        ticks.push(i * step)
    }

    ticks.push(max)

    return ticks
}

export function bound (data, type, key) {
    return Math[type](
        ...data.map(arr => Math[type](...arr.map(item => item[key]).filter(isNumber)))
    )
}

export default {
    genTicks,
    genExactNbTicks,
    bound
}
