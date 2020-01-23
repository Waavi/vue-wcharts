import { mount, shallowMount } from '@vue/test-utils'
import WSimpleHStackBar from './WSimpleHStackBar.vue'

describe('Components/WSimpleHStackBar', () => {
    const dataset = [37.3, 10.3, 23.6]
    const propsData = {
        total: 71.6,
        dataset,
        data: dataset,
    }

    const defaultConfig = {
        propsData,
    }

    xit(`Should be render correctly`, () => {
        const wrapper = shallowMount(WSimpleHStackBar, defaultConfig)
        wrapper.setData({ launchAnimation: true })
        expect(wrapper.html()).toMatchSnapshot()
    })

    xit(`Should be render correctly without stacks`, () => {
        const customConfig = { ...defaultConfig, propsData: { } }
        const wrapper = shallowMount(WSimpleHStackBar, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    xit(`Should be render correctly without total`, () => {
        const customConfig = { ...defaultConfig, propsData: { dataset } }
        const wrapper = shallowMount(WSimpleHStackBar, customConfig)
        expect(parseInt(wrapper.vm.totalValues, 10)).toEqual(71)
    })

    xit(`Should be render correctly with labels`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, showLabel: true } }
        const wrapper = shallowMount(WSimpleHStackBar, customConfig)
        wrapper.setData({ launchAnimation: true })
        expect(wrapper.html()).toMatchSnapshot()
    })

    xit(`Should be render correctly with markers`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, showLabel: true, markers: [10, 25] } }
        const wrapper = shallowMount(WSimpleHStackBar, customConfig)
        wrapper.setData({ launchAnimation: true })
        expect(wrapper.html()).toMatchSnapshot()
    })

    xit(`Should be render correctly with  3 markers`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, showLabel: true, markers: [1, 10, 25] } }
        const wrapper = shallowMount(WSimpleHStackBar, customConfig)
        wrapper.setData({ launchAnimation: true })
        expect(wrapper.findAll('.Marker')).toHaveLength(3)
    })

    xit(`Should be render correctly an invisible marker`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, showLabel: true, markers: [-10] } }
        const wrapper = shallowMount(WSimpleHStackBar, customConfig)
        wrapper.setData({ launchAnimation: true })
        expect(wrapper.find('.Marker').isVisible()).toBe(false)
    })

    describe('Events stack', () => {
        xit(`It emits the onClick event`, () => {
            const wrapper = mount(WSimpleHStackBar, defaultConfig)
            wrapper.setData({ launchAnimation: true })
            wrapper.find('.Stacks > .Stack').trigger('click')
            expect(wrapper.emitted('onClick')).toHaveLength(1)
        })

        xit(`It emits the onMouseenter event`, () => {
            const wrapper = mount(WSimpleHStackBar, {
                ...defaultConfig,
                propsData: {
                    ...defaultConfig.propsData,
                    trigger: 'manual',
                },
            })
            wrapper.setData({ launchAnimation: true })
            wrapper.find('.Stacks > .Stack').trigger('mouseenter')
            expect(wrapper.emitted('onMouseenter')).toHaveLength(1)
        })

        xit(`It emits the onMouseleave event`, () => {
            const wrapper = mount(WSimpleHStackBar, {
                ...defaultConfig,
                propsData: {
                    ...defaultConfig.propsData,
                    trigger: 'hover',
                },
            })
            wrapper.setData({ launchAnimation: true })
            wrapper.find('.Stacks > .Stack').trigger('mouseleave')
            expect(wrapper.emitted('onMouseleave')).toHaveLength(1)
        })
    })

    describe('marker stack', () => {
        xit(`It emits the onClick event`, () => {
            const wrapper = mount(WSimpleHStackBar, {
                propsData: {
                    ...defaultConfig.propsData,
                    trigger: 'click',
                    showLabel: true,
                    markers: [10, 25],
                },
            })
            wrapper.setData({ launchAnimation: true })
            wrapper.find('.Marker').trigger('click')
            expect(wrapper.emitted('onClickMarker')).toHaveLength(1)
        })

        xit(`It emits the onMouseenter event`, () => {
            const wrapper = mount(WSimpleHStackBar, {
                ...defaultConfig,
                propsData: {
                    ...defaultConfig.propsData,
                    showLabel: true,
                    markers: [10, 25],
                    trigger: 'manual',
                },
            })
            wrapper.setData({ launchAnimation: true })
            wrapper.find('.Marker').trigger('mouseenter')
            expect(wrapper.emitted('onMouseenterMarker')).toHaveLength(1)
        })

        xit(`It emits the onMouseleave event`, () => {
            const wrapper = mount(WSimpleHStackBar, {
                ...defaultConfig,
                propsData: {
                    ...defaultConfig.propsData,
                    showLabel: true,
                    markers: [10, 25],
                    trigger: 'hover',
                },
            })
            wrapper.setData({ launchAnimation: true })
            wrapper.find('.Marker').trigger('mouseleave')
            expect(wrapper.emitted('onMouseleaveMarker')).toHaveLength(1)
        })
    })

    describe('Methods', () => {
        xit(`Should be set launchAnimation data on call launch method`, () => {
            const wrapper = shallowMount(WSimpleHStackBar, defaultConfig)
            wrapper.vm.launch()
            expect(wrapper.vm.launchAnimation).toBeTruthy()
        })

        xit(`Should be set active in Cahrt after trigger event`, (done) => {
            const setActive = ({
                id, value, datum, offsetLeft,
            }) => {
                expect(id).toEqual(0)
                expect(value).toEqual([{
                    color: '#48c0b6', key: 0, value: 37.3, width: 52.0949720670391,
                }])
                expect(datum).toEqual({
                    color: '#48c0b6', hide: false, id: 0, value: 37.3, width: 52.0949720670391,
                })
                expect(offsetLeft).toEqual(10)
                done()
            }
            const wrapper = mount(WSimpleHStackBar, defaultConfig)
            wrapper.setData({ launchAnimation: true })
            wrapper.vm.setActive = setActive
            const event = {
                target: {
                    id: 0,
                    offsetLeft: 10,
                },
            }
            wrapper.vm.handleActive(event)
        })

        xit(`Should be set active in Cahrt after trigger event without stacks`, (done) => {
            const setActive = ({
                id, value, datum, offsetLeft,
            }) => {
                expect(id).toEqual(0)
                expect(value).toEqual([{
                    color: '#48c0b6', key: 0, value: undefined, width: undefined,
                }])
                expect(datum).toEqual({})
                expect(offsetLeft).toEqual(10)
                done()
            }
            const wrapper = mount(WSimpleHStackBar, {
                ...defaultConfig,
                propsData: {
                    ...propsData,
                    dataset: [],
                },
            })
            wrapper.setData({ launchAnimation: true })
            wrapper.vm.setActive = setActive
            const event = {
                target: {
                    id: 0,
                    offsetLeft: 10,
                },
            }
            wrapper.vm.handleActive(event)
        })
    })
})
