import { shallowMount, mount } from '@vue/test-utils'
import WPie from './WPie.vue'

describe('Components/WPie', () => {
    const propsData = {
        datakey: 'one',
        index: 0,
    }
    const dataset = [
        {
            name: 'Page A', one: 1000, two: 2400, three: 2400,
        },
        {
            name: 'Page B', one: 3000, two: 1398, three: 2210,
        },
        {
            name: 'Page C', one: 2000, two: 9800, three: 2290,
        },
        {
            name: 'Page D', one: 2780, two: 3908, three: 2000,
        },
        {
            name: 'Page E', one: 1890, two: 0, three: 1700,
        },
        {
            name: 'Page F', one: 2390, two: 3800, three: 2500,
        },
        {
            name: 'Page G', one: 3490, two: 4300, three: -1000,
        },
    ]

    const provide = {
        Chart: {
            dataset,
            data: dataset,
            width: 740,
            height: 400,
            cx: '50%',
            cy: '50%',
            startAngle: 0,
            endAngle: 360,
            paddingAngle: 0,
            activeElements: [0],
            colors: ['red', 'red', 'red', 'red', 'red', 'red', 'red'],
            curCx: 300,
            curCy: 200,
            setActive: () => undefined,
            cleanActive: () => undefined,
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WPie, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('It emits the handleClick event', () => {
        const wrapper = mount(WPie, defaultConfig)
        wrapper.findAll('path').at(0).trigger('click')
        expect(wrapper.emitted('onClick')).toHaveLength(1)
    })

    it('It emits the handleMouseEnter  event', () => {
        const wrapper = mount(WPie, defaultConfig)
        wrapper.findAll('path').at(0).trigger('mouseenter')
        expect(wrapper.emitted('onMouseenter')).toHaveLength(1)
    })

    it('Should be active 1', () => {
        const wrapper = mount(WPie, defaultConfig)
        wrapper.setProps({ itemActive: 1 })
        expect(wrapper.props('itemActive')).toBe(1)
        expect(wrapper.vm.activePath).toBe(1)
    })
})
