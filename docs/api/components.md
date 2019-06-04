---
sidebarDepth: 3
---
# Components

## WXAxis

*X axis component.*

### Parent components
**[\<WCartesian />](/docs/api/charts.html#wcartesian)**

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

### Parent components
**[\<WCartesian />](/docs/api/charts.html#wcartesian)**

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

### Parent components
**[\<WCartesian />](/docs/api/charts.html#wcartesian)**

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

### Parent components
**[\<WCartesian />](/docs/api/charts.html#wcartesian)**

### Child components
**[\<WDot />](#wdot)**
**[\<WSpread />](/docs/api/transitions.html#wspread)**

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


## WPie

*Pie component.*

### Parent components
**[\<WPieChart />](/docs/api/charts.html#wpiechart)**

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

### Parent components
**[\<WCartesian />](/docs/api/charts.html#wcartesian)**

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

### Parent components
**[\<WCartesian />](/docs/api/charts.html#wcartesian)**

### Child components
**[\<WDot />](#wdot)**
**[\<WSpread />](/docs/api/transitions.html#wtrans)**

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
    | dot | Dot item value (x, y, z, info, value, index and cartesianIndex) |
    | styles | Dot styles |
    | Chart | Chart api (WCartesian reference) |
    | transition | CSS transition value |

## WMarker

*Component to show a reference line in the chart.*

### Parent components
**[\<WCartesian />](/docs/api/charts.html#wcartesian)**

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

### Parent components
**[\<WLine />](#wline)**
**[\<WScatter />](#wscatter)**
**[\<WCartesian />](/docs/api/charts.html#wcartesian)**

### Child components
**[\<WTrans />](/docs/api/transitions.html#wtrans)**

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

### Parent components
**[\<WXAxis />](#wxaxis)**
**[\<WYAxis />](#wyaxis)**
**[\<WZAxis />](#wzaxis)**
**Validate SVG elements**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| x |  number |  | X coordinate |
| y |  number |  | Y coordinate |
| dy |  bool |  | Indicates a shift along the Y coordinate  |
| index |  bool |  | Tick index |
| value |  object | | Tick text |
| styles |  object | ```{ fill: 'none', stroke: 'none', fontSize: 14 }``` | |
