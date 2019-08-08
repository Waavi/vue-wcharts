---
sidebarDepth: 3
---
# Extra Charts

## WSimpleHStackBar

<br>
<StackBar />

### Child components
**[\<WTooltip />](/api/widgets.html#wtooltip)**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| dataset | array | [] | Chart data, example:  ```[{name: 'Page A', one: 3000, two: 1400, three: 400}, ...]``` |
| colors | array | ```['#3fb1e3',  '#6be6c1',  '#626c91',  '#a0a7e6',  '#c4ebad',  '#96dee8',  '#013566',  '##ff4f81'  ]``` | Colors palette |
| total | number |  | Total value |
| markers | array | [] | Points over the bars, example: ```[10, 50, 100]``` |
| labelStyles | object | {} | Label styles |
| showLabel | bool | false | If true set, label will be drawn |
| withoutTooltip | bool | false | If true set, tooltip won't be drawn |
| styles | object | {} | Bar styles |
| delay | number | 300 | Delay for the animation |
| minWidth | number |  | Min width of the chart |
| animated | bool | true | If true set, animation will be executed |
| transDuration | number | 1 | Transition duration in seconds |
| transEffect | string | ease | Transition effect |

### Slots

-   #### value

    *Slot to customize the value label*

    | Property | Description |
    |----------|-------------|
    | index | Label index |
    | value | Label value |
    | percentage | Percentage value |
    | color | Color |

-   #### tooltip

    *Slot to customize the tooltip text*

    | Property | Description |
    |----------|-------------|
    | value | Label value |
    | color | Color |

-   #### marker

    *Slot to customize the marker*

    | Property | Description |
    |----------|-------------|
    | value | Marker value |

-   #### end

    *Slot to customize the total label*

    | Property | Description |
    |----------|-------------|
    | total | Total value |

