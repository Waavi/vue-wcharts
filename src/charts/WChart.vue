<script>
import VueTypes from 'vue-types'
import { random } from '../utils/maths'
import chartCanvasMixin from './chartCanvasMixin'
import chartAxisMixin from './chartAxisMixin'
import { marginVueType, normalizedMargin } from './chartUtils'
import themeMixin from '../mixins/theme'

export default {
    name: 'WChart',
    mixins: [
        chartCanvasMixin,
        chartAxisMixin,
        themeMixin,
    ],
    props: {
        id: VueTypes.oneOfType([VueTypes.string, VueTypes.number]).optional,
        dataset: VueTypes.oneOfType([Array, Object]).def([]),
        padding: marginVueType,
        styles: VueTypes.object.def({}),
    },
    provide () {
        return {
            Chart: this,
        }
    },
    computed: {
        // Create a unique chart id
        chartId () {
            return this.id || `chart-${random()}`
        },
        normalizedPadding () {
            return normalizedMargin(this.padding)
        },
    },

    render (h) {
        const {
            viewBox, canvas, responsive, isChartReady, actualStyles,
        } = this
        const slots = this.$slots.default || []
        const drawables = [] // We need inject necessary props to cartesian slots
        const axes = []
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

                switch (sealedOptions.type) {
                    case 'drawable':
                        drawables.push(slot)
                        break
                    case 'axis':
                        axes.push(slot)
                        break
                    case 'widget':
                        widgets.push(slot)
                        break
                    default:
                        break
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
                            others,
                            axes,
                            drawables,
                        ]
                        : []
                ),
                isChartReady ? widgets : [],
            ]
        )
    },
}
</script>
