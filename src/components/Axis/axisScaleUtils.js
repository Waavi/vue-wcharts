/** *********************************************
 * Mathematical calculation for axes
********************************************** */
import clamp from 'lodash.clamp'
import { obtainNumericActualBounds } from './axisUtils'

export function obtainNumericScale ({
    d3Scale, dataDomain, propBounds, numTicks, range, rangePadding, reversed,
}) {
    if (!dataDomain) return undefined
    const bounds = obtainNumericActualBounds({
        d3Scale, domain: dataDomain, propBounds, numTicks,
    })
    const rangeIsReversed = range[0] > range[1]
    const willNeedToBeReversed = (reversed && !rangeIsReversed) || (!reversed && rangeIsReversed)
    let [rangeStart, rangeEnd] = rangeIsReversed ? [range[1], range[0]] : range
    const { start: prStart = 0, end: prEnd = 0 } = rangePadding || {}
    const paddingRangeStart = Math.max(prStart, 0)
    const paddingRangeEnd = Math.max(prEnd, 0)
    rangeStart += Math.min(paddingRangeStart, rangeEnd - rangeStart)
    rangeEnd -= Math.min(paddingRangeEnd, rangeEnd - rangeStart)
    const finalRange = willNeedToBeReversed ? [rangeEnd, rangeStart] : [rangeStart, rangeEnd]
    const scale = d3Scale
        .domain(bounds)
        .range(finalRange)
    scale.dataDomain = () => dataDomain
    scale.bounds = () => bounds
    return scale
}

export function obtainCategoricalScale ({
    categories, range, rangePadding, bandPadding, reversed,
}) {
    if (!categories) return undefined
    const categoriesCopy = [...categories]
    const rangeIsReversed = range[0] > range[1]
    const willNeedToBeReversed = (reversed && !rangeIsReversed) || (!reversed && rangeIsReversed)
    let [rangeStart, rangeEnd] = rangeIsReversed ? [range[1], range[0]] : range
    const { start: prStart = 0, end: prEnd = 0 } = rangePadding || {}
    const paddingRangeStart = Math.max(prStart, 0)
    const paddingRangeEnd = Math.max(prEnd, 0)
    rangeStart += Math.min(paddingRangeStart, rangeEnd - rangeStart)
    rangeEnd -= Math.min(paddingRangeEnd, rangeEnd - rangeStart)
    const finalRange = willNeedToBeReversed ? [rangeEnd, rangeStart] : [rangeStart, rangeEnd]

    const { start: bpStart = 0, inner: bpInner = 0, end: bpEnd = 0 } = bandPadding || {}
    const paddingBandStart = clamp(bpStart, 0, 1)
    const paddingBandInner = clamp(bpInner, 0, 1)
    const paddingBandEnd = clamp(bpEnd, 0, 1)
    const numCategories = categoriesCopy.length
    const step = (rangeEnd - rangeStart) / (numCategories + paddingBandStart + paddingBandEnd - paddingBandInner)
    const gap = paddingBandInner * step
    const bandwidth = step - gap
    const first = rangeStart + paddingBandStart * step + bandwidth / 2

    const bandCenters = categoriesCopy.map((_, index) => first + index * step)
    if (willNeedToBeReversed) {
        bandCenters.reverse()
    }
    const scale = x => bandCenters[categoriesCopy.indexOf(x)]
    scale.bandwidth = () => bandwidth
    scale.bandStep = () => step
    scale.bandGap = () => gap
    scale.bandCenters = () => bandCenters
    scale.domain = () => categoriesCopy
    scale.range = () => finalRange
    scale.invert = obtainCategoricalInvertFn(categoriesCopy, bandCenters, bandwidth)
    scale.ticks = () => categoriesCopy
    return scale
}

export function obtainScalerSlotter ({
    scale, slotUuids, width, bandPadding,
}) {
    const slotScale = obtainCategoricalScale({
        categories: slotUuids,
        range: [-width / 2, width / 2],
        bandPadding,
    })
    return (uuid) => {
        const delta = slotScale(uuid)
        const composedScale = x => scale(x) + delta
        composedScale.bandwidth = slotScale.bandwidth
        composedScale.bandStep = scale.bandStep || (() => width)
        composedScale.bandGap = () => composedScale.bandStep() - composedScale.bandwidth()
        composedScale.bandCenters = scale.bandCenters ? () => scale.bandCenters().map(center => center + delta) : undefined
        composedScale.domain = scale.domain
        composedScale.range = scale.range
        composedScale.invert = composedScale.bandCenters ? obtainCategoricalInvertFn(composedScale.domain(), composedScale.bandCenters(), composedScale.bandwidth()) : undefined
        return composedScale
    }
}

function obtainCategoricalInvertFn (categories, bandCenters, bandwidth) {
    return x => categories.find((_, index) => Math.abs(x - bandCenters[index]) <= bandwidth / 2)
}

// export function obtainCategoricalScale ({
//     categories, range, reversed, padding,
// }) {
//     if (!categories) return undefined
//     let [rangeStart, rangeEnd] = range
//     let paddingOuterStart = 0
//     let paddingOuterEnd = 0
//     const { start: paddingStart = 0, inner: paddingInner = 0, end: paddingEnd = 0 } = padding || {}
//     if (paddingStart) {
//         if (isRatio(paddingStart)) {
//             paddingOuterStart = paddingStart
//         } else {
//             rangeStart += paddingStart
//         }
//     }
//     if (paddingEnd) {
//         if (isRatio(paddingEnd)) {
//             paddingOuterEnd = paddingEnd
//         } else {
//             rangeEnd -= paddingEnd
//         }
//     }
//     const resultingRange = reversed ? [rangeEnd, rangeStart] : [rangeStart, rangeEnd]
//     const paddingOuter = (paddingOuterStart + paddingOuterEnd) / 2
//     const align = (paddingOuterStart / (paddingOuterStart + paddingOuterEnd)) || 0
//     const bandScale = scaleBand()
//         .domain(categories)
//         .range(resultingRange)
//         .paddingInner(paddingInner)
//         .paddingOuter(paddingOuter)
//         .align(align)
//     const scale = x => bandScale(x) + bandScale.bandwidth() / 2
//     scale.bandwidth = bandScale.bandwidth()
//     scale.step = bandScale.step()
//     return scale
// }

// function obtainBandGapFromBandwidth ({ range, numCategories, bandwidth }) {
//     return (bandwidth > 0 && bandwidth <= 1)
//         ? obtainBandGapFromBandwidthRate({ range, numCategories, rate: bandwidth })
//         : obtainBandGapFromBandwidthAbsolute({ range, numCategories, bandwidth })
// }
// function obtainBandGapFromBandwidthAbsolute ({ range, numCategories, bandwidth }) {
//     const sanitizedBandwidth = clamp(bandwidth, 0, range / numCategories)
//     return (range - numCategories * sanitizedBandwidth) / (numCategories - 1)
// }
// function obtainBandGapFromBandwidthRate ({ range, numCategories, rate }) {
//     const sanitizedRate = clamp(rate, 0, 1)
//     return range / (numCategories * (1 / (1 - sanitizedRate)) - 1)
// }
