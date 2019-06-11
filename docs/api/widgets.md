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


## WLegends

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
| componentsStyles | object |  | Container styles |
| wrapperStyles | object |  | Wrapper styles |
| legendStyles | object |  | Legend Styles |

### Slots

-   #### bullet

    *Slot to customize the bullet legend*

    | Property | Description |
    |----------|-------------|
    | index | Legend index |
    | text | Legend text |
    | color | Legend color |


## WLegend

*Legend component*

### Parent components
**[\<WLegends />](#wlegends)**
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
| styles |  object | | The style of the legend |
| textStyles |  object | | The style of the legend text |
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
**[\<WLegends />](#wlegends)**
**[\<WLegend />](#wlegend)**
**[\<WStackBar />](/api/charts.html#wstackbar)**
**Valid SVG elements**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| color |  string | Required property | Color of the bullet |

## WShowIfFit

*Component to show the content slot default, if the content slot fits in the parent component.*

### Parent components
**[\<WStackBar />](/api/charts.html#wstackbar)**
**Valid HTML elements**

### Slots

-   #### default

    *Slot default to calc children components sizes*
