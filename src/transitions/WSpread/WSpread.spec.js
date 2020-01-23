import { mount, shallowMount } from '@vue/test-utils'
import WSpread from './WSpread.vue'

describe('Widgets/WSpread', () => {
    const propsData = {
        id: 'test',
        axis: 'x',
        transition: 'all 250s 250ss ease',
    }

    const defaultConfig = {
        context: {
            props: propsData,
        },
    }

    xit(`Should be render correctly`, () => {
        const wrapper = shallowMount(WSpread, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    xit(`Should be render correctly with children and axis it is x`, () => {
        const wrapper = mount({
            components: { WSpread },
            props: {
                axis: 'x',
                transition: 'all 250s 250ss ease',
            },
            template: `
              <div>
                <WSpread :transition="transition" axis="x">
                    <span>Hello</span>
                </WSpread>
              </div>
            `,
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    xit(`Should be render correctly with children and axis it is y`, () => {
        const wrapper = mount({
            components: { WSpread },
            props: {
                axis: 'y',
                transition: 'all 250s 250ss ease',
            },
            template: `
              <div>
                <WSpread :transition="transition" axis="y">
                    <span>Hello</span>
                </WSpread>
              </div>
            `,
        })
        expect(wrapper.html()).toMatchSnapshot()
    })
})
