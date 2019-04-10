/**
 * @param  {} options - Options slots
 * @param  {} prop - Name of prop
 */
const props = (options = {}, name) => {
    if (!name) return options.propsData
    const ref = options.Ctor.options.props[name]
    const defaultValue = ref && ref.default()
    return options.propsData[name] || defaultValue
}

export default {
    props,
}
