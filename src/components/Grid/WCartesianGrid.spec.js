import { shallowMount, mount } from '@vue/test-utils'
import WCartesianGrid from './WCartesianGrid.vue'

describe('Components/WCartesianGrid', () => {
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
        hideH: true,
        hideV: true,
    }

    const provide = {
        Chart: {
            dataset,
            data: dataset,
        },
    }

    const propsDataWithLines = {
        hideH: false,
        hideV: false,
        numLinesH: 1,
        numLinesV: 1,
        styles: {
            stroke: '000',
            strokeWidth: 1,
            strokeDasharray: 0,
        },
    }

    const provideWithLines = {
        ...provide,
        Chart: {
            ...provide.Chart,
            dataset,
            data: dataset,
            canvas: {
                width: 680,
                x0: 50,
                y0: 25,
                x1: 500,
                y1: 250,
            },
            padding: [0, 0, 0, 0],
            bounds: {
                max: 9490,
                min: 780,
            },
            xBounds: {
                max: 9490,
                min: 780,
            },
            xScale: a => a,
            yScale: a => a,
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    const defaultConfigWithLines = {
        propsData: propsDataWithLines,
        provide: provideWithLines,
    }

    it(`Should be render correctly without lines`, () => {
        const wrapper = shallowMount(WCartesianGrid, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with lines`, () => {
        const wrapper = mount(WCartesianGrid, defaultConfigWithLines)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with 3 lines`, () => {
        const wrapper = mount(WCartesianGrid, defaultConfigWithLines)
        expect(wrapper.findAll('line')).toHaveLength(3)
    })
})
