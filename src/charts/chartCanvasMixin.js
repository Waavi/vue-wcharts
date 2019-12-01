import sortBy from 'lodash.sortby'
import omit from 'lodash.omit'
import chartViewBoxMixin from './chartViewBoxMixin'
import { getOuterElementLayout } from './chartUtils'

export const OUTER_AREA = {
    TOP: 'top',
    LEFT: 'left',
    RIGHT: 'right',
    BOTTOM: 'bottom',
}
export const OUTER_AREA_REFERENCE = {
    CANVAS: 'canvas',
    VIEW_BOX: 'view-box',
}

export default {
    mixins: [
        chartViewBoxMixin,
    ],
    data () {
        return {
            outerAreas: {},
        }
    },
    computed: {
        // ordered from outer to inner
        topOuterElements () {
            const { outerAreas, outerElementsWithDistancesFromCanvas } = this
            return outerElementsWithDistancesFromCanvas(outerAreas[OUTER_AREA.TOP], 'height')
        },
        // ordered from outer to inner
        leftOuterElements () {
            const { outerAreas, outerElementsWithDistancesFromCanvas } = this
            return outerElementsWithDistancesFromCanvas(outerAreas[OUTER_AREA.LEFT], 'width')
        },
        // ordered from outer to inner
        rightOuterElements () {
            const { outerAreas, outerElementsWithDistancesFromCanvas } = this
            return outerElementsWithDistancesFromCanvas(outerAreas[OUTER_AREA.RIGHT], 'height')
        },
        // ordered from outer to inner
        bottomOuterElements () {
            const { outerAreas, outerElementsWithDistancesFromCanvas } = this
            return outerElementsWithDistancesFromCanvas(outerAreas[OUTER_AREA.BOTTOM], 'width')
        },

        // Canvas size
        canvas () {
            const {
                topOuterElements, leftOuterElements, rightOuterElements, bottomOuterElements, normalizedPadding, viewBox,
            } = this
            const outermostTopElement = topOuterElements[0] || { distanceFromCanvas: 0, height: 0 }
            const top = outermostTopElement.distanceFromCanvas + outermostTopElement.height + normalizedPadding.top
            const outermostLeftElement = leftOuterElements[0] || { distanceFromCanvas: 0, width: 0 }
            const left = outermostLeftElement.distanceFromCanvas + outermostLeftElement.width + normalizedPadding.left
            const outermostRightElement = rightOuterElements[0] || { distanceFromCanvas: 0, width: 0 }
            const right = outermostRightElement.distanceFromCanvas + outermostRightElement.width + normalizedPadding.right
            const outermostBottomElement = bottomOuterElements[0] || { distanceFromCanvas: 0, height: 0 }
            const bottom = outermostBottomElement.distanceFromCanvas + outermostBottomElement.height + normalizedPadding.bottom

            return {
                top,
                left,
                right,
                bottom,
                width: viewBox.width - left - right,
                height: viewBox.height - top - bottom,
            }
        },

        /**
         * Stores a map with the layouts of each "outer element" given their "uid"
         */
        outerElementLayoutsByUid () {
            const {
                topOuterElements, leftOuterElements, rightOuterElements, bottomOuterElements, viewBox, canvas,
            } = this
            const byUid = {}
            topOuterElements.forEach((element) => {
                byUid[element.uid] = getOuterElementLayout({
                    position: 'top', element, canvas, viewBox,
                })
            })
            leftOuterElements.forEach((element) => {
                byUid[element.uid] = getOuterElementLayout({
                    position: 'left', element, canvas, viewBox,
                })
            })
            rightOuterElements.forEach((element) => {
                byUid[element.uid] = getOuterElementLayout({
                    position: 'right', element, canvas, viewBox,
                })
            })
            bottomOuterElements.forEach((element) => {
                byUid[element.uid] = getOuterElementLayout({
                    position: 'bottom', element, canvas, viewBox,
                })
            })
            return byUid
        },
    },
    methods: {
        removeUidFromOuterAreas (outerAreas, uid) {
            return Object.keys(outerAreas).reduce(
                (acc, position) => ({ ...acc, [position]: omit(outerAreas[position], uid) }),
                {}
            )
        },

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
            const newOuterAreas = this.removeUidFromOuterAreas(this.outerAreas, uid)
            if ([
                OUTER_AREA.TOP,
                OUTER_AREA.LEFT,
                OUTER_AREA.RIGHT,
                OUTER_AREA.BOTTOM,
            ].includes(position)) {
                if (!newOuterAreas[position]) {
                    newOuterAreas[position] = {}
                }
                newOuterAreas[position][uid] = {
                    uid,
                    reference: reference || OUTER_AREA_REFERENCE.CANVAS,
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
            this.outerAreas = newOuterAreas
        },

        /**
         * Function that deletes the layout for a component on ViewBox Layout
         * @param {string} uid unique identifier for the component.
         */
        leavePlaceInOuterArea (uid) {
            this.outerAreas = this.removeUidFromOuterAreas(this.outerAreas, uid)
        },

        // ordered from outer to inner
        outerElementsWithDistancesFromCanvas (areas, relevantDimension) {
            const sorted = sortBy(areas, 'order')
            const sortedWithDistances = []
            let accDistance = 0
            sorted.forEach((item) => {
                sortedWithDistances.push({ ...item, distanceFromCanvas: accDistance })
                accDistance += item[relevantDimension] || 0
            })
            return sortedWithDistances.reverse() // reverse to be sure they rendered by priority (z-index)
        },
    },
}
