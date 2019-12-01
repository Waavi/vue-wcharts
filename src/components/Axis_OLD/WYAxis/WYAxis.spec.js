import { shallowMount } from '@vue/test-utils'
import WYAxis from './WYAxis.vue'

describe('Axis/WYAxis', () => {
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

    const canvas = {
        x0: 40,
        y0: 10,
        width: 540,
        height: 366,
        x1: 580,
        y1: 376,
    }

    const bounds = {
        max: 8800,
        min: 10,
    }

    const propsData = {
        label: 'Y Axis',
    }

    const provide = {
        Chart: {
            dataset,
            data: dataset,
            canvas,
            bounds,
            spaceObjects: [10, 10, 10, 10],
            yScale: a => a,
            setAxisOptions: () => undefined,
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WYAxis, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly without line`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, hideLine: true } }
        const wrapper = shallowMount(WYAxis, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly without ticks lines`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, hideTickMark: true } }
        const wrapper = shallowMount(WYAxis, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
