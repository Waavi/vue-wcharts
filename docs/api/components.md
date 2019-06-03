# Components

## WXAxis

TODO:

## WYAxis

TODO:

## WZAxis

TODO:

## WLine

TODO:

## WPie

TODO:

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
| curve | bool, func | false | Curve of the line |
| line | bool | false | Draw a line joining the dots |
| lineStyles | object | ```{fill: '',stroke: '',strokeWidth: 1,strokeDasharray: '0'}``` | Line styles |
| styles | object | ```{fill: '',stroke: '',strokeWidth: 0,radius: 8,opacity: 0.8}``` | Dot styles |

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

*Component to show circle in the axis but it can be used wherever you want.*

### Parent components
**[\<WXAxis />](#wxaxis)**
**[\<WYAxis />](#wyaxis)**
**[\<WZAxis />](#wzaxis)**
**Validate SVG elements...**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| x |  number |  | X coordinate |
| y |  number |  | Y coordinate |
| dy |  bool |  | Indicates a shift along the Y coordinate  |
| index |  bool |  | Tick index |
| value |  object | | Tick text |
| styles |  object | ```{ fill: 'none', stroke: 'none', fontSize: 14 }``` | |
