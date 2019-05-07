import { WCartesian } from './charts'
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
    WLine,
    WBar,
    WXAxis,
    WYAxis,
    WLegend,
    WCartesianGrid,
    WMarker,
    WTooltip,
}
