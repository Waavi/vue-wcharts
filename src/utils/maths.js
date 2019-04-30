/* eslint-disable */
import { tickStep } from 'd3-array/src/ticks'

/**
 * Positive
 */
export function positive (value) {
    return value >= 0 ? value : 0
}

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
    const ticks = [min]
    let acc = min

    for (let i = 1; i < count - 1; i++) {
        acc += step
        ticks.push(parseInt(acc))
    }

    ticks.push(max)

    return ticks
}

export default {
    genTicks,
    genExactNbTicks,
    positive
}
