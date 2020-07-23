import { shallowMount, mount } from '@vue/test-utils'
import WPie from './WPie.vue'

describe('Components/WPie', () => {
    const propsData = {
        datakey: 'one',
        animation: false,
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

    xit(`Should be render correctly`, () => {
        const wrapper = shallowMount(WPie, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    xit('Should be render correctly with custom styles', () => {
        const wrapper = mount(WPie, { ...defaultConfig, propsData: { ...propsData, styles: { backgroundColor: 'green' } } })
        expect(wrapper.vm.stylesCmp).toEqual({ backgroundColor: 'green', position: 'relative', transform: 'translate(50%, 50%)' })
    })

    xit('Should be render correctly with custom radius', () => {
        const wrapper = mount(WPie, { ...defaultConfig, propsData: { ...propsData, radius: [150, 180] } })
        expect(wrapper.vm.curRadius).toEqual({ innerRadius: 150, outerRadius: 180 })
        expect(wrapper.html()).toMatchSnapshot()

        const wrapperTwo = mount(WPie, { ...defaultConfig, propsData: { ...propsData, radius: null } })
        expect(wrapperTwo.vm.curRadius).toEqual({ innerRadius: 0, outerRadius: 100 })
    })

    xit('It emits the handleClick event', () => {
        const wrapper = mount(WPie, { ...defaultConfig, propsData: { ...propsData, trigger: 'click' } })
        wrapper.findAll('path').at(0).trigger('click')
        expect(wrapper.emitted('onClick')).toHaveLength(1)
    })

    xit('It emits the handleMouseEnter event', () => {
        const wrapper = mount(WPie, defaultConfig)
        wrapper.findAll('path').at(0).trigger('mouseenter')
        expect(wrapper.emitted('onMouseenter')).toHaveLength(1)
    })

    xit('It emits the handleClick event', () => {
        const wrapper = mount(WPie, { ...defaultConfig, propsData: { ...propsData, trigger: 'click' } })
        wrapper.findAll('path').at(0).trigger('click')
        expect(wrapper.emitted('onClick')).toHaveLength(1)
    })

    xit('It emits the handleMouseleave event', () => {
        const wrapper = mount(WPie, { ...defaultConfig, propsData: { ...propsData, trigger: 'hover' } })
        wrapper.findAll('path').at(0).trigger('mouseleave')
        expect(wrapper.emitted('onMouseleave')).toHaveLength(1)
    })

    xit('Should be active 1', () => {
        const wrapper = mount(WPie, defaultConfig)
        wrapper.setProps({ itemActive: 1 })
        expect(wrapper.props('itemActive')).toBe(1)
        expect(wrapper.vm.activePath).toBe(1)
    })
})
