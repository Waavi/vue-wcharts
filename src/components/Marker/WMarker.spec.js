import { shallowMount } from '@vue/test-utils'
import WMarker from './WMarker.vue'

describe('Components/WMarker', () => {
    const propsData = {
        value: {
            range: true,
            min: 1000,
            max: 3000,
        },
    }

    const provide = {
        Chart: {
            legends: ['One Bar', 'Two Bar'],
            space: [20, 20, 20, 20],
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
})
