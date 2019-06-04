---
sidebarDepth: 3
---
# Transitions

## WSpread

*Transition componente to make left to right or bottom to top animations.*

### Properties
| Property | Type | Default value | Example | Description |
|----------|------|---------------|---------|-------------|
| axis |  oneOf(['x', 'y']) | Required property || Axis transition direction |
| transition |  string | Required property | *all 200ms ease* | CSS transition value |

## WTrans

*Transition component to make initial transitions.*

### Properties
| Property | Type | Default value | Example | Description |
|----------|------|---------------|---------|-------------|
| initialProps |  object | Required property | ```{ height: 0, opacity: 0 }``` | Initial properties values which working with CSS transition |
| transition |  string | Required property | *all 200ms ease* | CSS transition value |