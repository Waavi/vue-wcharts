import { mount } from '@vue/test-utils'
import WLine from './WLine.vue'

describe('Components/WLine', () => {
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
        {
            name: 'Page D', one: 2780, two: 3908, three: 2000, four: 1200, five: 2000,
        },
        {
            name: 'Page E', one: 1890, two: 4800, three: 1700, four: 1200, five: 1700,
        },
        {
            name: 'Page F', one: -2390, two: 3800, three: -2500, four: 1200, five: 2500,
        },
        {
            name: 'Page G', one: 3490, two: 4300, three: 2100, four: 1200, five: 2100,
        },
    ]

    const propsData = {
        index: 0,
        datakey: 'one',
    }

    const provide = {
        Chart: {
            colors: ['red', 'red', 'red', 'red', 'red', 'red', 'red'],
            legends: ['One Bar', 'Two Bar'],
            space: [20, 20, 20, 20],
            activeElements: [0, 1],
            dataset,
            xScale: a => a,
            yScale: a => a,
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = mount(WLine, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
