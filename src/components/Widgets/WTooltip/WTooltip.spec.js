import { mount, shallowMount } from '@vue/test-utils'
import WTooltip from './WTooltip.vue'

describe('Widgets/WTooltip', () => {
    const propsData = {
        id: 'test',
        gap: 0,
        visibleStyles: {
            backgroundColor: 'tomato',
        },
    }

    const provide = {
        Chart: {
            legends: ['One Bar', 'Two Bar'],
            space: [20, 20, 20, 20],
            activeElements: [0, 1],
            viewWidth: 600,
            viewHeight: 400,
        },
    }

    const selected = {
        el: {
            label: 'Page 1',
            value: [
                { color: '#000', value: 'Value 1' },
                { color: '#000', value: 'Value 2' },
            ],
        },
        event: {
            layerX: 123,
            layerY: 10,
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WTooltip, defaultConfig)
        wrapper.setData({ selected })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with label`, () => {
        const wrapper = shallowMount(WTooltip, defaultConfig)
        wrapper.setData({ selected: { label: 'test' } })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render correctly with values`, () => {
        const wrapper = shallowMount(WTooltip, defaultConfig)
        wrapper.setData({ selected: { value: [{ color: 'red', value: 1 }, { color: 'red', value: 2 }] } })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Shouldn't be render`, () => {
        const wrapper = shallowMount(WTooltip, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    describe('Watchers', () => {
        it(`Shouldn't be set selected if changed Chart.active`, (done) => {
            const wrapper = mount(WTooltip, defaultConfig)
            wrapper.vm.Chart = {
                ...provide.Chart,
                active: selected,
            }

            wrapper.vm.$nextTick(() => {
                expect(wrapper.html()).toMatchSnapshot()
                expect(wrapper.vm.selected).toEqual(selected.el)
                done()
            })
        })

        it(`Shouldn't be reset selected if changed Chart.active`, (done) => {
            const wrapper = mount(WTooltip, defaultConfig)
            wrapper.vm.Chart = {
                ...provide.Chart,
                active: { event: selected.event },
            }

            wrapper.vm.$nextTick(() => {
                expect(wrapper.vm.selected).toEqual(null)
                expect(wrapper.html()).toMatchSnapshot()
                done()
            })
        })
    })

    describe('Methods', () => {
        it(`Should be set visible prop to true after call show method`, () => {
            const wrapper = shallowMount(WTooltip, defaultConfig)
            wrapper.vm.show()
            expect(wrapper.vm.visible).toBeTruthy()
        })

        it(`Should be set visible prop to false after call hide method`, () => {
            const wrapper = shallowMount(WTooltip, defaultConfig)
            wrapper.vm.hide()
            expect(wrapper.vm.visible).toBeFalsy()
        })

        it(`Should be set visible prop to false and select prop after call reset method`, () => {
            const wrapper = shallowMount(WTooltip, defaultConfig)
            wrapper.vm.reset()
            expect(wrapper.vm.visible).toBeFalsy()
            expect(wrapper.vm.selected).toBeFalsy()
        })

        it(`Should be set x and y prop after call calcPos method`, () => {
            const wrapper = shallowMount(WTooltip, defaultConfig)
            wrapper.setData({ selected })
            wrapper.vm.calcPos(selected.event)
            expect(wrapper.vm.x).toEqual('123px')
            expect(wrapper.vm.y).toEqual('10px')
            expect(wrapper.html()).toMatchSnapshot()
        })
    })
})
