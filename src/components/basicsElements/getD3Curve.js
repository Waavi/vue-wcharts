import basis from 'd3-shape/src/curve/basis'
import basisClosed from 'd3-shape/src/curve/basisClosed'
import basisOpen from 'd3-shape/src/curve/basisOpen'
import bundle from 'd3-shape/src/curve/bundle'
import cardinal from 'd3-shape/src/curve/cardinal'
import cardinalClosed from 'd3-shape/src/curve/cardinalClosed'
import cardinalOpen from 'd3-shape/src/curve/cardinalOpen'
import catmullRom from 'd3-shape/src/curve/catmullRom'
import catmullRomClosed from 'd3-shape/src/curve/catmullRomClosed'
import catmullRomOpen from 'd3-shape/src/curve/catmullRomOpen'
import linear from 'd3-shape/src/curve/linear'
import linearClosed from 'd3-shape/src/curve/linearClosed'
import { monotoneX, monotoneY } from 'd3-shape/src/curve/monotone'
import natural from 'd3-shape/src/curve/natural'
import step, { stepAfter, stepBefore } from 'd3-shape/src/curve/step'

const CURVES = {
    basis,
    basisClosed,
    basisOpen,
    bundle,
    cardinal,
    cardinalClosed,
    cardinalOpen,
    catmullRom,
    catmullRomClosed,
    catmullRomOpen,
    linear,
    linearClosed,
    monotoneX,
    monotoneY,
    natural,
    step,
    stepAfter,
    stepBefore,
}

export default (curve) => {
    if (curve === false) return linear
    if (curve === true) return monotoneX
    if (typeof curve === 'function') return curve
    return CURVES[curve] || linear
}
