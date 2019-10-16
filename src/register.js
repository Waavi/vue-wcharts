import { WCartesian, WPieChart } from './charts'
import { WCartesian2, WPieChart2 } from './charts2'
import { WSimpleHStackBar } from './extraCharts'
import {
    WLine,
    WLine2,
    WBar,
    WScatter,
    WXAxis,
    WXAxis2,
    WYAxis,
    WYAxis2,
    WZAxis,
    WLegendItem,
    WLegend,
    WCartesianGrid,
    WMarker,
    WPie,
    WTooltip,
    WDot,
    WAxisLabel,
    WBullet,
    WShowIfFit,
} from './components'
import {
    WTrans,
    WSpread,
} from './transitions'
import { setOptions } from './options'

export default (Vue, opts = {}) => {
    setOptions(opts)

    const core = [
        WCartesian,
        WCartesian2,
        WPieChart,
        WPieChart2,
        WSimpleHStackBar,
        WLegendItem,
    ]

    const components = [
        WLine,
        WLine2,
        WBar,
        WScatter,
        WXAxis,
        WXAxis2,
        WYAxis,
        WYAxis2,
        WZAxis,
        WLegend,
        WCartesianGrid,
        WMarker,
        WPie,
        WTooltip,
        WDot,
        WAxisLabel,
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
