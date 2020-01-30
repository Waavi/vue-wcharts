import { shallowMount } from '@vue/test-utils'
import WGauge from './WGauge.vue'

describe('Components/WGauge', () => {
    const propsData = {
        datakey: 'one',
        animation: false,
        index: 0,
    }
    const dataset = [
        {
            name: 'Page A', one: 70, total: 100,
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
        const wrapper = shallowMount(WGauge, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render radius correctly`, () => {
        const wrapper = shallowMount(WGauge, defaultConfig)
        expect(wrapper.vm.curRadius).toMatchSnapshot()
    })

    it(`Should be render styles correctly`, () => {
        const wrapper = shallowMount(WGauge, defaultConfig)
        expect(wrapper.vm.contentStyles).toMatchSnapshot()
    })
})
