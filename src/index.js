import { WCartesian, WStackBar } from './charts'
import {
    WLine,
    WBar,
    WXAxis,
    WYAxis,
    WLegend,
    WCartesianGrid,
    WMarker,
    WTooltip,
} from './components'

function install (Vue) {
    [
        WCartesian,
        WStackBar,
        WLine,
        WBar,
        WXAxis,
        WYAxis,
        WLegend,
        WCartesianGrid,
        WMarker,
        WTooltip,
    ].forEach((c) => {
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
    WCartesianGrid,
    WMarker,
    WTooltip,
}
