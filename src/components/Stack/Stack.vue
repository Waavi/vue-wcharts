<script>
import VueTypes from 'vue-types'
import d3Stack from 'd3-shape/src/stack'
import orderAppearance from 'd3-shape/src/order/appearance'
import orderAscending from 'd3-shape/src/order/ascending'
import orderDescending from 'd3-shape/src/order/descending'
import orderInsideOut from 'd3-shape/src/order/insideOut'
import orderNone from 'd3-shape/src/order/none'
import orderReverse from 'd3-shape/src/order/reverse'
import offsetDiverging from 'd3-shape/src/offset/diverging'
import offsetExpand from 'd3-shape/src/offset/expand'
import offsetNone from 'd3-shape/src/offset/none'
import offsetSilhouette from 'd3-shape/src/offset/silhouette'
import offsetWiggle from 'd3-shape/src/offset/wiggle'
import withUidMixin from '../../mixins/withUidMixin'
import { getDatums, datakeyValue } from '../../utils'
import { obtainBarWidth } from '../Bar/barUtils'
import { AXIS_TYPE, AXIS_DIMENSION } from '../Axis/axisMixin'

export const STACK_ORDER = {
    appearance: orderAppearance,
    ascending: orderAscending,
    descending: orderDescending,
    insideOut: orderInsideOut,
    none: orderNone,
    reverse: orderReverse,
}
export const STACK_OFFSET = {
    diverging: offsetDiverging,
    expand: offsetExpand,
    none: offsetNone,
    silhouette: offsetSilhouette,
    wiggle: offsetWiggle,
}

