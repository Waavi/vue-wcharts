import { WCartesian, WPieChart, WStackBar } from './charts'
import {
    WLine,
    WBar,
    WScatter,
    WXAxis,
    WYAxis,
    WZAxis,
    WLegend,
    WLegends,
    WCartesianGrid,
    WMarker,
    WPie,
    WTooltip,
    WDot,
    WBullet,
} from './components'
import {
    WTrans,
    WSpread,
} from './transitions'
import { setOptions } from './config'

const install = (Vue, opts = {}) => {
    setOptions(opts)

    const core = [
        WCartesian,
        WPieChart,
        WStackBar,
        WLegend,
    ]

    const components = [
        WLine,
        WBar,
        WScatter,
        WXAxis,
        WYAxis,
        WZAxis,
        WLegends,
        WCartesianGrid,
        WMarker,
        WPie,
        WTooltip,
        WDot,
        WBullet,
    ]

    const common = [
        WTrans,
        WSpread,
    ]

    // Chart components
    core.forEach((c) => {
        Vue.component(c.name, c)
    })

    // Instance components
    components.forEach((c) => {
        Vue.component(c.name, c)
    })

    // Common and transtions components
    common.forEach((c) => {
        Vue.component(c.name, c)
    })
}

export default install

export {
    // Core
    WCartesian,
    WPieChart,
    WStackBar,
    // Components
    WLine,
    WScatter,
    WDot,
    WBar,
    WXAxis,
    WYAxis,
    WZAxis,
    WLegend,
    WLegends,
    WCartesianGrid,
    WMarker,
    WPie,
    WTooltip,
    WBullet,
    // Common
    WTrans,
    WSpread,
}
