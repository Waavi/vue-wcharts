import { shallowMount, mount } from '@vue/test-utils'
import WDot from './WDot.vue'

describe('Common/WDot', () => {
    const propsData = {
        index: 0,
        cartesianIndex: 1,
        x: 50,
        y: 50,
        transition: '',
    }

    const provide = {
        Chart: {
            active: {
                el: null,
                event: null,
            },
            activeElements: [],
            setActive: () => undefined,
            cleanActive: () => undefined,
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WDot, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`It emits the handleClick event`, () => {
        const wrapper = mount(WDot, defaultConfig)
        wrapper.trigger('click')
        expect(wrapper.emitted('onClick')).toHaveLength(1)
    })
})
