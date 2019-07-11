import { shallowMount } from '@vue/test-utils'
import WLegendItem from './WLegendItem.vue'

describe('Widgets/WLegendItem', () => {
    const propsData = {
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
})
