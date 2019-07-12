import { shallowMount } from '@vue/test-utils'
import WTooltip from './WTooltip.vue'

describe('Widgets/WTooltip', () => {
    const propsData = {
        id: 'test',
        gap: 0,
    }

    const provide = {
        Chart: {
            legends: ['One Bar', 'Two Bar'],
            space: [20, 20, 20, 20],
            activeElements: [0, 1],
            viewWidth: 600,
            viewHeight: 400,
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WTooltip, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
