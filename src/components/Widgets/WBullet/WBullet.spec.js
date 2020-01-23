import { shallowMount } from '@vue/test-utils'
import WBullet from './WBullet.vue'

describe('Widgets/WBullet', () => {
    const propsData = {
        styles: {
            background: 'black',
        },
    }

    const defaultConfig = {
        propsData,
    }

    xit(`Should be render correctly`, () => {
        const wrapper = shallowMount(WBullet, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
