import { shallowMount } from '@vue/test-utils'
import WAxisText from './WAxisText.vue'

describe('Common/WAxisText', () => {
    const propsData = {
        x: 30,
        y: 135,
        index: 1,
        value: 'Page 1',
        styles: {
            stroke: '#444',
            fill: '#ddd',
            fontSize: 12,
        },
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
        const wrapper = shallowMount(WAxisText, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
