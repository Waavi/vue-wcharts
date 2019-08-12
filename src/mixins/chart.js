import VueTypes from 'vue-types'
import debounce from 'lodash.debounce'
import merge from 'lodash.merge'

import activeMixin from './active'
import themeMixin from './theme'

export default {
    mixins: [activeMixin, themeMixin],
    props: {
        dataset: VueTypes.oneOfType([Array, Object]).def([]),
        responsive: VueTypes.bool.def(false),
        height: VueTypes.number.def(400),
        width: VueTypes.number.def(600),
    },
    provide () {
        return {
            Chart: this,
        }
    },
    data () {
        return {
            chartReady: !this.responsive,
            datakeys: [], // dataKeys Selected data
            legends: [], // Legends
            activeElements: [], // Elem actives
            space: [0, 0, 0, 0], // Spaces all elements
            spaceObjects: [0, 0, 0, 0], // Spaces of objects (Axis)
            parentWidth: null, // Width of chart
        }
    },
    computed: {
        // View size, include canvas and paddings/margins
        viewWidth () {
            return this.parentWidth || this.width
        },
        // Canvas size
        canvas () {
            const { viewWidth, height, space: margin } = this
            const x0 = margin[3]
            const y0 = margin[0]
            const y1 = height - margin[2]
            const x1 = viewWidth - margin[1]

            return {
                x0,
                y0,
                width: x1 - x0,
                height: y1 - y0,
                x1,
                y1,
            }
        },
        data () {
            if (Array.isArray(this.dataset)) return this.dataset
            return Object.keys(this.dataset)
                .reduce((acc, key) => [...acc, ...this.dataset[key].map(d => ({ ...d, $dataset: key }))], [])
        },
    },
    mounted () {
    // Added listenner if has response prop to true
        if (this.responsive) {
            this.resize()
            if (typeof window !== 'undefined') {
                window.addEventListener('resize', debounce(this.resize, 220))
            }
        }
    },
    unmounted () {
    // Remove listenner response
        if (this.responsive && typeof window !== 'undefined') window.removeEventListener('resize')
    },
    methods: {
    // Add spaces
        addSpace (space = []) {
            space.forEach((val, i) => {
                this.space[i] = Math.max(val, this.space[i] || 0)
            })
        },
        // Add spaces of objects els ex: [legends...]
        addSpaceObjects (space = []) {
            this.addSpace(space)
            space.forEach((val, i) => {
                this.spaceObjects[i] = Math.max(val, this.spaceObjects[i] || 0)
            })
        },
        // Resize chart on event emited
        resize () {
            if (this.$el) {
                const { width } = this.$el.getBoundingClientRect()
                this.parentWidth = width
            }
            this.setChartReady()
        },
        // Set and emit chartReady
        setChartReady () {
            this.chartReady = true
            this.$emit('onChartReady')
        },
    },
}
