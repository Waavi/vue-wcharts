import { shallowMount, mount } from '@vue/test-utils'
import WLegendItem from './WLegendItem.vue'

describe('Widgets/WLegendItem', () => {
    const propsData = {
        text: 'test',
        styles: {
            color: '#000',
            bulletStyles: {
                background: '#eee',
            },
        },
    }

    const defaultConfig = {
        propsData,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WLegendItem, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('It emits the handleClick event', () => {
        const wrapper = mount(WLegendItem, defaultConfig)
        wrapper.find('a').trigger('click')
        expect(wrapper.emitted('onClick')).toHaveLength(1)
    })

    it('It emits the handleMouseEnter event', () => {
        const wrapper = mount(WLegendItem, defaultConfig)
        wrapper.find('a').trigger('mouseenter')
        expect(wrapper.emitted('onMouseenter')).toHaveLength(1)
    })

    it('It emits the handleMouseleave event', () => {
        const wrapper = mount(WLegendItem, defaultConfig)
        wrapper.find('a').trigger('mouseleave')
        expect(wrapper.emitted('onMouseleave')).toHaveLength(1)
    })
})
