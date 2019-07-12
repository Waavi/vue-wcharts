import { mount, shallowMount } from '@vue/test-utils'
import WShowIfFit from './WShowIfFit.vue'

describe('Widgets/WShowIfFit', () => {
    const propsData = {}
    const Wrapper = {
        name: 'Wrapper',
        template: `
            <div id="test" style="width: 200px; height: 50px;">
                <slot></slot>
            </div>
        `,
    }
    const Parent = {
        name: 'parent',
        components: {
            Wrapper,
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
        const wrapper = shallowMount(WShowIfFit, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
