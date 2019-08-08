import { shallowMount } from '@vue/test-utils'
import WSimpleHStackBar from './WSimpleHStackBar.vue'

describe('Components/WLine', () => {
    const propsData = {
        total: 71.6,
        dataset: [37.3, 10.3, 23.6],
    }

    const defaultConfig = {
        propsData,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WSimpleHStackBar, defaultConfig)
        wrapper.setData({ launchAnimation: true })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly without stacks`, () => {
        const customConfig = { ...defaultConfig, propsData: { } }
        const wrapper = shallowMount(WSimpleHStackBar, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with labels`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, showLabel: true } }
        const wrapper = shallowMount(WSimpleHStackBar, customConfig)
        wrapper.setData({ launchAnimation: true })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with markers`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, showLabel: true, markers: [10, 25] } }
        const wrapper = shallowMount(WSimpleHStackBar, customConfig)
        wrapper.setData({ launchAnimation: true })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with  3 markers`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, showLabel: true, markers: [1, 10, 25] } }
        const wrapper = shallowMount(WSimpleHStackBar, customConfig)
        wrapper.setData({ launchAnimation: true })
        expect(wrapper.findAll('.Marker')).toHaveLength(3)
    })

    it(`Should be render correctly an invisible marker`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, showLabel: true, markers: [-10] } }
        const wrapper = shallowMount(WSimpleHStackBar, customConfig)
        wrapper.setData({ launchAnimation: true })
        expect(wrapper.find('.Marker').isVisible()).toBe(false)
    })
})