export default {
    name: 'Stack',
    mixins: [withUidMixin],
    inject: {
        Chart: 'Chart',
        AxisGroup: { default: undefined },
    },
    provide () {
        return {
            Stack: this,
        }
    },
    props: {
        baseAxisId: VueTypes.string.optional,
        baseDatakey: VueTypes.oneOfType([VueTypes.string, VueTypes.number, VueTypes.func]).optional,
        cumulativeAxisId: VueTypes.string.optional,
        series: VueTypes.string.optional,
        withLabels: VueTypes.bool.def(false),
        withStackedLabel: VueTypes.bool.def(false),
        order: VueTypes.oneOfType([VueTypes.string, VueTypes.func]).def('none'),
        offset: VueTypes.oneOfType([VueTypes.string, VueTypes.func]).def('none'),
        barWidth: VueTypes.number.optional,
    },
    data () {
        return {
            stack: [],
        }
    },
    computed: {
        filteredStack () {
            return this.stack.filter(s => s.datakey !== undefined)
        },
        actualBaseAxisId () {
            const { AxisGroup, Chart, baseAxisId } = this
            return baseAxisId ||
                (AxisGroup && AxisGroup.axisId) ||
                Chart.inferredAxisId.byType[AXIS_TYPE.CATEGORICAL] ||
                Chart.inferredAxisId.byDimension[AXIS_DIMENSION.X] ||
                Chart.inferredAxisId.byDimension[AXIS_DIMENSION.RADIUS] ||
                (console.error('WChart ERROR - Base axis id is not defined for Stack.') && null)
        },
        actualCumulativeAxisId () {
            const { Chart, cumulativeAxisId } = this
            return cumulativeAxisId ||
                Chart.inferredAxisId.byType[AXIS_TYPE.NUMERIC] ||
                Chart.inferredAxisId.byDimension[AXIS_DIMENSION.Y] ||
                Chart.inferredAxisId.byDimension[AXIS_DIMENSION.ANGLE] ||
                (console.error('WChart ERROR - Cumulative axis id is not defined for Stack.') && null)
        },
        actualBaseDatakey () {
            const { actualBaseAxisId, baseDatakey, Chart } = this
            return baseDatakey || (Chart.axisDefinitions[actualBaseAxisId] || {}).datakey
        },
        baseAxisScale () {
            const { Chart, AxisGroup, actualBaseAxisId } = this
            const axisScale = Chart.axisScales[actualBaseAxisId]
            const slotScale = AxisGroup ? AxisGroup.getSlotScale(this.uid, actualBaseAxisId) : x => x
            return x => slotScale(axisScale(x))
        },
        actualBarWidth () {
            const {
                barWidth, Chart, AxisGroup, actualBaseAxisId,
            } = this
            return obtainBarWidth({
                barWidthFromProp: barWidth,
                constrainedWidth: AxisGroup ? AxisGroup.slotWidth : Chart.axisCategoricalStepWidths[actualBaseAxisId],
            })
        },
        cumulativeAxisScale () {
            const { Chart, actualCumulativeAxisId } = this
            return Chart.axisScales[actualCumulativeAxisId]
        },
        orderFunction () {
            return STACK_ORDER[this.order] || orderNone
        },
        offsetFunction () {
            return STACK_OFFSET[this.offset] || offsetNone
        },
        stackData () {
            const {
                Chart, series, filteredStack, stackGenerator, orderFunction, offsetFunction,
            } = this
            const dataset = getDatums({ dataset: Chart.dataset, series })
            return stackGenerator
                .order(orderFunction)
                .offset(offsetFunction)
                .keys(filteredStack.map(s => s.datakey))(dataset)
        },
        dataDomain () {
            const { stackData } = this
            if (stackData.length > 0) {
                return [
                    Math.min(...stackData.map(stackDataItem => Math.min(...stackDataItem.map(range => range[0]).filter(v => typeof v === 'number' && !Number.isNaN(v))))),
                    Math.max(...stackData.map(stackDataItem => Math.max(...stackDataItem.map(range => range[1]).filter(v => typeof v === 'number' && !Number.isNaN(v))))),
                ]
            }
            return undefined
        },
        dataDomainData () {
            return {
                axisId: this.actualCumulativeAxisId,
                domain: this.dataDomain,
            }
        },
        dataValuesByUid () {
            const {
                filteredStack, stackData, actualBaseDatakey, baseAxisScale, cumulativeAxisScale,
            } = this
            const result = {}
            if (baseAxisScale && cumulativeAxisScale) {
                filteredStack.forEach(({ uid }, index) => {
                    result[uid] = stackData[index].map((item) => {
                        const datum = item.data
                        const baseValue = datum[actualBaseDatakey]
                        const cumulativeValue = [item[0], item[1]]
                        return {
                            baseValue,
                            baseValueScaled: baseAxisScale(baseValue),
                            cumulativeValue,
                            cumulativeValueScaled: cumulativeValue.map(cumulativeAxisScale),
                            datum,
                        }
                    })
                })
            }
            return result
        },
    },
    watch: {
        dataDomainData: {
            handler (data) {
                if (data && data.domain) {
                    this.Chart.registerAxisDataDomain(this.uid, data)
                }
            },
            immediate: true,
        },
    },
    beforeCreate () {
        this.stackGenerator = d3Stack().value(datakeyValue)
    },
    created () {
        const { registerIntoSlot } = this.AxisGroup || {}
        registerIntoSlot && registerIntoSlot(this.uid)
    },
    beforeDestroy () {
        const { unregisterIntoSlot } = this.AxisGroup || {}
        unregisterIntoSlot && unregisterIntoSlot(this.uid)
        this.Chart.unregisterAxisDataDomain(this.uid)
    },
    methods: {
        registerIntoStack (uid, datakey) {
            const index = this.stack.findIndex(item => item.uid === uid)
            if (index >= 0) {
                if (this.stack[index].datakey !== datakey) {
                    this.stack = [...this.stack.slice(0, index), { uid, datakey }, ...this.stack.slice(index + 1)]
                }
            } else {
                this.stack = [...this.stack, { uid, datakey }]
            }
        },
        unregisterIntoStack (uid) {
            this.registerIntoStack(uid, undefined)
        },
    },

    render (h) {
        return h('g', {}, this.$slots.default)
    },
}
</script>
