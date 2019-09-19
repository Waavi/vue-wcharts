import requireContext from './requireContext'

export default (Vue) => {
    // https://webpack.js.org/guides/dependency-management/#require-context
    const requireComponent = requireContext(
        // Look for files in the current directory
        '../../src',
        // Do not look in subdirectories
        true,
        // Only include "_base-" prefixed .vue files
        /W[\w-]+\.vue$/
    )

    // For each matching file name...
    requireComponent.keys().forEach((fileName) => {
        // Get the component config
        const componentConfig = requireComponent(fileName)
        // Get the PascalCase version of the component name
        const componentName = componentConfig.default ? componentConfig.default.name : componentConfig.name
        // Globally register the component
        Vue.component(componentName, componentConfig.default || componentConfig)
    })
}
