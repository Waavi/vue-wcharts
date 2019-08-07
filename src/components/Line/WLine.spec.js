import { shallowMount, mount } from '@vue/test-utils'
import WLine from './WLine.vue'
import WDot from '../Common/WDot/WDot.vue'

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
    ]

    const propsData = {
        index: 0,
        datakey: 'one',
        styles: {
            stroke: 'FFF',
        },
    }

    const provide = {
        Chart: {
            colors: ['red', 'red', 'red', 'red', 'red', 'red', 'red'],
            legends: ['One Bar', 'Two Bar'],
            space: [20, 20, 20, 20],
            activeElements: [0],
            canvas: {
                x0: 50, y0: 25, x1: 500, y1: 250,
            },
            dataset,
            xScale: a => a,
            yScale: a => a,
        },
    }

    const dotConfig = {
        propsData: { ...propsData, dot: true },
        provide: {
            ...provide,
            Chart: {
                ...provide.Chart,
                datakeys: ['one', 'two', 'three'],
                colors: ['red', 'red', 'red'],
                axis: {
                    x: {
                        datakey: 'name',
                        name: '',
                    },
                },
                active: {
                    el: null,
                },
            },
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WLine, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with dots`, () => {
        const wrapper = shallowMount(WLine, dotConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Shouldn't be render`, () => {
        const wrapper = shallowMount(WLine, { ...defaultConfig, propsData: { ...propsData, index: 2 } })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with 3 dots`, () => {
        const wrapper = shallowMount(WLine, dotConfig)
        expect(wrapper.findAll(WDot)).toHaveLength(3)
    })

    it(`Should be render correctly with area`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, area: true } }
        const wrapper = shallowMount(WLine, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with custom color area `, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, area: true, styles: { fill: 'red' } } }
        const wrapper = shallowMount(WLine, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('It emits the handleMouseEnter event', () => {
        const wrapper = mount(WLine, defaultConfig)
        wrapper.find('path').trigger('mouseenter')
        expect(wrapper.emitted('onMouseEnter')).toHaveLength(1)
    })

    it('It emits the mouseleave event', () => {
        const wrapper = mount(WLine, defaultConfig)
        wrapper.find('path').trigger('mouseleave')
        expect(wrapper.emitted('onMouseLeave')).toHaveLength(1)
    })
    // TODO:
    // for some reason that  throw an error
    // [Vue warn]: Invalid handler for event "mouseleave": got undefined
    /* it('It emits the onClick event', () => {
        const wrapper = mount(WLine, dotConfig)
        wrapper.find(WDot).trigger('onClick')
        expect(wrapper.emitted('onClickDot')).toHaveLength(1)
    }) */
})
