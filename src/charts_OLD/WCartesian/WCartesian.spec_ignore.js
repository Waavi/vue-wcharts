// import { shallowMount, mount } from '@vue/test-utils'
// import localVue from '../../../config/tests'
// import WCartesian from './WCartesian.vue'
// import {
//     WXAxis,
//     WYAxis,
//     // WBar,
//     WCartesianGrid,
//     // WLine,
//     WLegend,
//     // WMarker,
//     WScatter,
// } from '../../components'

// describe('Charts/WCartesian', () => {
//     const dataset = [
//         {
//             name: 'Page A',
//             one: 1000,
//             two: 2400,
//             three: 2400,
//         },
//         {
//             name: 'Page B',
//             one: 3000,
//             two: 1398,
//             three: 2210,
//         },
//         {
//             name: 'Page C',
//             one: 2000,
//             two: 9800,
//             three: 2290,
//         },
//     ]

//     const axisSlots = {
//         default: [WXAxis, WYAxis],
//     }

//     const legendAndGridSlots = {
//         default: [WCartesianGrid, WLegend],
//     }

//     const scatterSlots = {
//         default: [WScatter],
//     }
//     const propsData = {
//         dataset,
//     }

//     const defaultConfig = {
//         localVue,
//         propsData,
//     }

//     xit(`Should be render correctly`, () => {
//         const wrapper = shallowMount(WCartesian, defaultConfig)
//         expect(wrapper.html()).toMatchSnapshot()
//     })

//     xit(`Should be render responsive mode correctly`, () => {
//         const wrapper = shallowMount(WCartesian, {
//             ...defaultConfig,
//             propsData: {
//                 ...propsData,
//                 responsive: true,
//             },
//         })
//         expect(wrapper.html()).toMatchSnapshot()
//     })

//     xit(`Should be render correctly with axix`, () => {
//         const wrapper = shallowMount(WCartesian, { ...defaultConfig, slots: axisSlots })
//         expect(wrapper.html()).toMatchSnapshot()
//     })

//     xit(`Should be render correctly, with gap it is a number and array of numbers`, () => {
//         const wrapperNumber = shallowMount(WCartesian, {
//             ...defaultConfig,
//             propsData: {
//                 ...defaultConfig.propsData,
//                 gap: 5,
//             },
//             slots: axisSlots,
//         })
//         expect(wrapperNumber.html()).toMatchSnapshot()

//         const wrapperArray = shallowMount(WCartesian, {
//             ...defaultConfig,
//             propsData: {
//                 ...defaultConfig.propsData,
//                 gap: [5, 5, 5, 5],
//             },
//             slots: axisSlots,
//         })
//         expect(wrapperArray.html()).toMatchSnapshot()
//     })

//     xit(`Should be render correctly with bars and lines`, () => {
//         const wrapper = shallowMount(WCartesian, {
//             ...defaultConfig,
//             slots: {
//                 default: `
//                     <WBar id="testBar" datakey="one" />
//                     <WLine datakey="one" legend="One Line" />
//                     <WLegend position="top" align="end" selectable />
//                 `,
//             },
//         })
//         expect(wrapper.html()).toMatchSnapshot()
//     })

//     xit(`Should be ommit children components not allowed`, () => {
//         const wrapper = mount(WCartesian, {
//             ...defaultConfig,
//             slots: {
//                 default: `
//                     <WLine datakey="two" />
//                     <WPie datakey="one" :radius="[110, 150]" />
//                     <WTooltip />
//                 `,
//             },
//         })

//         expect(wrapper).toMatchSnapshot()
//     })

//     xit(`Should be render correctly with legend and markers`, () => {
//         const wrapper = shallowMount(WCartesian, { ...defaultConfig, slots: legendAndGridSlots })
//         expect(wrapper.html()).toMatchSnapshot()
//     })

//     xit(`Should be render correctly with scatter check xBounds`, () => {
//         const wrapper = shallowMount(WCartesian, {
//             ...defaultConfig,
//             propsData: {
//                 ...defaultConfig.propsData,
//                 scatter: true,
//                 xBound: [0, 100],
//             },
//             slots: {
//                 default: `
//                     <WXAxis id="testBar" datakey="two" />
//                     <WLine datakey="one" legend="One Line" />
//                     <WLegend position="top" align="end" selectable />
//                 `,
//             },
//         })
//         expect(wrapper.vm.xBounds).toEqual({ max: 100, min: 0 })
//     })

//     xit(`Should be render correctly with scatter check zBounds`, () => {
//         const wrapper = shallowMount(WCartesian, {
//             ...defaultConfig,
//             propsData: {
//                 ...defaultConfig.propsData,
//                 scatter: true,
//             },
//             slots: {
//                 default: `
//                     <WZAxis id="testBar" datakey="two" />
//                     <WLine datakey="one" legend="One Line" />
//                     <WLegend position="top" align="end" selectable />
//                 `,
//             },
//         })
//         expect(wrapper.vm.zBounds).toEqual({ max: 9800, min: 1398 })
//     })

//     xit(`Should be render correctly without scatter check zBounds`, () => {
//         const wrapper = shallowMount(WCartesian, {
//             ...defaultConfig,
//             slots: {
//                 default: `
//                     <WZAxis id="testBar" datakey="two" />
//                     <WLine datakey="one" legend="One Line" />
//                     <WLegend position="top" align="end" selectable />
//                 `,
//             },
//         })
//         expect(wrapper.vm.zBounds).toEqual({ max: 0, min: 0 })
//     })

//     xit(`Should be render correctly with scatter`, () => {
//         const wrapper = shallowMount(WCartesian, {
//             ...defaultConfig,
//             propsData: { ...defaultConfig.propsData, scatter: true },
//             slots: scatterSlots,
//         })
//         expect(wrapper.html()).toMatchSnapshot()
//     })

//     xit(`Should be return bound ox x axis`, () => {
//         const wrapper = mount(WCartesian, { ...defaultConfig })
//         const bound = wrapper.vm.getBound('10', 'min')
//         expect(bound).toEqual(0)

//         const boundMax = wrapper.vm.getBound(n => n + 1000, 'max')
//         expect(boundMax).toEqual(1000)
//     })

//     xit(`Should be calc bound if execute sanitizeBounds method correctly`, () => {
//         const wrapper = shallowMount(WCartesian, { ...defaultConfig, slots: axisSlots })
//         expect(wrapper.vm.sanitizeBounds({ min: 0, max: 0 })).toEqual({ min: 0, max: 1 })
//         expect(wrapper.vm.sanitizeBounds({ min: -1, max: -1 })).toEqual({ min: 2, max: 0 })
//         expect(wrapper.vm.sanitizeBounds({ min: 2, max: 2 })).toEqual({ min: 0, max: 4 })
//     })
// })
