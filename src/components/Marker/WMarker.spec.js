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
            scaledX: a => 5,
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

    const defaultConfigForProps = (propsData = {}) => ({
        propsData,
        provide,
    })

    function snapshot (description, alias, props) {
        xit(`render a "${description}" ("${alias}") correctly`, () => {
            const wrapper = shallowMount(WMarker, defaultConfigForProps(props))
            expect(wrapper.html()).toMatchSnapshot()
        })
    }

    snapshot('vertical marker', 'xLine', { x: 10 })
    snapshot('horizontal marker', 'yLine', { y: 10 })
    snapshot('point marker', 'point', { x: 10, y: 20 })
    snapshot('vertical range marker', 'xRange', { x: [10, 20] })
    snapshot('horizontal range marker', 'yRange', { y: [10, 20] })
    snapshot('area marker', 'rect', { x: [10, 20], y: [30, 40] })

    xit(`Should be render correctly, check labelCoordinates if has type XLine`, () => {
        const wrapper = shallowMount(WMarker, defaultConfigForProps({ x: 10, labelAlign: 'start' }))
        expect(wrapper.vm.labelCoordinates).toEqual({ dy: -10, x: -195, y: 381 })
    })

    xit(`Should be render correctly, check labelCoordinates if has type YLine`, () => {
        const wrapper = shallowMount(WMarker, defaultConfigForProps({ y: 10, labelAlign: 'start' }))
        expect(wrapper.vm.labelCoordinates).toEqual({ dy: -10, x: 45, y: 10 })
    })

    xit(`Should be render correctly, check labelCoordinates if has type point`, () => {
        const wrapper = shallowMount(WMarker, defaultConfigForProps({ x: 10, y: 20, labelAlign: 'start' }))
        expect(wrapper.vm.labelCoordinates).toEqual({})
    })

    describe('Methods', () => {
        xit(`Should be return getBorderSpacing, if has type xRange`, () => {
            const wrapper = shallowMount(WMarker, defaultConfigForProps({ x: [10, 20], borderSpacing: [10, 10, 10, 10], labelAlign: 'start' }))
            expect(wrapper.vm.getBorderSpacing({ index: 1, isX: true, isCategory: true })).toEqual(2500)
        })

        xit(`Should be return getBorderSpacing, if has type yRange`, () => {
            const wrapper = shallowMount(WMarker, defaultConfigForProps({ y: [10, 20], borderSpacing: [10, 10, 10, 10], labelAlign: 'start' }))
            expect(wrapper.vm.getBorderSpacing({ index: 1, isX: false, isCategory: true })).toEqual(1630)
        })
    })
})
