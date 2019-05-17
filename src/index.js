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
} from './components'
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
    ]

    core.forEach((c) => {
        Vue.component(c.name, c)
    })

    // Instance components
    components.forEach((c) => {
        Vue.component(c.name, c)
    })
}

export default install

export {
    WCartesian,
    WPieChart,
    WStackBar,
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
}
