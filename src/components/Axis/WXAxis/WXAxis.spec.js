import { shallowMount } from '@vue/test-utils'
import WXAxis from './WXAxis.vue'

describe('Axis/WXAxis', () => {
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

    const snap = { linesByIndex: { } }

    const propsData = {
        datakey: 'name',
        label: 'X Axis',
    }

    const provide = {
        Chart: {
            dataset,
            data: dataset,
            canvas,
            bounds,
            snap,
            padding: [20, 20, 20, 20],
            spaceObjects: [10, 10, 10, 10],
            yScale: a => a,
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WXAxis, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly without line`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, hideLine: true } }
        const wrapper = shallowMount(WXAxis, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly without ticks lines`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, hideTickMark: true } }
        const wrapper = shallowMount(WXAxis, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with negative values`, () => {
        const customConfig = { ...defaultConfig, provide: { ...defaultConfig.provide, Chart: { ...defaultConfig.provide.Chart, bounds: { max: 10000, min: -1000 } } } }
        const wrapper = shallowMount(WXAxis, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
