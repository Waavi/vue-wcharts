# Getting Started

## Installation

### Npm

Install using yarn or npm.

```sh
yarn add vue-wcharts
```

or

```sh
npm install vue-wcharts
```

<!-- ### UMD

The UMD build is also available on unpkg.com (unpkg):

```html
<script src="//unpkg.com/vue-wcharts"></script>
``` -->

## Register

Import the library as a Vue plugin to enable the functionality globally on all components.

```js
import Vue from 'vue'
import WCharts from 'vue-wcharts'

Vue.use(WCharts)
```

<br/>

Alternatively, you may load only the components you will use.

```js
import Vue from 'vue'
import { WCartesian, WLine } from 'vue-wcharts'

Vue.component('WCartesian', WCartesian)
Vue.component('WLine', WLine)
```

<br/>

If you build tool supports it, load on demand, registering the components you need.

```vue
<template>
    <WCartesian :dataset="values">
        <WLine datakey="one" />
    </WCartesian>
</template>

<script>
import { WCartesian, WLine } from 'vue-wcharts'

export default {
  components: {
    WCartesian,
    WLine,
  },
  data() {
    return {
        values: [
            { name: 'Page A', one: 1000 },
            { name: 'Page B', one: 3000 },
            { name: 'Page C', one: 2000 },
        ]
    }
  )
}
</script>
```

<br/>
<br/>

## Basic case

### Choose your Chart

Instance a simple cartesian chart and pass data by a prop (usually an array of objects).

```vue
<template>
    <WCartesian :dataset="values" />
</template>

<script>
export default {
  data() {
    return {
        values: [
            { name: 'Page A', one: 1000 },
            { name: 'Page B', one: 3000 },
            { name: 'Page C', one: 2000 },
        ]
    }
  )
}
</script>
```

### Add your first component

Add a line chart for a specfic key on the dataset, in this case 'one'.

```vue
<template>
    <WCartesian :width="600" :height="300" :dataset="values">
        <WLine datakey="one" />
    </WCartesian>
</template>

<script>
export default {
  data() {
    return {
        values: [
            { name: 'Page A', one: 1000, two: 2400, },
            { name: 'Page B', one: 3000, two: 1398, },
            { name: 'Page C', one: 2000, two: 9800, },
        ]
    }
  )
}
</script>
```

### Add more components and plugins

Add an axis, tooltip and another line chart with the 'two' dataKey.

```vue
<template>
    <WCartesian responsive :dataset="values">
        <WLine datakey="one" dot />
        <WLine datakey="two" curve />
        <WXAxis datakey="name" />
        <WYAxis />
        <WTooltip />
    </WCartesian>
</template>

<script>
export default {
  data() {
    return {
        values: [
            { name: 'Page A', one: 1000, two: 2400, },
            { name: 'Page B', one: 3000, two: 1398, },
            { name: 'Page C', one: 2000, two: 9800, },
        ]
    }
  )
}
</script>
```

<br/>
<br/>

## Custom case

### Customize your components and plugins

For example update styles, use slots and more interactions components

```vue
<template>
    <WCartesian responsive :dataset="values">
        <WCartesianGrid />

        <WLine
            datakey="one"
            legend="One Line"
            dot
        >
            <template #dot="{ dot }">
                <text
                    :x="dot.x"
                    :y="dot.y"
                    text-anchor="center"
                >
                    {{ dot.value|percentage }} %
                </text>
            </template>
        </WLine>
        <WLine
            datakey="two"
            legend="Two Line"
            curve
        />

        <WXAxis
            datakey="name"
            :axisStyles="axisStyles"
            :tickStyles="tickStyles"
            :markStyles="markStyles" />
        <WYAxis />

        <WTooltip />
        <WLegends
            selectable />
    </WCartesian>
</template>

<script>
const markStyles = {
    stroke: 'transparent',
}
const axisStyles = {
    stroke: '#485465',
}
const tickStyles = {
    fontSize: '12px',
    fontWeight: 300,
    color: '#485465',
}

export default {
  data() {
    return {
        values: [
            { name: 'Page A', one: 1000, two: 2400, },
            { name: 'Page B', one: 3000, two: 1398, },
            { name: 'Page C', one: 2000, two: 9800, },
        ],
        axisStyles,
        tickStyles,
        markStyles,
    }
  )
}
</script>
```


### Dev

If you wish to fork, extend or develop for WCharts, you may setup the dev environment like so.

```sh
$ git clone https://github.com/Waavi/vue-wcharts.git
$ cd vue-wcharts && yarn
$ yarn serve

# Run tests
$ yarn test

# Lints and fixes files
yarn run lint

# Build
yarn build
```

<br/>
<br/>