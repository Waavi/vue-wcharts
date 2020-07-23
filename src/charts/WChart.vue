<script>
import VueTypes from 'vue-types'
import { randomInt } from '../utils/maths'
import chartCanvasMixin from './chartCanvasMixin'
import chartAxisMixin from './chartAxisMixin'
import chartLegendMixin from './chartLegendMixin'
import chartColorsMixin from './chartColorsMixin'
import { marginVueType, normalizeMargin } from './chartUtils'
import stylesMixin from '../mixins/stylesMixin'

export default {
    name: 'WChart',
    mixins: [
        chartCanvasMixin,
        chartAxisMixin,
        chartLegendMixin,
        stylesMixin,
        chartColorsMixin,
    ],
    provide () {
        return {
            Chart: this,
        }
    },
    props: {
        id: VueTypes.oneOfType([VueTypes.string, VueTypes.number]).optional,
        dataset: VueTypes.oneOfType([Array, Object]).def([]),
        padding: marginVueType,
        styles: VueTypes.object.def({}),
    },
    computed: {
        // Create a unique chart id
        chartId () {
            return this.id || `chart-${randomInt()}`
        },
        normalizedPadding () {
            return normalizeMargin(this.padding)
        },
    },

    render (h) {
        const {
            viewBox, canvas, responsive, isChartReady, actualStyles,
        } = this
        const slots = this.$slots.default || []
        const outerElements = []
        const innerElements = []
        const widgets = []
        const others = []

        if (isChartReady) {
            slots.forEach((slot) => {
                const options = slot.componentOptions
                if (!options) {
                    others.push(slot)
                    return
                }
                const { sealedOptions } = options.Ctor
                if (!sealedOptions) {
                    return
                }
                const { type, computed: { layoutInOuterArea } = {} } = sealedOptions
                if (type === 'widget') {
                    widgets.push(slot)
                } else if (layoutInOuterArea) {
                    outerElements.push(slot)
                } else {
                    innerElements.push(slot)
                }
            })
        }

        return h(
            'div',
            {
                class: 'WChart',
                style: {
                    position: 'relative',
                    width: responsive ? '100%' : `${viewBox.width}px`,
                },
            },
            [
                h(
                    'svg',
                    {
                        attrs: {
                            ...viewBox,
                            viewBox: `0 0 ${viewBox.width} ${viewBox.height}`,
                        },
                        style: {
                            background: actualStyles.viewBox.fill,
                        },
                    },
                    isChartReady
                        ? [
                            h(
                                'rect',
                                {
                                    class: 'WChart-canvas',
                                    attrs: {
                                        x: canvas.left,
                                        y: canvas.top,
                                        width: canvas.width,
                                        height: canvas.height,
                                        fill: actualStyles.canvas.fill,
                                    },
                                },
                            ),
                            outerElements,
                            innerElements,
                            others,
                        ]
                        : []
                ),
                isChartReady ? widgets : [],
            ]
        )
    },
}
</script>
