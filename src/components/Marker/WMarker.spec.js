import { shallowMount } from '@vue/test-utils'
import WMarker from './WMarker.vue'

describe('Components/WMarker', () => {
    const dataset = [
        {
            name: 'Page A', one: 4000, two: -2400, three: 2300, four: 1200, five: 2300,
        },
        {
            name: 'Page B', one: 3000, two: 2210, three: 1398, four: 1200, five: 1398,
        },
        {
            name: 'Page C', one: 9800, two: 2200, three: 0, four: 1200, five: 0,
        },
    ]

    const propsData = {
        value: {
            range: true,
            min: 1000,
            max: 3000,
        },
    }

    const provide = {
        Chart: {
            dataset,
            data: dataset,
            axis: { x: { datakey: 'name', name: '' } },
            legends: ['One Bar', 'Two Bar'],
            space: [20, 20, 20, 20],
            padding: [20, 20, 20, 20],
            activeElements: [0, 1],
            yScale: a => a,
            canvas: {
                x0: 40,
                y0: 10,
                width: 540,
                height: 366,
                x1: 580,
                y1: 376,
            },
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WMarker, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with x type`, () => {
        const wrapper = shallowMount(WMarker, {
            ...defaultConfig,
            propsData: {
                ...defaultConfig.propsData,
                type: 'x',
            },
        })
        expect(wrapper.html()).toMatchSnapshot()
    })
})
