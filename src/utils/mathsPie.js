import {
    isString, isNumber, isPercent, isNaN,
} from './checks'

export const mathSign = (value) => {
    if (value === 0) { return 0 }
    if (value > 0) { return 1 }

    return -1
}

export const getDeltaAngle = (startAngle, endAngle) => {
    const sign = mathSign(endAngle - startAngle)
    const deltaAngle = Math.min(Math.abs(endAngle - startAngle), 359.999)

    return sign * deltaAngle
}

export const parseDeltaAngle = ({ startAngle, endAngle }) => {
    const sign = mathSign(endAngle - startAngle)
    const deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360)

    return sign * deltaAngle
}

export const RADIAN = Math.PI / 180

export const polarToCartesian = (cx, cy, radius, angle) => ({
    x: cx + Math.cos(-RADIAN * angle) * radius,
    y: cy + Math.sin(-RADIAN * angle) * radius,
})

export const getPercentValue = ({ percent, totalValue, defaultValue = 0 }) => {
    if (!isNumber(percent) && !isString(percent)) {
        return defaultValue
    }

    let value

    if (isPercent(percent)) {
        const index = percent.slice(0, -1)
        value = totalValue * parseFloat(percent.slice(0, index)) / 100
    } else {
        value = +percent
    }

    if (isNaN(value)) {
        value = defaultValue
    }

    if (value > totalValue) {
        value = totalValue
    }

    return value
}

const getTangentCircle = ({
    cx, cy, radius, angle, sign, isExternal,
    borderRadius, cornerIsExternal = true,
}) => {
    const centerRadius = borderRadius * (isExternal ? 1 : -1) + radius
    const theta = Math.asin(borderRadius / centerRadius) / RADIAN
    const centerAngle = cornerIsExternal ? angle : angle + sign * theta
    const center = polarToCartesian(cx, cy, centerRadius, centerAngle)
    // The coordinate of point which is tangent to the circle
    const circleTangency = polarToCartesian(cx, cy, radius, centerAngle)
    // The coordinate of point which is tangent to the radius line
    const lineTangencyAngle = cornerIsExternal ? angle - sign * theta : angle
    const lineTangency = polarToCartesian(
        cx, cy, centerRadius * Math.cos(theta * RADIAN), lineTangencyAngle
    )
    return {
        center, circleTangency, lineTangency, theta,
    }
}

export const getSectorWithCorner = ({
    cx, cy, innerRadius, outerRadius, borderRadius, startAngle, endAngle,
}) => {
    const sign = mathSign(endAngle - startAngle)
    const { circleTangency: soct, lineTangency: solt, theta: sot } =
    getTangentCircle({
        cx,
        cy,
        radius: outerRadius,
        angle: startAngle,
        sign,
        borderRadius,
    })
    const { circleTangency: eoct, lineTangency: eolt, theta: eot } =
    getTangentCircle({
        cx,
        cy,
        radius: outerRadius,
        angle: endAngle,
        sign: -sign,
        borderRadius,
    })
    const outerArcAngle = Math.abs(startAngle - endAngle) - sot - eot
    if (outerArcAngle < 0) {
        return getSectorPath({
            cx, cy, innerRadius, outerRadius, startAngle, endAngle,
        })
    }

    let path = `M ${solt.x},${solt.y}
        A${borderRadius},${borderRadius},0,0,${+(sign < 0)},${soct.x},${soct.y}
        A${outerRadius},${outerRadius},0,${+(outerArcAngle > 180)},${+(sign < 0)},${eoct.x},${eoct.y}
        A${borderRadius},${borderRadius},0,0,${+(sign < 0)},${eolt.x},${eolt.y}
      `

    if (innerRadius > 0) {
        const { circleTangency: sict, lineTangency: silt, theta: sit } =
          getTangentCircle({
              cx,
              cy,
              radius: innerRadius,
              angle: startAngle,
              sign,
              isExternal: true,
              borderRadius,
          })
        const { circleTangency: eict, lineTangency: eilt, theta: eit } =
          getTangentCircle({
              cx,
              cy,
              radius: innerRadius,
              angle: endAngle,
              sign: -sign,
              isExternal: true,
              borderRadius,
          })
        const innerArcAngle = Math.abs(startAngle - endAngle) - sit - eit

        if (innerArcAngle < 0) {
            return `${path}L${cx},${cy}Z`
        }

        path += `L${eilt.x},${eilt.y}
          A${borderRadius},${borderRadius},0,0,${+(sign < 0)},${eict.x},${eict.y}
          A${innerRadius},${innerRadius},0,${+(innerArcAngle > 180)},${+(sign > 0)},${sict.x},${sict.y}
          A${borderRadius},${borderRadius},0,0,${+(sign < 0)},${silt.x},${silt.y}Z`
    } else {
        path += `L${cx},${cy}Z`
    }

    return path
}

export const getSectorPath = ({
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, borderRadius,
}) => {
    if (borderRadius) {
        return getSectorWithCorner({
            cx, cy, innerRadius, outerRadius, borderRadius, startAngle, endAngle,
        })
    }

    const angle = getDeltaAngle(startAngle, endAngle)

    // When the angle of sector equals to 360, star point and end point coincide
    const tempEndAngle = startAngle + angle
    const outerStartPoint = polarToCartesian(cx, cy, outerRadius, startAngle)
    const outerEndPoint = polarToCartesian(cx, cy, outerRadius, tempEndAngle)

    let path = `M ${outerStartPoint.x},${outerStartPoint.y}
    A ${outerRadius},${outerRadius},0,
    ${+(Math.abs(angle) > 180)},${+(startAngle > tempEndAngle)},
    ${outerEndPoint.x},${outerEndPoint.y}
`

    if (innerRadius > 0) {
        const innerStartPoint = polarToCartesian(cx, cy, innerRadius, startAngle)
        const innerEndPoint = polarToCartesian(cx, cy, innerRadius, tempEndAngle)
        path += `L ${innerEndPoint.x},${innerEndPoint.y}
            A ${innerRadius},${innerRadius},0,
            ${+(Math.abs(angle) > 180)},${+(startAngle <= tempEndAngle)},
            ${innerStartPoint.x},${innerStartPoint.y} Z`
    } else {
        path += `L ${cx},${cy} Z`
    }

    return path
}

export default {
    mathSign,
    getDeltaAngle,
    parseDeltaAngle,
    polarToCartesian,
    getPercentValue,
    getSectorPath,
}
