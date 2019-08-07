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
        wrapper.setData({ selected: { } })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with label`, () => {
        const wrapper = shallowMount(WTooltip, defaultConfig)
        wrapper.setData({ selected: { label: 'test' } })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with values`, () => {
        const wrapper = shallowMount(WTooltip, defaultConfig)
        wrapper.setData({ selected: { value: [{ color: 'red', value: 1 }, { color: 'red', value: 2 }] } })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Shouldn't be render`, () => {
        const wrapper = shallowMount(WTooltip, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
