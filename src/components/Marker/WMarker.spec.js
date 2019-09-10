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
        it(`render a "${description}" ("${alias}") correctly`, () => {
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
})
