---
sidebarDepth: 3
---
# Components

## WXAxis

*X axis component.*

<br>
<XAxis />

### Parent components
**[\<WCartesian />](/api/charts.html#wcartesian)**

### Child components
**[\<WTickText />](#wticktext)**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| name | string | '' | Axis name, it is usually used for tooltip |
| datakey | string | Required property | The key of dataset |
| space | array | [0, 20, 24, 20] | Space between svg borders and the axis |
| textOffset | number | 20 | Tick text offset |
| hideLine | bool | false | It true set, line won't be drawn |
| hideTickMark | bool | false | It true set, line won't be drawn |
| hideNegativeAxis | bool | false | It true set, negative axis won't be drawn |
| numTicks | number | 0 | Number of ticks |
| format | func | value => value | Formatted tick text function |
| labelAlign | oneOf(['start', 'middle', 'end']) | end | Axis label position |
| labelText | string |  | Axis label |
| labelSize | number | 12 | Label size |
| axisStyles | object | ```{stroke: '#999'}``` | Axis line styles |
| labelStyles | object | ```{fill: '#999'}``` | Label styles |
| markStyles | object | ```{stroke: '#999'}``` | Tick mark styles |
| tickStyles | object | ```{stroke: 'none',fill: '#999',fontSize: 12}``` | Tick text styles |
| negativeAxisStyles | object | ```{stroke: '#999',strokeWidth: 1,strokeDasharray: '0'}``` | Negative axis styles |

### Slots

-   #### tickText

    *Slot to customize the tick text*

    | Property | Description |
    |----------|-------------|
    | index | Index of the tick |
    | x | X coordinate |
    | y | Y coordinate |
    | value | Text value |

-   #### label

    *Slot to customize the label text*

    | Property | Description |
    |----------|-------------|
    | x | X coordinate |
    | y | Y coordinate |
    | textAnchor | Text anchor style |
    | transform | Transform style |
    | styles | Label styles |

## WYAxis

*Y axis component.*

<br>
<YAxis />

### Parent components
**[\<WCartesian />](/api/charts.html#wcartesian)**

### Child components
**[\<WTickText />](#wticktext)**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| name | string | '' | Axis name, it is usually used for tooltip |
| datakey | string | | The key of dataset |
| space | array | [10, 0, 0, 40] | Space between svg borders and the axis |
| textOffset | number | 10 | Tick text offset |
| hideLine | bool | false | It true set, line won't be drawn |
| hideTickMark | bool | false | It true set, line won't be drawn |
| numTicks | number | 0 | Number of ticks |
| format | func | value => value | Formatted tick text function |
| labelAlign | oneOf(['start', 'middle', 'end']) | start | Axis label position |
| labelText | string |  | Axis label |
| labelSize | number | 12 | Label size |
| axisStyles | object | ```{stroke: '#999'}``` | Axis line styles |
| labelStyles | object | ```{fill: '#999'}``` | Label styles |
| markStyles | object | ```{stroke: '#999'}``` | Tick mark styles |
| tickStyles | object | ```{stroke: 'none',fill: '#999',fontSize: 12}``` | Tick text styles |

### Slots

-   #### tickText

    *Slot to customize the tick text*

    | Property | Description |
    |----------|-------------|
    | index | Index of the tick |
    | x | X coordinate |
    | y | Y coordinate |
    | value | Text value |

-   #### label

    *Slot to customize the label text*

    | Property | Description |
    |----------|-------------|
    | x | X coordinate |
    | y | Y coordinate |
    | textAnchor | Text anchor style |
    | transform | Transform style |
    | styles | Label styles |

## WZAxis

*Z axis component.*

<br>
<ZAxis />

### Parent components
**[\<WCartesian />](/api/charts.html#wcartesian)**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| name | string | '' | Axis name, it is usually used for tooltip |
| datakey | string | Required property | The key of dataset |
| range | array | [100, 100] | Range of the axis |
| textOffset | number | 10 | Tick text offset |
| hideLine | bool | false | It true set, line won't be drawn |
| hideTickMark | bool | false | It true set, line won't be drawn |
| numTicks | number | 0 | Number of ticks |
| format | func | value => value | Formatted tick text function |
| labelAlign | oneOf(['start', 'middle', 'end']) | start | Axis label position |
| labelText | string |  | Axis label |
| labelSize | number | 12 | Label size |
| axisStyles | object | ```{stroke: '#999'}``` | Axis line styles |
| labelStyles | object | ```{fill: '#999'}``` | Label styles |
| markStyles | object | ```{stroke: '#999'}``` | Tick mark styles |
| tickStyles | object | ```{stroke: 'none',fill: '#999',fontSize: 12}``` | Tick text styles |

## WLine

*Line component.*

<br>
<Lines />

### Parent components
**[\<WCartesian />](/api/charts.html#wcartesian)**

### Child components
**[\<WDot />](#wdot)**
**[\<WSpread />](/api/transitions.html#wspread)**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| datakey | string | Required property | The key of dataset |
| legend | string |  | Legend's text |
| curve | bool, func | false | Curve of the line, you can specify the curve function |
| area | bool | false | If true set, area will be drawn  |
| styles | object | ```{fill: '',stroke: '',strokeWidth: 1,strokeDasharray: '0'}``` | Line styles |
| dot | bool | false | If true set, dots will be drawn |
| dotStyles | object | ```{fill: '',stroke: '',strokeWidth: 0,radius: 4,hoverRadius: 8}``` | Dot styles |
| animated | bool | true | If true set, animation will be executed |
| transDuration | number | 1 | Transition duration in seconds |
| transEffect | string | ease | Transition effect |

### Slots

-   #### dot

    *Slot to customize the dot*

    | Property | Description |
    |----------|-------------|
    | dot | Dot item value (x, y, z, info, value, index and cartesianIndex) |
    | first | If it is true, this dot is the first |
    | last | If it is true, this dot is the last |
    | styles | Dot styles |
    | Chart | Chart api (WCartesian reference) |
    | transition | CSS transition value |

## WBar

*Bar component.*

<br>
<Bars />

### Parent components
**[\<WCartesian />](/api/charts.html#wcartesian)**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| datakey | string | Required property | The key of dataset |
| legend | string |  | The text of the legend |
| width | number | 20 | The width of the bar |
| color | string    arrayOf(string) |  | Accept a color for all bars or one color for every bar |
| styles | object |  | The styles of the bar |
| showLabel | bool | false | If is set to true, the label will be drawn |
| labelSize | number | 12 | The font size of the label |
| labelAlign | oneOf(['start', 'middle', 'end']) | middle | The horizontal position of the label |
| labelPosition | oneOf(['inside', 'outside']) | outside | The vertical position of the label. If the chart is stacked the label position will be `inside` |
| labelStyles | object | ```{ fill: '#333', cursor: 'default' }``` | The styles of the label |
| stacked | bool | false | If true set, the bar is stacked |
| showStackedLabel | bool | false | If the chart is stacked, the bar is the last one and `showStackedLabel` is set to true, the label of the whole bar will be drawn |
| stackedLabelSize | number | 12 | The font size of the stacked label |
| stackedLabelAlign | oneOf(['start', 'middle', 'end']) | middle | The horizontal position of the stacked label |
| stackedLabelStyles | object |  ```{ fill: '#333', cursor: 'default' }``` | The styles of the stacked label |
| animated | bool | true | If true set, animation will be executed |
| transDuration | number | 1 | Transition duration in seconds |
| transEffect | string | ease | Transition effect |

### Slots

-   #### label

    *Slot to customize the label*

    | Property | Description |
    |----------|-------------|
    | value | Value of the bar |
    | x | The x position of the label |
    | y | The y position of the label |
    | styles | Bar styles |
    | align | The horizontal position of the label |
    | size | The font size of the label |

-   #### labelValue

    *Slot to customize the label value*

    | Property | Description |
    |----------|-------------|
    | value | Value of the bar |
    | x | The x position of the label |
    | y | The y position of the label |

-   #### stackedLabel

    *Slot to customize the stacked label*

    | Property | Description |
    |----------|-------------|
    | stackedValue | Total value of the stacked bar |
    | x | The x position of the label |
    | y | The y position of the label |
    | styles | Bar styles |
    | align | The horizontal position of the label |
    | size | The font size of the label |

-   #### stackedLabelValue

    *Slot to customize the stacked label value*

    | Property | Description |
    |----------|-------------|
    | stackedValue | Total value of the stacked bar |
    | x | The x position of the label |
    | y | The y position of the label |

## WPie

*Pie component.*

<br>
<Pie />

### Parent components
**[\<WPieChart />](/api/charts.html#wpiechart)**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| datakey | string | Required property | The key of dataset |
| angles | number, array | [0, Math.PI * 2] | Start and end pie angle |
| radius | number, array | [0, 100] | Start and end radius number |
| styles | object | ```{position: 'relative',transform: 'translate(50%, 50%)'}``` | Container styles |
| pathStyles | object | Required property | The key of dataset |
| opacityDisabled | string | Required property | The key of dataset |
| active | string | Required property | The key of dataset |

### Slots

-   #### default

    *Slot to include external elements like html*

    | Property | Description |
    |----------|-------------|
    | values | Items value (Dataset item value, value, percentage and color) |

### Events

| Name | Attributes | Listen to | Description |
|------|------------|-----------|-------------|
| onHover | ```{ id, [{ id, value}]}``` | @onHover | Emitted after hovering a pie section |
| onClick | ```{ id, [{ id, value}]}``` | @onClick | Emitted after clicking a pie section |
| onEvent | ```{ id, [{ id, value}]}``` | @onEvent | Emitted after activating a pie section with empty event name |


## WCartesianGrid

*Grid component.*

<br>
<Grid />

### Parent components
**[\<WCartesian />](/api/charts.html#wcartesian)**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| hideH | bool | false | Hide horizontal lines |
| hideV | bool | false | Hide vertical lines |
| numLinesH | number | 0 | Number of horizontal lines |
| numLinesV | number | 0 | Number of vertical lines |
| styles | object | ```{stroke: '#ccc',strokeWidth: 1,strokeDasharray: '3'}``` | Line styles |

## WScatter

*Scatter chart.*

<br>
<Scatter />

### Parent components
**[\<WCartesian />](/api/charts.html#wcartesian)**

### Child components
**[\<WDot />](#wdot)**
**[\<WSpread />](/api/transitions.html#wtrans)**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| legend | string | | Legend's text |
| curve | bool, func | false | Curve of the line, you can choose the curve function if you want |
| line | bool | false | Draw a line joining the dots |
| lineStyles | object | ```{fill: '',stroke: '',strokeWidth: 1,strokeDasharray: '0'}``` | Line styles |
| styles | object | ```{fill: '',stroke: '',strokeWidth: 0,radius: 8,opacity: 0.8}``` | Dot styles |
| animated | bool | true | If true set, animation will be executed |
| transDuration | number | 1 | Transition duration in seconds |
| transEffect | string | ease | Transition effect |

### Slots

-   #### dot

    *Slot to customize the dot*

    | Property | Description |
    |----------|-------------|
    | dot | Dot item value ```{ x, y, z, info: [{ name, data, color, value }], value, index, cartesianIndex }``` |
    | styles | Dot styles |
    | Chart | Chart api (WCartesian reference) |
    | transition | CSS transition value |

## WMarker

*Component to show a reference line in the chart.*

<br>
<Markers />

### Parent components
**[\<WCartesian />](/api/charts.html#wcartesian)**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| type | oneOf(['y', 'x']) | y | Axis direction |
| value | any | Required property | Value in the choosen axis |
| label | string | Required property | Label of the marker |
| labelAlign | oneOf(['start', 'end']) | Required property |  |
| styles | object | ```{stroke: '#333',strokeWidth: 1,strokeDasharray: '0'}``` | Line styles |
| labelStyles | object | ```{fill: '#333',fontSize: 14}``` | Label styles |

### Slots

-   #### labelCoordinates

    *Slot to customize marker's label*

    | Property | Description |
    |----------|-------------|
    | isX | Boolean to indicate if the marker is in axis x or y |
    | label | Label value |
    | value | Marker value in choosen axis |
    | align | Label align |
    | style | Label styles |

## WDot

*Component to show circle in WLine but it can be used wherever you want it needs access to Chart api.*

<br>
<Dots />

### Parent components
**[\<WLine />](#wline)**
**[\<WScatter />](#wscatter)**
**[\<WCartesian />](/api/charts.html#wcartesian)**

### Child components
**[\<WTrans />](/api/transitions.html#wtrans)**

### Properties
| Property | Type | Default value | Example | Description |
|----------|------|---------------|-------------|-------------|
| index | number | Required property | | Dot index |
| cartesianIndex | number | Required property | | Cartesian element index |
| x | number | Required property | | X coordinate |
| y | number | Required property | | Y coordinate |
| styles | object | Required property | ```{fill: '',stroke: '',strokeWidth: 0,radius: 4,hoverRadius: 8}``` | X coordinate |
| transition | string | Required property | *all 200ms ease*| CSS transition value |
| info | object | | ```{ id: 1, label: 'Page A', value: 5400}```| Info for active element, normally for the Tooltip. |

## WTickText

*Component to show text in the axis but it can be used wherever you want.*

<br>
<Texts />

### Parent components
**[\<WXAxis />](#wxaxis)**
**[\<WYAxis />](#wyaxis)**
**[\<WZAxis />](#wzaxis)**
**Valid SVG elements**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| x |  number |  | X coordinate |
| y |  number |  | Y coordinate |
| dy |  bool |  | Indicates a shift along the Y coordinate  |
| index |  bool |  | Tick index |
| value |  object | | Tick text |
| styles |  object | ```{ fill: 'none', stroke: 'none', fontSize: 14 }``` | |
