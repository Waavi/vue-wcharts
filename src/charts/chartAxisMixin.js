import omit from 'lodash.omit'

export default {
    props: {

    },
    data () {
        return {
            /**
             * Axes stores all the relevant information for each axis
             * @property {Object.<string, Object>} axisDefs map { [axisId]: axisDefData, ... }
             * @property {string} axisDefData.dimension "x", "y", "z", "angle", "radius".
             * @property {string} axisDefData.type "numeric", "categorical".
             * @property {string|string[]} axisDefData.datakey optional datakey or array of datakeys.
             * @property {Object.<string, string>} axisDefData.datakeys a "map" of element's "uid" and their "datakeys".
             *      It must be a "map" to register who is requiring a datakey. It could be more than one element.
            */
            axisDefs: {},

            axisDataDomains: {},

            /**
             * Axes stores all the relevant information for each axis
             * @property {Object.<string, Object>} axes map { [axisId]: axisData, ... }
             * @property {string} axisData.dimension "x", "y", "z", "angle", "radius".
             * @property {string} axisData.type "numeric", "categorical".
             * @property {string|string[]} axisData.datakey optional datakey or array of datakeys.
             * @property {Object.<string, string>} axisData.datakeys a "map" of element's "uid" and their "datakeys".
             * @property {number[]} axisData.domain
             * @property {number[]} axisData.bounds
             * @property {function} axisData.scale
             * @property {number[]} axisData.ticks
            */
            axes: {},
        }
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
        registerAxis (id, {
            dimension,
            type,
            series,
            datakey,
        }) {
            const { axisDefs } = this
            const newAxisDefs = {
                ...axisDefs,
                [id]: {
                    dimension,
                    type,
                    datakey,
                    datakeys: {},
                },
            }
            if (datakey) {
                newAxisDefs[id].datakeys[id] = { series, datakey }
            }
            this.axisDefs = newAxisDefs
        },

        /**
         * Function that unregisters the axes relevant information.
         * @param {string} id identifier for the axis.
         */
        unregisterAxis (id) {
            this.axisDefs = omit(this.axisDefs, id)
        },

        /**
         * Function that registers a datakey for a specific axis.
         * @param {string} uid unique identifier for the component.
         * @param {Object} obj object with parameters.
         * @param {string} [obj.axisId] identifier for the axis.
         * @param {string} obj.series series key if needed.
         * @param {string} obj.datakey datakey. It can be namespaced by a series "{series}:{datakey}"
         */
        registerAxisDatakey (uid, {
            axisId,
            series,
            datakey,
        }) {
            const { axisDefs } = this
            if (series || datakey) {
                if (uid && axisId) {
                    const axisData = axisDefs[axisId] || {}
                    const newAxisDefs = {
                        ...axisDefs,
                        [axisId]: {
                            ...axisData,
                            datakeys: {
                                ...(axisData.datakeys || {}),
                                [uid]: {
                                    series,
                                    datakey,
                                },
                            },
                        },
                    }
                    this.axisDefs = newAxisDefs
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
            const { axisDefs } = this
            this.axisDefs = Object.keys(axisDefs).reduce(
                (acc, axisId) => ({
                    ...acc,
                    [axisId]: {
                        ...axisDefs[axisId],
                        datakeys: omit(axisDefs[axisId].datakeys || {}, uid),
                    },
                }),
                {}
            )
        },

        setAxisData (id, {
            domain,
            bounds,
            scale,
            ticks,
        }) {
            const { axisDefs, axes } = this
            const newAxes = {
                ...axes,
                [id]: {
                    ...(axisDefs[id] || {}),
                    ...(axes[id] || {}),
                    domain,
                    bounds,
                    scale,
                    ticks,
                },
            }
            this.axes = newAxes
        },
    },
}
