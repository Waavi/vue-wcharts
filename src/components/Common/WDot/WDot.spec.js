import { shallowMount, mount } from '@vue/test-utils'
import WDot from './WDot.vue'

describe('Common/WDot', () => {
    const propsData = {
        index: 0,
        cartesianIndex: 1,
        x: 50,
        y: 50,
        transition: '',
    }

    const provide = {
        Chart: {
            active: {
                el: null,
                event: null,
            },
            activeElements: [],
            setActive: () => undefined,
            cleanActive: () => undefined,
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WDot, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`It emits the onClick event`, () => {
        const wrapper = mount(WDot, defaultConfig)
        wrapper.trigger('click')
        expect(wrapper.emitted('onClick')).toHaveLength(1)
    })

    it(`It emits the onMouseenter event`, () => {
        const wrapper = mount(WDot, {
            ...defaultConfig,
            propsData: {
                ...defaultConfig.propsData,
                trigger: 'hover',
            },
        })
        wrapper.trigger('mouseenter')
        expect(wrapper.emitted('onMouseenter')).toHaveLength(1)
    })

    it(`It emits the onMouseleave event`, () => {
        const wrapper = mount(WDot, {
            ...defaultConfig,
            propsData: {
                ...defaultConfig.propsData,
                trigger: 'hover',
            },
        })
        wrapper.trigger('mouseleave')
        expect(wrapper.emitted('onMouseleave')).toHaveLength(1)
    })

    it(`Generate rStyle if has Chart.active element`, (done) => {
        const wrapper = mount(WDot, {
            ...defaultConfig,
            provide: {
                Chart: {
                    ...provide.Chart,
                    active: {
                        el: {
                            label: 'Page 1',
                            value: [
                                { color: '#000', value: 'Value 1' },
                                { color: '#000', value: 'Value 2' },
                            ],
                        },
                    },
                },
            },
        })

        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.rStyle).toEqual(4)
            done()
        })
    })
})
