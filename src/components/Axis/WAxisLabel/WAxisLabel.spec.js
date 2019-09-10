import { shallowMount } from '@vue/test-utils'
import WAxisLabel from './WAxisLabel.vue'

describe('Common/WAxisLabel', () => {
    const propsData = {
        textAnchor: 'middle',
        transform: 'rotate(-90 30 135)',
        value: ['Production loss from potential', 'out of service (€/year)'],
        x: 30,
        y: 135,
        styles: {
            fontSize: '12px',
            color: '#444',
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
        const wrapper = shallowMount(WAxisLabel, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
