import { WCartesian, WPieChart, WStackBar } from './charts'
import {
    WLine,
    WBar,
    WScatter,
    WXAxis,
    WYAxis,
    WZAxis,
    WLegendItem,
    WLegend,
    WCartesianGrid,
    WMarker,
    WPie,
    WTooltip,
    WDot,
    WBullet,
    WShowIfFit,
} from './components'
import {
    WTrans,
    WSpread,
} from './transitions'
import { setOptions } from './config'

export default (Vue, opts = {}) => {
    setOptions(opts)

    const core = [
        WCartesian,
        WPieChart,
        WStackBar,
        WLegendItem,
    ]

    const components = [
        WLine,
        WBar,
        WScatter,
        WXAxis,
        WYAxis,
        WZAxis,
        WLegend,
        WCartesianGrid,
        WMarker,
        WPie,
        WTooltip,
        WDot,
        WBullet,
        WShowIfFit,
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