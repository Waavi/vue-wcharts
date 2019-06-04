---
sidebarDepth: 3
---
# Widgets components

## WTooltip

TODO:

## WLegends

TODO:

## WLegend

*TODO: Component description here*

### Parent components
**[\<WLegends />](#wlegends)**
**[\<WCartesian />](/docs/api/charts.html#wcartesian)**
**[\<WPieChart />](/docs/api/charts.html#wcartesian)**

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

    *TODO: Slot description here*

    | Property | Description |
    |----------|-------------|
    | index | |
    | text | |
    | color | |

-   #### text

    *TODO: Slot description here*

    | Property | Description |
    |----------|-------------|
    | text | |

### Events

-   #### @onClick

    *TODO: Event description here*

    | Property | Description |
    |----------|-------------|
    | text | |
    | index | |

-   #### @onMouseenter

    *TODO: Event description here*

    | Property | Description |
    |----------|-------------|
    | text | |
    | index | |

-   #### @onMouseleave

    *TODO: Event description here*

    | Property | Description |
    |----------|-------------|
    | text | |
    | index | |

## WBullet

*Component to show circle in the legend or tooltip for example but it can be used wherever you want.*

### Parent components
**[\<WTooltip />](#wtooltip)**
**[\<WLegends />](#wlegends)**
**[\<WLegend />](#wlegend)**
**[\<WStackBar />](/docs/api/charts.html/#wstackbar)**
**Validate SVG elements**

### Properties
| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| color |  string | Required property | Color of the bullet |

