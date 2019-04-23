export const getSpacesByPos = (pos, { width, height }, spaces = [0, 0, 0, 0]) => {
    if (pos === 'top') return [height, 0, 0, 0]
    if (pos === 'bottom') return [0, 0, height, 0]
    if (pos === 'right') return [0, width, 0, 0]
    if (pos === 'left') return [0, 0, 0, width]
    return spaces
}

export const toPx = num => `${num}px`

export default {
    toPx,
    getSpacesByPos,
}
