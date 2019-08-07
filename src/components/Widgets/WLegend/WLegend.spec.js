import { shallowMount } from '@vue/test-utils'
import WLegend from './WLegend.vue'

describe('Widgets/WLegend', () => {
    const customStyles = {
        backgroundColor: '#000',
    }
    const propsData = {
        position: 'top',
        align: 'start',
        selectable: true,
        space: [20, 20, 20, 20],
        styles: customStyles,
        wrapperStyles: customStyles,
        legendStyles: customStyles,
        bulletStyles: customStyles,
    }

    const provide = {
        Chart: {
            legends: ['One Bar', 'Two Bar'],
            space: [20, 20, 20, 20],
            activeElements: [0, 1],
        },
    }

    const provideWithoutLegends = {
        Chart: {
            legends: [],
            space: [20, 20, 20, 20],
            activeElements: [],
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WLegend, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Shouldn't be render`, () => {
        const wrapper = shallowMount(WLegend, { ...defaultConfig, provide: provideWithoutLegends })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be handle activeElements in Chart after click WLegendItem`, () => {
        const wrapper = shallowMount(WLegend, defaultConfig)
        wrapper.vm.handleClick({ legend: undefined, index: 0 })
        expect(wrapper.vm.Chart.activeElements).toEqual([1])
    })
})
