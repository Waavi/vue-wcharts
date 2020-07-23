import d3Line from 'd3-shape/src/line'
import d3Area from 'd3-shape/src/area'
import { arc as d3Arc, pie as d3Pie } from 'd3-shape'
import { select as d3Select } from 'd3-selection'
import 'd3-transition'
import { interpolateObject } from 'd3-interpolate'
import getD3Curve from './getD3Curve'

const normalizeAccessor = accessor => (typeof accessor === 'string' ? d => d[accessor] : accessor)
const normalizeDefined = (defined, ...accessors) => (
    (defined === true && (d => !accessors.some(accessor => accessor(d) === undefined))) ||
    defined ||
    (() => true)
)

export function lineGeneratorFactory ({
    xAccessor = 'x',
    yAccessor = 'y',
    curve = false,
    defined = true,
}) {
    const normalizedXAccessor = normalizeAccessor(xAccessor)
    const normalizedYAccessor = normalizeAccessor(yAccessor)
    return d3Line()
        .x(normalizedXAccessor)
        .y(normalizedYAccessor)
        .defined(normalizeDefined(defined, normalizedXAccessor, normalizedYAccessor))
        .curve(getD3Curve(curve))
}

export function lineAreaGeneratorFactory ({
    xAccessor,
    x0Accessor,
    x1Accessor,
    yAccessor,
    y0Accessor,
    y1Accessor,
    curve = false,
    defined = true,
}) {
    let generator = d3Area()
    const accessors = []
    if (x0Accessor !== undefined && x1Accessor !== undefined) {
        const normalizedX0Accessor = normalizeAccessor(x0Accessor)
        const normalizedX1Accessor = normalizeAccessor(x1Accessor)
        generator = generator.x0(normalizedX0Accessor).x1(normalizedX1Accessor)
        accessors.push(normalizedX0Accessor, normalizedX1Accessor)
    } else {
        const normalizedXAccessor = normalizeAccessor(xAccessor)
        generator = generator.x(normalizedXAccessor)
        accessors.push(normalizedXAccessor)
    }
    if (y0Accessor !== undefined && y1Accessor !== undefined) {
        const normalizedY0Accessor = normalizeAccessor(y0Accessor)
        const normalizedY1Accessor = normalizeAccessor(y1Accessor)
        generator = generator.y0(normalizedY0Accessor).y1(normalizedY1Accessor)
        accessors.push(normalizedY0Accessor, normalizedY1Accessor)
    } else {
        const normalizedYAccessor = normalizeAccessor(yAccessor)
        generator = generator.x(normalizedYAccessor)
        accessors.push(normalizedYAccessor)
    }
    return generator
        .defined(normalizeDefined(defined, ...accessors))
        .curve(getD3Curve(curve))
}

export function linePathAnimateTo ({ pathRef, newPathValue, duration }) {
    d3Select(pathRef).transition().duration(duration).attr('d', newPathValue)
}

export function arcGeneratorFactory (params) {
    return Object.keys(params).reduce(
        (fn, key) => fn[key](params[key]),
        d3Arc()
    )
}
export function arcGenerator (params) {
    return arcGeneratorFactory(params)()
}
export function arcCentroid (params) {
    return arcGeneratorFactory(params).centroid()
}

export function arcPathAnimateTo ({
    pathRef, oldArcData, newArcData, generator, duration,
}) {
    d3Select(pathRef).transition().duration(duration).attrTween('d', arcTween(oldArcData, newArcData, generator))
}
function arcTween (oldArcData, newArcData, generator = arcGenerator) {
    return function interpolatorFactory () {
        const interpolate = interpolateObject(oldArcData, newArcData)
        return function arcInterpolator (t) {
            return generator(interpolate(t))
        }
    }
}

export function arcCentroidAnimateTo ({
    centroidRef, oldArcData, newArcData, generator, duration,
}) {
    d3Select(centroidRef).transition().duration(duration).attrTween('transform', arcCentroidTween(oldArcData, newArcData, generator))
}
function arcCentroidTween (oldArcData, newArcData, generator = arcGenerator) {
    return function interpolatorFactory () {
        const interpolate = interpolateObject(oldArcData, newArcData)
        return function arcInterpolator (t) {
            const centroid = generator.centroid(interpolate(t))
            return `translate(${centroid[0]},${centroid[1]})`
        }
    }
}

export function pieGeneratorFactory (params) {
    return Object.keys(params).reduce(
        (fn, key) => fn[key](params[key]),
        d3Pie()
    )
}
