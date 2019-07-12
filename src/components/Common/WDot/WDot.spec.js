import { shallowMount } from '@vue/test-utils'
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

    // xit(`Should be handle activeElements in Chart after moouse enter WDotItem`, () => {
    //     const wrapper = shallowMount(WDot, defaultConfig)
    //     wrapper.vm.handleMouseEnter({ legend: undefined, index: 0 })
    //     expect(wrapper.vm.Chart.activeElements).toEqual([1])
    // })
})
