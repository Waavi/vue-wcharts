export const getSpacesByPos = (pos, { width, height }, spaces = [0, 0, 0, 0]) => {
    const result = [...spaces]

    switch (pos) {
        case 'top':
            result[0] += height
            return result
        case 'bottom':
            result[2] += height
            return result
        case 'right':
            result[1] += width
            return result
        case 'left':
            result[3] += width
            return result
        default:
            return result
    }
}

export const toPx = num => `${num}px`

export const getIsHorizontal = pos => ['top', 'bottom'].includes(pos)

export default {
    toPx,
    getIsHorizontal,
    getSpacesByPos,
}
