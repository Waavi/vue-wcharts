import { shallowMount } from '@vue/test-utils'
import WPieChart from './WPieChart.vue'

describe('Charts/WCartesian', () => {
    const dataset = [
        {
            name: 'Page A',
            one: 1000,
            two: 2400,
            three: 2400,
        },
        {
            name: 'Page B',
            one: 3000,
            two: 1398,
            three: 2210,
        },
        {
            name: 'Page C',
            one: 2000,
            two: 9800,
            three: 2290,
        },
    ]
    const propsData = {
        dataset,
    }

    const defaultConfig = {
        propsData,
    }
    // TODO:
    // add slots of WPie
    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WPieChart, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
