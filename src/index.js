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
    Vue.component('WCartesian', WCartesian)
    Vue.component('WLine', WLine)
    Vue.component('WBar', WBar)
    Vue.component('WXAxis', WXAxis)
    Vue.component('WYAxis', WYAxis)
    Vue.component('WLegend', WLegend)
    Vue.component('WCartesianGrid', WCartesianGrid)
    Vue.component('WMarker', WMarker)
    Vue.component('WTooltip', WTooltip)
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
