import { shallowMount } from '@vue/test-utils'
import WCartesian from './WCartesian.vue'
import {
    WXAxis,
    WYAxis,
    // WBar,
    WCartesianGrid,
    // WLine,
    WLegend,
    // WMarker,
    WScatter,
} from '../../components'

describe('Charts/WCartesian', () => {
    const dataset = [
        {
            name: 'Page A',
            one: 1000,
            two: 2400,
            three: 2400,
        },
        {
            name: 'Page B',
            one: 3000,
            two: 1398,
            three: 2210,
        },
        {
            name: 'Page C',
            one: 2000,
            two: 9800,
            three: 2290,
        },
    ]

    const axisSlots = {
        default: [WXAxis, WYAxis],
    }
    // TODO:
    // Use components with props
    // const barAndLineSlots = {
    //   default: [<WBar datakey='one' />, <WLine datakey='one' />, <WMarker value='{range: true, min: 1000, max: 3000}' />],
    // }

    const legendAndGridSlots = {
        default: [WCartesianGrid, WLegend],
    }

    const scatterSlots = {
        default: [WScatter],
    }
    const propsData = {
        dataset,
    }

    const defaultConfig = {
        propsData,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WCartesian, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with axix`, () => {
        const wrapper = shallowMount(WCartesian, { ...defaultConfig, slots: axisSlots })
        expect(wrapper.html()).toMatchSnapshot()
    })
    /*
    TODO:
    Test slots with props
    it(`Should be render correctly with bars and lines`, () => {
        const wrapper = shallowMount(WCartesian, { ...defaultConfig, slots: barAndLineSlots })
        expect(wrapper.html()).toMatchSnapshot()
    })
    */
    it(`Should be render correctly with legend and markers`, () => {
        const wrapper = shallowMount(WCartesian, { ...defaultConfig, slots: legendAndGridSlots })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with scatter`, () => {
        const wrapper = shallowMount(WCartesian, {
            ...defaultConfig,
            propsData: { ...defaultConfig.propsData, scatter: true },
            slots: scatterSlots,
        })
        expect(wrapper.html()).toMatchSnapshot()
    })
})
