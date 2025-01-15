# Install
- install [BunJS](https://bun.sh/docs/installation)
- `bun i`
- `bun dev`

# Guide
- all components must be in `component` folder and extends from `ComponentX` or `NoRenderComponentX`
- `NoRenderComponentX` will append to component of parent node have `ComponentX`, `ComponentX` will be `addChild` to parent node
- all scenes place in `scene` folder and extends `ComponentX`
- components must be in `tsx` extension
- `node` property represent node, and can pass properties to assign
- example ```<SpriteRender node={{ x: 5, y: 9 }} />```
- `$ref` bind component with current class property as string
- `$ref` include `:` to specify component type to get, example `$ref="heroNode:NodeComp"` to get `NodeComp` component of current entity and reference by `heroNode`
- `$ref` include `[]` to specify component list to push, example `$ref="heroNodes[]"` to push `NodeComp` component of current entity to `heroNodes`
- `$node` bind component with current class property as string represent node
- every property start with `$` will reference to current class property as string, includes `.` to bind with other ref of current class property
- `Array(2).map(_, i)` iteration repeat component 2 times
- `Loading.listItems.map(item, i)` iteration in static property
- `listItems.map(item, i)` iteration in const variable
