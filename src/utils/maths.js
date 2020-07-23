/* eslint-disable */
import { tickStep } from 'd3-array/src/ticks'
import { isNumber } from './checks'
import clamp from 'lodash.clamp'

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
    if (max < min) {
        [min, max] = [max, min]
    }

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

export function bound (data, type, key) {
    if (!(data || []).length) return 0
    return Math[type](
        ...data.map(arr => Math[type](...arr.map(item => item[key]).filter(isNumber)))
    )
}

export function randomInt (limit = 1e6) {
    return  Math.floor(Math.random() * limit)
}

export const min = Math.min
export const max = Math.max
export const round = Math.round
export const floor = Math.floor
export const ceil = Math.ceil

export function polarToCartesian ({ radius, angle }) {
	return {
		x: radius * Math.sin(angle),
		y: radius * Math.cos(angle),
	}
}

export default {
	min,
	max,
	round,
	floor,
	ceil,
	clamp,
    genTicks,
    genExactNbTicks,
    bound,
	randomInt,
}
