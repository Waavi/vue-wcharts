import omit from 'lodash.omit'
import isEqual from 'lodash.isequal'
import { uniqueAxesBy, enqueueRegisterUpdateFactory } from './chartUtils'

export default {
    data () {
        return {
            /**
             * Axes store for all the relevant information for each axis
             * @property {Object.<string, Object>} axisDefinitions map { [axisId]: axisDefData, ... }
             * @property {string} axisDefData.dimension "x", "y", "z", "angle", "radius".
             * @property {string} axisDefData.type "numeric", "categorical".
             * @property {string} [axisDefData.series] optional series.
             * @property {string|string[]} [axisDefData.datakey] optional datakey or array of datakeys.
             * @property {function} [axisDefData.formatter] optional default formatter (for ticks and drawable values that belong to this)
             * @property {Object.<string, string>} axisDefData.datakeys a "map" of element's "uid" and their "datakeys".
             *      It must be a "map" to register who is requiring a datakey. It could be more than one element.
            */
            axisDefinitions: {},

            /**
             * Store for all the "datakeys" grouped by axes and its corresponding "uids"
             * @property {Object.<string, Object>} axisDatakeys map { [axisId]: axisDatakeysData, ... }
             * @property {Object.<string, Object>} axisDatakeysData map { [uid]: axisDatakeyData, ... }
             * @property {string} [axisDatakeyData.series] optional series.
             * @property {string|string[]} axisDatakeyData.datakey datakey or array of datakeys.
             */
            axisDatakeys: {},

            /**
             * Store for all the "data-domains" grouped by axes and its corresponding "uids"
             * @property {Object.<string, Object>} axisDataDomainsByElement map { [axisId]: axisDataDomainsData, ... }
             * @property {Object.<string, number[]>} axisDataDomainsData map { [uid]: domain, ... }
             * @property {number[]} domain domain as an array [min, max]
             */
            axisDataDomainsByElement: {},

            /**
             * Store for all the global "data-domains" by each axis
             * @property {Object.<string, number[]>} axisDomains map { [axisId]: domain, ... }
             * @property {number[]} [domain] domain as an array [min, max]. It will be undefined for categorical axes.
             */
            axisDomains: {},
            /**
             * Store for all the "bounds" by each axis
             * @property {Object.<string, number[]>} axisBounds map { [axisId]: bounds, ... }
             * @property {number[]} [bounds] bounds as an array [min, max]. It will be undefined for categorical axes.
             */
            axisBounds: {},
            /**
             * Store for all the scales by each axis
             * @property {Object.<string, function>} axisBounds map { [axisId]: scale, ... }
             * @property {function} [scale] function that returns a scaled value given the original one
             */
            axisScales: {},

            axisReferences: {},

            // /**
            //  * Store for all the ticks array by each axis
            //  * @property {Object.<string, any[]>} axisBounds map { [axisId]: ticks, ... }
            //  * @property {any[]} ticks array of tick values
            //  */
            // axisTicks: {},
        }
    },
    computed: {
        inferredAxisId () {
            const { axisDefinitions } = this
            const axes = Object.values(axisDefinitions)
            return {
                byDimension: uniqueAxesBy(axes, 'dimension'),
                byType: uniqueAxesBy(axes, 'type'),
                byDatakey: uniqueAxesBy(axes, 'datakey'),
            }
        },
    },
    methods: {
        /**
         * Function that registers the axes relevant information.
         * Every axis must use this function.
         * @param {string} axisId identifier for the axis.
         * @param {Object} axisDefData object with parameters.
         * @param {string} axisDefData.dimension "x", "y", "z", "angle", "radius".
         * @param {string} axisDefData.type "numeric", "categorical".
         * @param {string} [axisDefData.series] optional series.
         * @param {string|string[]} [axisDefData.datakey] optional datakey or array of datakeys.
         * @param {function} [axisDefData.formatter] optional default formatter (for ticks and drawable values that belong to this)
         */
        registerAxisDefinition (axisId, {
            dimension,
            type,
            series,
            datakey,
            formatter,
        }) {
            this.enqueueAxisDefinitionUpdate(axisId, {
                axisId,
                dimension,
                type,
                series,
                datakey,
                formatter,
            })
            if (datakey) {
                this.registerAxisDatakey(axisId, { axisId, series, datakey })
            }
        },

        /**
         * Function that unregisters the axes relevant information.
         * @param {string} axisId identifier for the axis.
         */
        unregisterAxis (axisId) {
            this.enqueueAxisDefinitionUpdate(axisId)
            this.enqueueAxisDatakeyUpdate(axisId)
            this.enqueueAxisDataDomainUpdate(axisId)

            this.axisDomains = omit(this.axisDomains, axisId)
            this.axisBounds = omit(this.axisBounds, axisId)
            this.axisScales = omit(this.axisScales, axisId)
            this.axisReferences = omit(this.axisReferences, axisId)
            // this.axisTicks = omit(this.axisTicks, axisId)
        },

        /**
         * Function that registers a datakey for a specific axis.
         * @param {string} uid unique identifier for the component.
         * @param {Object} axisDatakeyData object with parameters.
         * @param {string} axisDatakeyData.axisId identifier for the axis.
         * @param {string} [axisDatakeyData.series] series key if needed.
         * @param {string|string[]} axisDatakeyData.datakey datakey or array of datakeys.
         */
        registerAxisDatakey (uid, {
            axisId,
            series,
            datakey,
        }) {
            if (series || datakey) {
                if (uid && axisId) {
                    this.enqueueAxisDatakeyUpdate(uid, {
                        axisId,
                        series,
                        datakey,
                    })
                    // const newAxisDatakeys = {
                    //     ...axisDatakeys,
                    //     [axisId]: {
                    //         ...(axisDatakeys[axisId] || {}),
                    //         [uid]: {
                    //             series,
                    //             datakey,
                    //         },
                    //     },
                    // }
                    // this.axisDatakeys = newAxisDatakeys
                } else {
                    console.warn('chart.registerAxisDatakey: there is no "uid" or "axisId"')
                }
            }
        },

        /**
         * Function that unregisters a datakey for every axis.
         * @param {string} uid unique identifier for the component.
         */
        unregisterAxisDatakey (uid) {
            this.enqueueAxisDatakeyUpdate(uid)
            // const { axisDatakeys } = this
            // this.axisDatakeys = Object.keys(axisDatakeys).reduce(
            //     (acc, axisId) => ({
            //         ...acc,
            //         [axisId]: omit(axisDatakeys[axisId] || {}, uid),
            //     }),
            //     {}
            // )
        },

        /**
         * Function that registers a "data-domain" for a specific axis.
         * @param {string} uid unique identifier for the component.
         * @param {Object} axisDataDomainData object with parameters.
         * @param {string} axisDataDomainData.axisId identifier for the axis.
         * @param {number[]} axisDataDomainData.domain domain as an array [min, max]
         */
        registerAxisDataDomain (uid, {
            axisId,
            domain,
        }) {
            if (uid && axisId) {
                this.enqueueAxisDataDomainUpdate(uid, { axisId, domain })
                // const newAxisDataDomainsByElement = {
                //     ...axisDataDomainsByElement,
                //     [axisId]: {
                //         ...(axisDataDomainsByElement[axisId] || {}),
                //         [uid]: domain,
                //     },
                // }
            } else {
                console.warn('chart.registerAxisDataDomain: there is no "uid" or "axisId"')
            }
        },

        /**
         * Function that unregisters a "data-domain" for a specific axis.
         * @param {string} uid unique identifier for the component.
         */
        unregisterAxisDataDomain (uid) {
            this.enqueueAxisDataDomainUpdate(uid)
            // const { axisDataDomainsByElement } = this
            // this.axisDataDomainsByElement = Object.keys(axisDataDomainsByElement).reduce(
            //     (acc, axisId) => ({
            //         ...acc,
            //         [axisId]: omit(axisDataDomainsByElement[axisId] || {}, uid),
            //     }),
            //     {}
            // )
        },

        /**
         * Function that sets the final computed domain for a specific axis.
         * @param {string} axisId identifier for the axis.
         * @param {number[]} domain domain as an array [min, max]
         */
        setAxisDomain (axisId, domain) {
            this.axisDomains = { ...this.axisDomains, [axisId]: domain }
        },
        /**
         * Function that sets the final bounds for a specific axis.
         * @param {string} axisId identifier for the axis.
         * @param {number[]} bound bound as an array [min, max]
         */
        setAxisBound (axisId, bound) {
            this.axisBounds = { ...this.axisBounds, [axisId]: bound }
        },
        /**
         * Function that sets the final scale for a specific axis.
         * @param {string} axisId identifier for the axis.
         * @param {function} scale scale
         */
        setAxisScale (axisId, scale) {
            this.axisScales = { ...this.axisScales, [axisId]: scale }
        },

        setAxisReference (axisId, reference) {
            this.axisReferences = { ...this.axisReferences, [axisId]: reference }
        },

        // /**
        //  * Function that sets the final ticks array for a specific axis.
        //  * @param {string} axisId identifier for the axis.
        //  * @param {any[]} ticks array of tick values
        //  */
        // setAxisTicks (axisId, ticks) {
        //     this.axisTicks = { ...this.axisTicks, [axisId]: ticks }
        // },
    },
    created () {
        this.enqueueAxisDefinitionUpdate = enqueueRegisterUpdateFactory(
            // needsToBeUpdated
            (id, data) => !isEqual(this.axisDefinitions[id], data),
            // onFlush action (given an array of `{ key, value }` assuming an undefined value as the action to remove an element)
            (definitionsArray) => {
                const newAxisDefinitions = { ...this.axisDefinitions }
                definitionsArray.forEach(({ key: id, value: data }) => {
                    if (data !== undefined) { // adds the data
                        newAxisDefinitions[id] = data
                    } else { // removes the data
                        delete newAxisDefinitions[id]
                    }
                })
                this.axisDefinitions = newAxisDefinitions
            },
            100, // wait time for inner debounce method
            'definition' // only for debug
        )
        this.enqueueAxisDatakeyUpdate = enqueueRegisterUpdateFactory(
            // needsToBeUpdated
            (uid, data) => !isEqual((this.axisDatakeys[data.axisId] || {})[uid], data),
            // onFlush action (given an array of `{ key, value }` assuming an undefined value as the action to remove an element)
            (datakeysArray) => {
                const newAxisDatakeys = { ...this.axisDatakeys }
                datakeysArray.forEach(({ key: uid, value: data }) => {
                    if (data !== undefined) { // adds the data on the corresponding axis
                        const { axisId, series, datakey } = data
                        newAxisDatakeys[axisId] = {
                            ...newAxisDatakeys[axisId],
                            [uid]: { series, datakey },
                        }
                    } else { // removes the data for every axis
                        Object.keys(newAxisDatakeys).forEach((axisId) => {
                            if (newAxisDatakeys[axisId][uid]) {
                                newAxisDatakeys[axisId] = omit(newAxisDatakeys[axisId], uid)
                            }
                        })
                    }
                })
                this.axisDatakeys = newAxisDatakeys
            },
            100, // wait time for inner debounce method
            'datakey' // only for debug
        )
        this.enqueueAxisDataDomainUpdate = enqueueRegisterUpdateFactory(
            // needsToBeUpdated
            (uid, data) => !isEqual((this.axisDataDomainsByElement[data.axisId] || {})[uid], data),
            // onFlush action (given an array of `{ key, value }` assuming an undefined value as the action to remove an element)
            (dataDomainsArray) => {
                const newAxisDataDomains = { ...this.axisDataDomainsByElement }
                dataDomainsArray.forEach(({ key: uid, value: data }) => {
                    if (data !== undefined) { // adds the data on the corresponding axis
                        const { axisId, domain } = data
                        newAxisDataDomains[axisId] = {
                            ...newAxisDataDomains[axisId],
                            [uid]: domain,
                        }
                    } else { // removes the data for every axis
                        Object.keys(newAxisDataDomains).forEach((axisId) => {
                            if (newAxisDataDomains[axisId][uid]) {
                                newAxisDataDomains[axisId] = omit(newAxisDataDomains[axisId], uid)
                            }
                        })
                    }
                })
                this.axisDataDomainsByElement = newAxisDataDomains
            },
            100, // wait time for inner debounce method
            'dataDomain' // only for debug
        )
    },
}
