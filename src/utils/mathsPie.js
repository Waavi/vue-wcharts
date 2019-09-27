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

export const getPercentValue = (percent, totalValue, defaultValue = 0, validate = false) => {
    if (!isNumber(percent) && !isString(percent)) {
        return defaultValue
    }

    let value

    if (isPercent(percent)) {
        const index = percent.indexOf('%')
        value = totalValue * parseFloat(percent.slice(0, index)) / 100
    } else {
        value = +percent
    }

    if (isNaN(value)) {
        value = defaultValue
    }

    if (validate && value > totalValue) {
        value = totalValue
    }

    return value
}

export const getSectorPath = ({
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
}) => {
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
