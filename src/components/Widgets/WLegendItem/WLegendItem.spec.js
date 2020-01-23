import { shallowMount, mount } from '@vue/test-utils'
import WLegendItem from './WLegendItem.vue'

describe('Widgets/WLegendItem', () => {
    const propsData = {
        text: 'test',
        trigger: 'click',
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

    xit(`Should be render correctly`, () => {
        const wrapper = shallowMount(WLegendItem, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    xit('It emits the handleClick event', () => {
        const wrapper = mount(WLegendItem, defaultConfig)
        wrapper.find('a').trigger('click')
        expect(wrapper.emitted('onClick')).toHaveLength(1)
    })

    xit('It emits the handleMouseEnter event', () => {
        const wrapper = mount(WLegendItem, defaultConfig)
        wrapper.find('a').trigger('mouseenter')
        expect(wrapper.emitted('onMouseenter')).toHaveLength(1)
    })

    xit('It emits the handleMouseleave event', () => {
        const wrapper = mount(WLegendItem, defaultConfig)
        wrapper.find('a').trigger('mouseleave')
        expect(wrapper.emitted('onMouseleave')).toHaveLength(1)
    })
})
