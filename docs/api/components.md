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

TODO:

## WScatter

TODO:

## WMarker

TODO:

## WDot

*Component to show circle in WLine but it can be used wherever you want it needs access to Chart api.*

### Parent components
**[\<WLine />](#wline)**
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
