<script>
import VueTypes from 'vue-types'
import { scaleLinear } from 'd3'
import { map, property } from 'lodash'

export default {
    name: 'WCartesian',
    props: {
        dataset: VueTypes.array.def([]),
        height: VueTypes.number.def(400),
        width: VueTypes.number.def(600),
    },
    data () {
        return {
            dataKeys: [],
        }
    },
    computed: {
        yScale () {
            return scaleLinear()
                .domain([this.bounds.min, this.bounds.max])
                .range([this.height, 0])
        },
        xScale () {
            return scaleLinear()
                .domain([0, this.dataset.length + 1])
                .range([0, this.width])
        },
        bounds () {
            if (this.dataKeys.length) {
                const values = map(this.dataset, property(this.dataKeys))
                return {
                    max: Math.max(...values),
                    min: Math.min(...values),
                }
            }
            return {
                max: 0,
                min: 0,
            }
        },
    },
    created () {
        this.$slots.default.forEach((children) => {
            const { componentOptions } = children
            const { name } = componentOptions.Ctor.options
            const { dataKey } = componentOptions.propsData
            if (name === 'WLine' && dataKey) {
                this.dataKeys.push(dataKey)
            }
        })
    },
    render (h) {
        const slots = this.$slots.default || []
        const cartesians = []
        slots.forEach((slot) => {
            console.log(slot)
            const options = slot.componentOptions
            const sealed = options.Ctor.sealedOptions
            if (!sealed) {
                return
            }
            console.log(sealed.preload)
            switch (sealed.type) {
                case 'cartesian':
                    slot.index = cartesians.length
                    slot.componentOptions.propsData = {
                        ...slot.componentOptions.propsData,
                        xScale: this.xScale,
                        yScale: this.yScale,
                        dataset: this.dataset,
                        height: this.height,
                        width: this.width,
                        bounds: this.bounds,
                    }
                    console.log(slot)
                    cartesians.push(slot)
                    break
                default:
                    break
            }
        })
        return h(
            'div',
            {
                style: {
                    position: 'relative',
                    width: `${this.width}px`,
                },
            },
            [
                h(
                    'svg',
                    {
                        attrs: {
                            width: this.width,
                            height: this.height,
                            viewBox: `0 0 ${this.width} ${this.height}`,
                        },
                    },
                    [cartesians]
                ),
            ]
        )
    },
}
</script>
