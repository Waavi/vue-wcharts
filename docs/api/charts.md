---
sidebarDepth: 3
---
# Charts

## WCartesian

*Cartesian chart.*

### Child components
**[\<WLine />](/docs/api/components.html#wline)**
**[\<WBar />](/docs/api/components.html#wbar)**
**[\<WCartesianGrid />](/docs/api/components.html#wcartesiangrid)**
**[\<WScatter />](/docs/api/components.html#wscatter)**
**[\<WXAxis />](/docs/api/components.html#wxaxis)**
**[\<WYAxis />](/docs/api/components.html#wyaxis)**
**[\<WZAxis />](/docs/api/components.html#wzaxis)**
**[\<WMarker />](/docs/api/components.html#wmarker)**
**[\<WTooltip />](/docs/api/widgets.html#wtooltip)**
**[\<WLegends />](/docs/api/widgets.html#wlegends)**
**Validate SVG elements**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| dataset | array | [] | Chart data, example:  ```[{name: 'Page A', one: 3000, two: 1400, three: 400}, ...]``` |
| responsive | bool | false | If true set, the container is responsive |
| height | number | 400 | The height of the chart container in pixels |
| width | number | 600 | The width of the chart container in pixels |
| stacked | bool | false | If true set, the bars are stacked |
| scatter | bool | false | If true set, the chart is scatter  |
| bound | array | [] | Y axis bounds, can be function or number |
| xBound | array | [] | X axis bounds, can be function or number |
| gap | array | 0 or [0, 0, 0, 0] | Padding inside the chart space |
| colors | array | ```['#3fb1e3',  '#6be6c1',  '#626c91',  '#a0a7e6',  '#c4ebad',  '#96dee8',  '#013566',  '##ff4f81'  ]``` | Colors palette |

## WPieChart

*Pie chart.*

### Child components
**[\<WPie />](/docs/api/components.html#wpie)**
**[\<WTooltip />](/docs/api/widgets.html#wtooltip)**
**[\<WLegends />](/docs/api/widgets.html#wlegends)**
**Validate SVG elements**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| dataset | array | [] | Chart data, example:  ```[{name: 'Page A', one: 3000, two: 1400, three: 400}, ...]``` |
| responsive | bool | false | If true set, the container is responsive |
| height | number | 400 | The height of the chart container in pixels |
| width | number | 600 | The width of the chart container in pixels |
| colors | array | ```['#3fb1e3',  '#6be6c1',  '#626c91',  '#a0a7e6',  '#c4ebad',  '#96dee8',  '#013566',  '##ff4f81'  ]``` | Colors palette |

## WStackBar

TODO: