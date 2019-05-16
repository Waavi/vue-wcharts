import { WCartesian, WPieChart, WStackBar } from './charts'
import {
    WLine,
    WBar,
    WXAxis,
    WYAxis,
    WLegend,
    WLegends,
    WCartesianGrid,
    WMarker,
    WPie,
    WTooltip,
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
        WXAxis,
        WYAxis,
        WLegends,
        WCartesianGrid,
        WMarker,
        WPie,
        WTooltip,
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
    WBar,
    WXAxis,
    WYAxis,
    WLegend,
    WLegends,
    WCartesianGrid,
    WMarker,
    WPie,
    WTooltip,
}
