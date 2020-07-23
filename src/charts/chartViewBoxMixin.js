import VueTypes from 'vue-types'
import debounce from 'lodash.debounce'

export default {
    props: {
        responsive: VueTypes.bool.def(false),
        width: VueTypes.number.def(600),
        height: VueTypes.number.def(400),
    },
    data () {
        return {
            isChartReady: !this.responsive,
            parentWidth: null, // Width of chart
        }
    },
    computed: {
        /**
         * This contains the exact "view box" size in points
         */
        viewBox () {
            return {
                width: this.parentWidth || this.width,
                height: this.height,
            }
        },
    },
    created () {
        this.isChartReady = !this.responsive
        this.debouncedResize = debounce(this.resize, 200)
    },
    mounted () {
    // Added listener if has response prop to true
        if (this.responsive) {
            this.resize()
            if (typeof window !== 'undefined') {
                window.addEventListener('resize', this.debouncedResize)
            }
        }
    },
    unmounted () {
    // Remove listener response
        if (this.responsive && typeof window !== 'undefined') window.removeEventListener('resize', this.debouncedResize)
    },
    methods: {
        // Resize chart on event emited
        resize () {
            if (this.$el) {
                const { width } = this.$el.getBoundingClientRect()
                this.parentWidth = width
            }
            // Set and emit isChartReady
            this.isChartReady = true
            this.$emit('onChartReady')
        },
    },
}
