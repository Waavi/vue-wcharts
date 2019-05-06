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
    Vue.component('WTooltip', WTooltip)
    Vue.component('WLegend', WLegend)
}

export default install

export {
    WCartesian,
    WLine,
    WXAxis,
    WYAxis,
    WLegend,
    WCartesianGrid,
    WMarker,
    WTooltip,
}
