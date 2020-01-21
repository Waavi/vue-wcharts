import omit from 'lodash.omit'

export default {
    props: {

    },
    data () {
        return {
            /**
             * Axes stores all the relevant information for each axis
             * @property {Object.<string, Object>} axisDefinitions map { [axisId]: axisDefData, ... }
             * @property {string} axisDefData.dimension "x", "y", "z", "angle", "radius".
             * @property {string} axisDefData.type "numeric", "categorical".
             * @property {string|string[]} axisDefData.datakey optional datakey or array of datakeys.
             * @property {Object.<string, string>} axisDefData.datakeys a "map" of element's "uid" and their "datakeys".
             *      It must be a "map" to register who is requiring a datakey. It could be more than one element.
            */
            axisDefinitions: {},

            axisDatakeys: {},

            axisDataDomainsByElement: {},

            /**
             * Axes stores all the relevant information for each axis
             * @property {Object.<string, Object>} axisInformations map { [axisId]: axisData, ... }
             * @property {string} axisData.dimension "x", "y", "z", "angle", "radius".
             * @property {string} axisData.type "numeric", "categorical".
             * @property {string|string[]} axisData.datakey optional datakey or array of datakeys.
             * @property {Object.<string, string>} axisData.datakeys a "map" of element's "uid" and their "datakeys".
             * @property {number[]} axisData.domain
             * @property {number[]} axisData.bounds
             * @property {function} axisData.scale
             * @property {number[]} axisData.ticks
            */
            // axisInformations: {},
            axisDomains: {},
            axisBounds: {},
            axisScales: {},
            axisTicks: {},
        }
    },
    computed: {
        // axes () {
        //     const { axisDefinitions, axisInformations } = this
        //     return Object.keys(axisDefinitions).reduce(
        //         (acc, axisId) => ({
        //             ...acc,
        //             [axisId]: {
        //                 ...axisDefinitions[axisId],
        //                 ...axisInformations[axisId],
        //             },
        //         }),
        //         {}
        //     )
        // },
    },
    methods: {
        /**
         * Function that registers the axes relevant information.
         * Every axis must use this function.
         * @param {string} id identifier for the axis.
         * @param {Object} obj object with parameters.
         * @param {string} obj.dimension "x", "y", "z", "angle", "radius".
         * @param {string} obj.type "numeric", "categorical".
         * @param {string} [obj.series] optional series.
         * @param {string} [obj.datakey] optional datakey.
         */
        registerAxisDefinition (id, {
            dimension,
            type,
            series,
            datakey,
        }) {
            debugger
            const { axisDefinitions } = this
            const newAxisDefinitions = {
                ...axisDefinitions,
                [id]: {
                    dimension,
                    type,
                    series,
                    datakey,
                },
            }
            if (datakey) {
                this.registerAxisDatakey(id, { axisId: id, series, datakey })
            }
            this.axisDefinitions = newAxisDefinitions
            // this.axisDefinitions[id] = {
            //     dimension,
            //     type,
            //     series,
            //     datakey,
            // }
        },

        /**
         * Function that unregisters the axes relevant information.
         * @param {string} id identifier for the axis.
         */
        unregisterAxis (id) {
            // delete this.axisDefinitions[id]
            // delete this.axisDatakeys[id]
            // delete this.axisDomains[id]
            // delete this.axisBounds[id]
            // delete this.axisScales[id]
            // delete this.axisTicks[id]
            this.axisDefinitions = omit(this.axisDefinitions, id)
            this.axisDatakeys = omit(this.axisDatakeys, id)
            // this.axisInformations = omit(this.axisInformations, id)
            this.axisDomains = omit(this.axisDomains, id)
            this.axisBounds = omit(this.axisBounds, id)
            this.axisScales = omit(this.axisScales, id)
            this.axisTicks = omit(this.axisTicks, id)
        },

        /**
         * Function that registers a datakey for a specific axis.
         * @param {string} uid unique identifier for the component.
         * @param {Object} obj object with parameters.
         * @param {string} obj.axisId identifier for the axis.
         * @param {string} obj.series series key if needed.
         * @param {string} obj.datakey datakey. It can be namespaced by a series "{series}:{datakey}"
         */
        registerAxisDatakey (uid, {
            axisId,
            series,
            datakey,
        }) {
            debugger
            const { axisDatakeys } = this
            if (series || datakey) {
                if (uid && axisId) {
                    const newAxisDatakeys = {
                        ...axisDatakeys,
                        [axisId]: {
                            ...(axisDatakeys[axisId] || {}),
                            [uid]: {
                                series,
                                datakey,
                            },
                        },
                    }
                    this.axisDatakeys = newAxisDatakeys
                    // this.axisDatakeys[axisId] = {
                    //     ...(axisDatakeys[axisId] || {}),
                    //     [uid]: {
                    //         series,
                    //         datakey,
                    //     },
                    // }
                } else {
                    console.warn('chart.registerAxisDatakey: there is no "uid" or "axisId"')
                }
            }
        },

        /**
         * Function that unregisters a datakey for a specific axis.
         * @param {string} uid unique identifier for the component.
         */
        unregisterAxisDatakey (uid) {
            const { axisDatakeys } = this
            this.axisDatakeys = Object.keys(axisDatakeys).reduce(
                (acc, axisId) => ({
                    ...acc,
                    [axisId]: omit(axisDatakeys[axisId] || {}, uid),
                }),
                {}
            )
        },

        /**
         * Function that registers a datakey for a specific axis.
         * @param {string} uid unique identifier for the component.
         * @param {Object} obj object with parameters.
         * @param {string} obj.axisId identifier for the axis.
         * @param {string} obj.domain domain
         */
        registerAxisDataDomain (uid, {
            axisId,
            domain,
        }) {
            debugger
            const { axisDataDomainsByElement } = this
            if (uid && axisId) {
                const newAxisDataDomainsByElement = {
                    ...axisDataDomainsByElement,
                    [axisId]: {
                        ...(axisDataDomainsByElement[axisId] || {}),
                        [uid]: domain,
                    },
                }
                this.axisDataDomainsByElement = newAxisDataDomainsByElement
                // this.axisDataDomainsByElement[axisId] = {
                //     ...(axisDataDomainsByElement[axisId] || {}),
                //     [uid]: domain,
                // }
            } else {
                console.warn('chart.registerAxisDataDomain: there is no "uid" or "axisId"')
            }
        },

        /**
         * Function that unregisters a datakey for a specific axis.
         * @param {string} uid unique identifier for the component.
         */
        unregisterAxisDataDomain (uid) {
            const { axisDataDomainsByElement } = this
            this.axisDataDomainsByElement = Object.keys(axisDataDomainsByElement).reduce(
                (acc, axisId) => ({
                    ...acc,
                    [axisId]: omit(axisDataDomainsByElement[axisId] || {}, uid),
                }),
                {}
            )
        },

        setAxisDomain (id, domain) {
            debugger
            this.axisDomains = { ...this.axisDomains, [id]: domain }
            // this.axisDomains[id] = domain
        },
        setAxisBound (id, bound) {
            debugger
            this.axisBounds = { ...this.axisBounds, [id]: bound }
            // this.axisBounds[id] = bound
        },
        setAxisScale (id, scale) {
            debugger
            this.axisScales = { ...this.axisScales, [id]: scale }
            // this.axisScales[id] = scale
        },
        setAxisTicks (id, ticks) {
            debugger
            this.axisTicks = { ...this.axisTicks, [id]: ticks }
            // this.axisTicks[id] = ticks
        },
        // setAxisInformation (id, {
        //     domain,
        //     bounds,
        //     scale,
        //     ticks,
        // }) {
        //     debugger
        //     const {
        //         axisDomains,
        //         axisBounds,
        //         axisScales,
        //         axisTicks,
        //     } = this
        //     this.axisDomains = { ...axisDomains, [id]: domain }
        //     this.axisBounds = { ...axisBounds, [id]: bounds }
        //     this.axisScales = { ...axisScales, [id]: scale }
        //     this.axisTicks = { ...axisTicks, [id]: ticks }
        // },
    },
}
