import VueTypes from 'vue-types'
import debounce from 'lodash.debounce'
import sortBy from 'lodash.sortby'

import activeMixin from '../mixins/active'
import themeMixin from '../mixins/theme'
import { random } from '../utils/maths'
import { getElementLayout } from './chartUtils'
import { getUid } from '../mixins/registerUidMixin'

export default {
    mixins: [activeMixin, themeMixin],
    props: {
        id: VueTypes.oneOfType([VueTypes.string, VueTypes.number]).optional,
        dataset: VueTypes.oneOfType([Array, Object]).def([]),
        responsive: VueTypes.bool.def(false),
        width: VueTypes.number.def(600),
        height: VueTypes.number.def(400),
        padding: VueTypes.oneOfType([
            VueTypes.number,
            VueTypes.arrayOf(VueTypes.number),
            VueTypes.shape({
                top: VueTypes.number,
                right: VueTypes.number,
                bottom: VueTypes.number,
                left: VueTypes.number,
            }),
        ]).def(0),
    },
    provide () {
        return {
            Chart: this,
        }
    },
    data () {
        return {
            chartReady: !this.responsive,
            /**
             * Axes stores all the relevant information for each axis
             * @property {Object.<string, Object>} axes
             * @property {axisD} axisData.
             * @property {string} axisData.dimension "x", "y", "z", "angle", "radius".
             * @property {string} axisData.type "numeric", "categorical".
             * @property {string|string[]} axisData.datakey optional datakey or array of datakeys.
             * @property {Object.<string, string>} axisData.datakeys a "map" of element's "uid" and their "datakeys".
             *      It must be a "map" to register who is requiring a datakey. It could be more than one element.
            */
            axes: {},
            outterAreas: {
                top: {},
                left: {},
                right: {},
                bottom: {},
            },
            parentWidth: null, // Width of chart
        }
    },
    computed: {
        // Create a unique chart id
        chartId () {
            return this.id || `chart-${random()}`
        },
        normalizedPadding () {
            // TODO: this functionality could be moved to a "utils file" and could be used for other componentes
            let top = 0
            let right = 0
            let bottom = 0
            let left = 0
            if (Array.isArray(this.padding)) {
                top = this.padding[0] || 0
                right = this.padding[1] || 0
                bottom = this.padding[2] || this.padding[0] || 0
                left = this.padding[3] || this.padding[1] || 0
            } else if (typeof this.padding === 'object') {
                top = this.padding.top || 0
                right = this.padding.right || 0
                bottom = this.padding.bottom || 0
                left = this.padding.left || 0
            } else if (typeof this.padding === 'number') {
                top = this.padding
                right = this.padding
                bottom = this.padding
                left = this.padding
            }
            return {
                top: Math.max(Math.round(top), 0),
                right: Math.max(Math.round(right), 0),
                bottom: Math.max(Math.round(bottom), 0),
                left: Math.max(Math.round(left), 0),
            }
        },

        /**
         * This contains the exact "view box" size in points
         */
        viewBox () {
            return {
                width: this.parentWidth || this.width,
                height: this.height,
            }
        },

        // ordered from outter to inner
        topOuterElements () {
            return this.outterElementsWithDistancesFromCanvas('top')
        },
        // ordered from outter to inner
        leftOuterElements () {
            return this.outterElementsWithDistancesFromCanvas('left')
        },
        // ordered from outter to inner
        rightOuterElements () {
            return this.outterElementsWithDistancesFromCanvas('right')
        },
        // ordered from outter to inner
        bottomOuterElements () {
            return this.outterElementsWithDistancesFromCanvas('bottom')
        },

        // Canvas size
        canvas () {
            const outermostTopElement = this.topOuterElements[0] || { distanceFromCanvas: 0, height: 0 }
            const top = outermostTopElement.distanceFromCanvas + outermostTopElement.height + this.normalizedPadding.top
            const outermostLeftElement = this.leftOuterElements[0] || { distanceFromCanvas: 0, width: 0 }
            const left = outermostLeftElement.distanceFromCanvas + outermostLeftElement.width + this.normalizedPadding.left
            const outermostRightElement = this.rightOuterElements[0] || { distanceFromCanvas: 0, width: 0 }
            const right = outermostRightElement.distanceFromCanvas + outermostRightElement.width + this.normalizedPadding.right
            const outermostBottomElement = this.bottomOuterElements[0] || { distanceFromCanvas: 0, height: 0 }
            const bottom = outermostBottomElement.distanceFromCanvas + outermostBottomElement.height + this.normalizedPadding.bottom

            return {
                top,
                left,
                right,
                bottom,
                width: this.viewBox.width - left - right,
                height: this.viewBox.height - top - bottom,
            }
        },

        /**
         * Stores a map with the layouts of each "outer element" given their "uid"
         */
        outerElementLayoutsByUid () {
            const byUid = {}
            this.topOuterElements.forEach((element) => {
                byUid[element.uid] = getElementLayout({
                    position: 'top', element, canvas: this.canvas, viewBox: this.viewBox,
                })
            })
            this.leftOuterElements.forEach((element) => {
                byUid[element.uid] = getElementLayout({
                    position: 'left', element, canvas: this.canvas, viewBox: this.viewBox,
                })
            })
            this.rightOuterElements.forEach((element) => {
                byUid[element.uid] = getElementLayout({
                    position: 'right', element, canvas: this.canvas, viewBox: this.viewBox,
                })
            })
            this.bottomOuterElements.forEach((element) => {
                byUid[element.uid] = getElementLayout({
                    position: 'bottom', element, canvas: this.canvas, viewBox: this.viewBox,
                })
            })
            return byUid
        },

        // Generate data array
        data () {
            if (Array.isArray(this.dataset)) return this.dataset
            if (!Object.keys(this.dataset).length) return []
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
        /**
         * Function that stores the layout for a component on ViewBox Layout
         * @param {string} uid unique identifier for the component.
         * @param {Object} obj object with parameters.
         * @param {string} [obj.reference="canvas"] "canvas" or "view-box". Determines the layout's boundings for this component
         * @param {string} obj.position "top", "left", "right", "bottom".
         * @param {number} [obj.order=0] order from "inner" to "outer" in increasing order (axes should have -1 to be sure they are at the first ones).
         * @param {number} [obj.left] left (take "reference" into account).
         * @param {number} [obj.width] width (take "reference" into account).
         * @param {number} [obj.right] right (take "reference" into account).
         * @param {number} [obj.top] top (take "reference" into account).
         * @param {number} [obj.height] height (take "reference" into account).
         * @param {number} [obj.bottom] bottom (take "reference" into account).
         */
        reserveAPlaceInOuterArea (uid, {
            reference,
            position,
            order,
            left,
            width,
            right,
            top,
            height,
            bottom,
        } = {}) {
            if (this.outterAreas[position] !== undefined) {
                this.outterAreas[position][uid] = {
                    uid,
                    reference: reference || 'canvas',
                    order: order || 0,
                    left,
                    width,
                    right,
                    top,
                    height,
                    bottom,
                }
            } else {
                console.warn('chart.reserveAPlaceInOuterArea.position: must be one of: "top", "left", "right", "bottom"')
            }
        },

        /**
         * Function that register the axes relevant information.
         * Every axis must use this function.
         * @param {string} id identifier for the axis.
         * @param {Object} obj object with parameters.
         * @param {string} obj.dimension "x", "y", "z", "angle", "radius".
         * @param {string} obj.type "numeric", "categorical".
         * @param {string|string[]} [obj.datakey] optional datakey or array of datakeys.
         */
        registerAxis (id, {
            dimension,
            type,
            datakey,
        }) {
            this.axes[id] = {
                ...(this.axes[id] || {}),
                dimension,
                type,
                datakey,
            }
        },

        /**
         * Function that register a datakey for a specific axis.
         * @param {string} uid unique identifier for the component.
         * @param {Object} obj object with parameters.
         * @param {string} [obj.axisId] identifier for the axis.
         * @param {string} obj.dimension "x", "y", "z", "angle", "radius".
         * @param {string} obj.series series key if needed.
         * @param {string} obj.datakey datakey. It can be namespaced by a series "{series}:{datakey}"
         */
        registerAxisDatakey (uid, {
            axisId,
            dimension,
            series,
            datakey,
        }) {
            if (uid && (axisId || dimension)) {
                const idOrDimension = axisId || dimension
                const axisData = this.axes[idOrDimension] || {}
                this.axes[idOrDimension] = {
                    ...axisData,
                    datakeys: {
                        ...axisData.datakeys,
                        [uid]: datakey,
                    },
                }
            } else {
                console.warn('chart.registerAxisDatakey: there is no "uid" or "axisId"')
            }
        },

        getAxis (id) {
            return this.axes[id]
        },

        setAxisData (id, {
            domain,
            bounds,
            scale,
        }) {
            this.axes[id] = {
                ...(this.axes[id] || {}),
                domain,
                bounds,
                scale,
            }
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

        // ordered from outter to inner
        outterElementsWithDistancesFromCanvas (area) {
            const relevantDimension = area === 'top' || area === 'bottom' ? 'height' : 'width'
            const sorted = sortBy(Object.values(this.outterAreas[area]), 'order')
            const sortedWithDistances = []
            let accDistance = 0
            sorted.forEach((item) => {
                sortedWithDistances.push({ ...item, distanceFromCanvas: accDistance })
                accDistance += item[relevantDimension] || 0
            })
            return sortedWithDistances.reverse() // reverse to be sure they rendered by priority (z-index)
        },
    },

    render (h) {
        const slots = this.$slots.default || []
        const drawables = [] // We need inject necessary props to cartesian slots
        const axis = []
        const plugins = []
        const others = []

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
                    axis.push(slot)
                    break
                case 'plugins':
                    plugins.push(slot)
                    break
                default:
                    break
            }

            if (sealedOptions.preload || sealedOptions.layoutInOuterArea) {
                const defaultProps = Object.entries(sealedOptions.props).reduce((acc, [key, val]) => ({
                    ...acc,
                    [key]: typeof val.default === 'function' ? val.default() : val.default,
                }), {})
                const props = { ...defaultProps, ...options.propsData }
                const uid = getUid(sealedOptions, props)
                sealedOptions.preload({
                    uid,
                    chart: this,
                    options: sealedOptions,
                    props,
                })
                if (sealedOptions.layoutInOuterArea) {
                    this.reserveAPlaceInOuterArea(uid, sealedOptions.layoutInOuterArea(props))
                }
            }
        })

        const { viewBox, responsive } = this
        return h(
            'div',
            {
                class: 'WCartesian2',
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
                    },
                    this.chartReady ? [others, axis, drawables] : []
                ),
                this.chartReady ? plugins : [],
            ]
        )
    },
}
