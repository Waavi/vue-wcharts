import { shallowMount } from '@vue/test-utils'
import WShowIfFit from './WShowIfFit.vue'

describe('Widgets/WShowIfFit', () => {
    const propsData = {}
    const Parent = {
        name: 'parent',
        components: {
            WShowIfFit,
        },
        template: `
            <div id="test" style="width: 25px; height: 50px;">
                <WShowIfFit id="component">
                    <div id="child" style="width: 50px; height: 25px;">
                    </div>
                </WShowIfFit>
            </div>
        `,
    }
    const defaultConfig = {
        propsData,
        slots: {
            default: ['<div />'],
        },
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(Parent, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
