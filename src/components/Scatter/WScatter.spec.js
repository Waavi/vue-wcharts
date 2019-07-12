import { shallowMount } from '@vue/test-utils'
import WScatter from './WScatter.vue'

describe('Components/WScatter', () => {
    const propsData = {
        line: true,
    }

    const provide = {
        Chart: {
            legends: ['One Bar', 'Two Bar'],
            space: [20, 20, 20, 20],
            activeElements: [0, 1],
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WScatter, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
