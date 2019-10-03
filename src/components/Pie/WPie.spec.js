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
            activeElements: [0],
            colors: ['red', 'red', 'red', 'red', 'red', 'red', 'red'],
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

    it('Should be render correctly with radius prop', () => {
        const wrapperArray = mount(WPie, {
            ...defaultConfig,
            propsData: {
                ...propsData,
                radius: [0, 50],
            },
        })

        expect(wrapperArray.vm.curRadius).toEqual([0, 50])

        const wrapperNum = mount(WPie, {
            ...defaultConfig,
            propsData: {
                ...propsData,
                radius: 5,
            },
        })

        expect(wrapperNum.vm.curRadius).toEqual([0, 100])
    })

    it('Should be render correctly with angles prop', () => {
        const wrapperArray = mount(WPie, {
            ...defaultConfig,
            propsData: {
                ...propsData,
                angles: [0, Math.PI * 3],
            },
        })

        expect(wrapperArray.vm.curAngles).toEqual([0, Math.PI * 3])

        const wrapperNum = mount(WPie, {
            ...defaultConfig,
            propsData: {
                ...propsData,
                angles: 5,
            },
        })

        expect(wrapperNum.vm.curAngles).toEqual([0, 5])
    })

    it('It emits the handleClick event', () => {
        const wrapper = mount(WPie, {
            ...defaultConfig,
            propsData: {
                ...propsData,
                trigger: 'click',
            },
        })
        wrapper.findAll('path').at(0).trigger('click')
        expect(wrapper.emitted('onClick')).toHaveLength(1)
    })

    it('It emits the handleMouseEnter  event', () => {
        const wrapper = mount(WPie, defaultConfig)
        wrapper.findAll('path').at(0).trigger('mouseenter')
        expect(wrapper.emitted('onMouseenter')).toHaveLength(1)
    })

    it('It emits the handleMouseEnter  event', () => {
        const wrapper = mount(WPie, {
            ...defaultConfig,
            propsData: {
                ...propsData,
                trigger: 'hover',
            },
        })
        wrapper.findAll('path').at(0).trigger('mouseleave')
        expect(wrapper.emitted('onMouseleave')).toHaveLength(1)
    })

    it('Should be active 1', () => {
        const wrapper = mount(WPie, defaultConfig)
        wrapper.setProps({ itemActive: 1 })
        expect(wrapper.props('itemActive')).toBe(1)
        expect(wrapper.vm.activePath).toBe(1)
    })
})
