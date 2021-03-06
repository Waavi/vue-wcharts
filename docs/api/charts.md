---
sidebarDepth: 3
---
# Charts

## WCartesian

<br>
<Api-Cartesian />

### Child components
**[\<WLine />](/api/components.html#wline)**
**[\<WBar />](/api/components.html#wbar)**
**[\<WCartesianGrid />](/api/components.html#wcartesiangrid)**
**[\<WScatter />](/api/components.html#wscatter)**
**[\<WXAxis />](/api/components.html#wxaxis)**
**[\<WYAxis />](/api/components.html#wyaxis)**
**[\<WZAxis />](/api/components.html#wzaxis)**
**[\<WMarker />](/api/components.html#wmarker)**
**[\<WTooltip />](/api/widgets.html#wtooltip)**
**[\<WLegend />](/api/widgets.html#wlegends)**
**Valid SVG elements**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| dataset | array | [] | Chart data, example:  ```[{name: 'Page A', one: 3000, two: 1400, three: 400}, ...]``` |
| responsive | bool | false | If true set, the container is responsive |
| height | number | 400 | The height of the chart container in pixels |
| width | number | 600 | The width of the chart container in pixels |
| gap | array | 0 or [0, 0, 0, 0] | Padding inside the chart space |
| colors | array | ```['#3fb1e3',  '#6be6c1',  '#626c91',  '#a0a7e6',  '#c4ebad',  '#96dee8',  '#013566',  '##ff4f81'  ]``` | Colors palette |
| scatter | bool | false | If true set, the chart is scatter  |
| bound | array | [] | Y axis bounds, can be function or number |
| xBound | array | [] | X axis bounds, can be function or number |


### Zones

<br>
<Api-Zones />

## WPieChart

<Api-PieChart />

### Child components
**[\<WPie />](/api/components.html#wpie)**
**[\<WTooltip />](/api/widgets.html#wtooltip)**
**[\<WLegend />](/api/widgets.html#wlegends)**
**Valid SVG elements**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| dataset | array | [] | Chart data, example:  ```[{name: 'Page A', one: 3000, two: 1400, three: 400}, ...]``` |
| responsive | bool | false | If true set, the container is responsive |
| height | number | 400 | The height of the chart container in pixels |
| width | number | 600 | The width of the chart container in pixels |
| cx | string | 50% | Pie percentage width |
| cy | string | 50% | Pie percentage height |
| startAngle | number | 0 | Angle start Pie |
| endAngle | number | 360 | Angle end Pie |
| paddingAngle | number | 0 | Padding between angles (paths) |
| colors | array | ```['#3fb1e3',  '#6be6c1',  '#626c91',  '#a0a7e6',  '#c4ebad',  '#96dee8',  '#013566',  '##ff4f81'  ]``` | Colors palette |
