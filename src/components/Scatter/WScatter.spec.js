import { shallowMount, mount } from '@vue/test-utils'
import WScatter from './WScatter.vue'
import WDot from '../Common/WDot/WDot.vue'

describe('Components/WScatter', () => {
    const dataset = [
        {
            name: 'Page A', one: 4000, two: 2400, three: 2300,
        },
        {
            name: 'Page B', one: 3000, two: 2210, three: 1398,
        },
        {
            name: 'Page C', one: 9800, two: 2200, three: 100,
        },
        {
            name: 'Page D', one: 2780, two: 3908, three: 2000,
        },
        {
            name: 'Page E', one: 1890, two: 4800, three: 1700,
        },
        {
            name: 'Page F', one: 2390, two: 3800, three: 2500,
        },
        {
            name: 'Page G', one: 3490, two: 4300, three: 2100,
        },
    ]
    const axis = {
        x: { datakey: 'one', name: 'one' },
        y: { datakey: 'two', name: 'two' },
        z: { datakey: 'three', name: 'three', range: [100, 5000] },
    }
    const colors = ['#48c0b6', '#9d6af5', '#ffde69', '#e8e8e8', '#54ddd9', '#6e19ff', '#dfbd46']
    const propsData = { }

    const provide = {
        Chart: {
            legends: ['One Bar', 'Two Bar'],
            space: [20, 20, 20, 20],
            activeElements: [0, 1],
            dataset,
            data: dataset,
            axis,
            colors,
            zScale: a => a,
            yScale: a => a,
            xScale: a => a,
            cleanActive: a => a,
            active: {
                el: null,
                event: null,
            },
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WScatter, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Shouldn't be render`, () => {
        const customConfig = { ...defaultConfig, provide: { ...defaultConfig.provide, Chart: { ...defaultConfig.provide.Chart, activeElements: [] } } }
        const wrapper = shallowMount(WScatter, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render with 7 dots`, () => {
        const wrapper = shallowMount(WScatter, defaultConfig)
        expect(wrapper.findAll(WDot)).toHaveLength(7)
    })

    it(`Shouldn be render with line`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, line: true } }
        const wrapper = shallowMount(WScatter, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('It emits the handleClick event', () => {
        const wrapper = mount(WScatter, defaultConfig)
        wrapper.find(WDot).trigger('onClick')
        expect(wrapper.emitted('onClickDot')).toHaveLength(1)
    })
})
