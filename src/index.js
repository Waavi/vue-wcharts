import { WCartesian, WStackBar } from './charts'
import {
    WLine,
    WBar,
    WXAxis,
    WYAxis,
    WLegend,
    WLegends,
    WCartesianGrid,
    WMarker,
    WTooltip,
} from './components'
import { setOptions } from './config'

const install = (Vue, opts) => {
    setOptions(opts)

    const core = [
        WCartesian,
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
    WStackBar,
    WLine,
    WBar,
    WXAxis,
    WYAxis,
    WLegend,
    WLegends,
    WCartesianGrid,
    WMarker,
    WTooltip,
}
