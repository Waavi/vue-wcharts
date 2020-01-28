/**
 * Get a series (array of datums) from dataset
 * @param {Object} obj
 * @param {Object[]|Object.<string, Object[]>} obj.dataset it can be a single series (array of datums) or an object with different series
 * @param {string} [obj.series] optional series identificator to specify the corresponding series to return
 * @returns {Object[]}
 */
export function getDatums ({ dataset, series }) {
    return series ? dataset[series] : dataset
}

/**
 * Obtain the corresponding value from a datum knowing its datakey.
 * @param {Object} datum
 * @param {string|number|function|Array} datakey
 * @return {any}
 */
export function datakeyValue (datum, datakey) {
    const type = typeof datakey
    if (type === 'string' || type === 'number') {
        return datum[datakey]
    }
    if (type === 'function') {
        return datakey(datum)
    }
    if (Array.isArray(datakey)) {
        return datakey.map(dk => datakeyValue(datum, dk))
    }
    return datum
}
