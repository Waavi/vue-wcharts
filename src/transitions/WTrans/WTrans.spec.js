import { mount, shallowMount } from '@vue/test-utils'
import WTrans from './WTrans.vue'

jest.useFakeTimers()

describe('Widgets/WTrans', () => {
    const propsData = {
        id: 'test',
        initialProps: {
            opacity: 0,
        },
        transition: 'all 250s 250ss ease',
    }

    const defaultConfig = {
        context: {
            props: propsData,
        },
    }

    xit(`Should be render correctly`, () => {
        const wrapper = shallowMount(WTrans, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    xit(`Should be render correctly with children`, () => {
        const wrapper = mount({
            components: { WTrans },
            props: {
                initialProps: {
                    opacity: 0,
                },
                transition: 'all 250s 250ss ease',
            },
            template: `
              <div>
                <WTrans :initialProps="initialProps" :transition="transition">
                    <span>Hello</span>
                </WTrans>
              </div>
            `,
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    xit(`Should be render correctly with children`, (done) => {
        const h = (tag, { props, on }) => {
            const el = {
                getAttribute: (key) => {},
                setAttribute: (key, value) => {},
                style: {},
            }

            expect(tag).toEqual('transition')
            expect(props.appear).toBeTruthy()

            on.beforeAppear(el)
            on.appear(el)

            expect(setTimeout).toHaveBeenCalledTimes(1)
            done()
        }
        expect(WTrans.render(h, { props: propsData })).toMatchSnapshot()
    })
})
