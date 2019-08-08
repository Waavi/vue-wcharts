import { shallowMount } from '@vue/test-utils'
import WShowIfFit from './WShowIfFit.vue'

describe('Widgets/WShowIfFit', () => {
    const propsData = {}
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

    it(`Should be check if show or hide child component`, () => {
        const wrapper = shallowMount(WShowIfFit, defaultConfig)

        Object.defineProperty(wrapper.vm.$el, 'parentNode', {
            get () {
                return {
                    appendChild: () => undefined,
                    removeChild: () => undefined,
                    clientWidth: 25,
                }
            },
        })

        Object.defineProperty(wrapper.vm.$el, 'children', {
            get () {
                return [
                    {
                        appendChild: () => undefined,
                        removeChild: () => undefined,
                        offsetWidth: 50,
                    },
                ]
            },
        })

        wrapper.vm.handleSize()
        expect(wrapper.vm.hide).toBeTruthy()
        expect(wrapper.html()).toMatchSnapshot()
    })
})
