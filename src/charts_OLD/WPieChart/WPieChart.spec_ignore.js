// import { mount, shallowMount } from '@vue/test-utils'
// import localVue from '../../../config/tests'
// import WPieChart from './WPieChart.vue'

// describe('Charts/WPieChart', () => {
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
//     const propsData = {
//         dataset,
//     }

//     const defaultConfig = {
//         localVue,
//         propsData,
//     }

//     xit(`Should be render correctly`, () => {
//         const wrapper = shallowMount(WPieChart, defaultConfig)
//         expect(wrapper.html()).toMatchSnapshot()
//     })

//     xit(`Should be render responsive mode correctly`, () => {
//         const wrapper = shallowMount(WPieChart, {
//             ...defaultConfig,
//             propsData: {
//                 ...propsData,
//                 responsive: true,
//             },
//         })
//         expect(wrapper.html()).toMatchSnapshot()
//     })

//     xit(`Should be render correctly with WPie component and WTooltip`, () => {
//         const wrapper = mount(WPieChart, {
//             ...defaultConfig,
//             slots: {
//                 default: `
//                     <WPie datakey="one" :radius="[110, 150]" />
//                     <WTooltip />
//                 `,
//             },
//         })

//         expect(wrapper).toMatchSnapshot()
//     })

//     xit(`Should be ommit children components not allowed`, () => {
//         const wrapper = mount(WPieChart, {
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
// })
