import { createLocalVue } from '@vue/test-utils'
import registerBaseComponents from './registerBaseComponents'

// create an extended `Vue` constructor
const localVue = createLocalVue()

// App components
registerBaseComponents(localVue)

export default localVue
