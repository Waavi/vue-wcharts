import isEqual from 'lodash.isequal'
import { enqueueRegisterUpdateFactory } from './chartUtils'

export default {
    data () {
        return {
            legendItems: {},
        }
    },
    methods: {
        /**
         * Function that registers all the relevant data for a legend item.
         * @param {string} uid unique identifier for the component.
         * @param {Object} axisLegendItemData object with parameters.
         * @param {string} axisLegendItemData.label the label that it's shown at the legend content.
         * @param {string} [axisLegendItemData.color] an optional specific color
         * @param {string} [axisLegendItemData.shape="circle"] an optional specific shape
         * @param {boolean} [axisLegendItemData.active=true] to "toggle" the legend
         */
        registerLegendItem (uid, {
            label,
            color,
            shape,
            active,
        }) {
            this.enqueueLegendItemUpdate(uid, {
                label,
                color,
                shape,
                active,
            })
        },

        /**
         * Function that unregisters a legend item.
         * @param {string} uid unique identifier for the component.
         */
        unregisterLegendItem (uid) {
            this.enqueueLegendItemUpdate(uid)
        },
    },
    created () {
        this.enqueueLegendItemUpdate = enqueueRegisterUpdateFactory(
            // needsToBeUpdated
            (id, data) => !isEqual(this.legendItems[id], data),
            // onFlush action (given an array of `{ key, value }` assuming an undefined value as the action to remove an element)
            (legendItemArray) => {
                const newLegendItems = { ...this.legendItems }
                legendItemArray.forEach(({ key: id, value: data }) => {
                    if (data !== undefined) { // adds the data
                        newLegendItems[id] = data
                    } else { // removes the data
                        delete newLegendItems[id]
                    }
                })
                this.legendItems = newLegendItems
            },
            100, // wait time for inner debounce method
            'legendItems' // only for debug
        )
    },
}
