---
sidebarDepth: 3
---
# Widgets components

## WTooltip

*Tooltip component, it can be used wherever you want it needs access to Chart api.*

### Parent components
**[\<WCartesian />](/api/charts.html#wcartesian)**
**[\<WPieChart />](/api/charts.html#wcartesian)**
**[\<WStackBar />](/api/charts.html#wcartesian)**

### Child components
**[\<WBullet />](/api/components.html#wbullet)**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| id | string |  | Tooltip identifier |
| gap | number | 10 | X and Y offset |
| styles | object | { position: 'absolute', display: 'flex', padding: '.5rem', borderRadius: '4px', color: '#000000', background: 'white', boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.15)', fontSize: '14px', opacity: 0, zIndex: 1, transition: 'opacity .25s ease' } | Styles |
| visibleStyles | object | { opacity: 1 } | Visible Styles |
| titleStyles | object | { display: 'flex', flexDirection: 'column' } | Title Styles |
| wrapperStyles | object | { marginBottom: '5px' } | Wrapper Styles |

### Slots

-   #### default

    *Slot to customize the tooltip*

    | Property | Description |
    |----------|-------------|
    | label | Tooltip text |
    | value | Array of tooltip elements (color, value) |

-   #### label

    *Slot to customize the label of the tooltip*

    | Property | Description |
    |----------|-------------|
    | label | Tooltip text |

-   #### bullet

    *Slot to customize the bullet of the tooltip element*

    | Property | Description |
    |----------|-------------|
    | index | Element index |
    | text | Element text |
    | color | Element color |

-   #### value

    *Slot to customize the value of the tooltip element*

    | Property | Description |
    |----------|-------------|
    | index | Element index |
    | text | Element text |
    | color | Element color |


## WLegend

*Legends component*

### Parent components
**[\<WCartesian />](/api/charts.html#wcartesian)**
**[\<WPieChart />](/api/charts.html#wcartesian)**

### Child components
**[\<WBullet />](/api/components.html#wbullet)**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| position | oneOf(['top', 'bottom', 'left', 'right']) | bottom | Legends position |
| align | oneOf(['start', 'center', 'end']) | center | Legends alignment |
| space | array | [16, 16, 16, 16] | Space around the legends |
| size | number |  | Width or height, with different position prop top-bottom/left-right |
| selectable | bool |  | If true set, it can be selectable |
| styles | object | { position: 'absolute', display: 'flex' } | Container styles |
| wrapperStyles | object | { display: 'flex', flex: '1', margin: '0', listStyle: 'none' } | Wrapper styles |
| legendStyles | object | { display: 'flex', alignItems: 'center', fontSize: '12px', cursor: 'pointer' } | Legend Styles |
| bulletStyles | object | { display: 'inline-block', width: '8px', height: '8px', background: 'white',borderRadius: '50%', borderWidth: '2px', borderColor: 'white', borderStyle: 'solid', margin: '0px 8px 0px 0px', } | Bullet Styles |

### Slots

-   #### bullet

    *Slot to customize the bullet legend*

    | Property | Description |
    |----------|-------------|
    | index | Legend index |
    | text | Legend text |
    | color | Legend color |


## WLegendItem

*Legend component*

### Parent components
**[\<WLegend />](#wlegends)**
**[\<WCartesian />](/api/charts.html#wcartesian)**
**[\<WPieChart />](/api/charts.html#wcartesian)**

### Child components
**[\<WBullet />](/api/components.html#wbullet)**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| index |  number, string | | The index of the legend |
| text |  string | | The text of the legend |
| active |  bool | false | If is set to true the legend has opacity 1. If is set to false the legend has opacity .5 |
| styles |  object | { display: 'flex', alignItems: 'center', fontSize: '12px', cursor: 'pointer' } | The style of the legend |
| noActiveStyles |  object | { opacity: '0.5' } | The style of the legend in no active state |
| bulletStyles |  object | { display: 'inline-block', width: '8px', height: '8px', background: 'white',borderRadius: '50%', borderWidth: '2px', borderColor: 'white', borderStyle: 'solid', margin: '0px 8px 0px 0px', } | The style of the legend text |
| color |  string | | The color of the legend |

### Slots

-   #### bullet

    *Slot to customize the bullet legend*

    | Property | Description |
    |----------|-------------|
    | index | Legend index |
    | text | Legend text |
    | color | Legend color |

-   #### text

    *Slot to customize the text legend*

    | Property | Description |
    |----------|-------------|
    | text | Text value|

### Events

| Name | Attributes | Listen to | Description |
|------|------------|-----------|-------------|
| onClick | ```{ text, index}``` | @onHover | Emitted after clicking the legend |
| onMouseenter | ```{ text, index}``` | @onClick | Emitted after mouse enter in the legend |
| onMouseleave | ```{ text, index}``` | @onEvent | Emitted after moues leave the legend |

## WBullet

*Component to show circle in the legend or tooltip for example but it can be used wherever you want.*

### Parent components
**[\<WTooltip />](#wtooltip)**
**[\<WLegend />](#wlegends)**
**[\<WLegendItem />](#wlegend)**
**[\<WStackBar />](/api/charts.html#wstackbar)**
**Valid SVG elements**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| color | string | Required property | Color of the bullet |
| styles | object | { display: 'inline-block', width: '8px', height: '8px', background: 'white',borderRadius: '50%', borderWidth: '2px', borderColor: 'white', borderStyle: 'solid', margin: '0px 8px 0px 0px', } | Styles of the bullet |

## WShowIfFit

*Component to show the content slot default, if the content slot fits in the parent component.*

### Parent components
**[\<WStackBar />](/api/charts.html#wstackbar)**
**Valid HTML elements**

### Slots

-   #### default

    *Slot default to calc children components sizes*
