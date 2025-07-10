import { ComponentX, GraphicsRender, LabelComp, SceneComponent, Vec2 } from '@safe-engine/cocos'

import { CYAN, PINK, PURPLE, YELLOW } from '../helper/constant'

export class GraphicsScene extends ComponentX {
  graphics: GraphicsRender

  start() {
    this.graphics.drawRect(Vec2(100, 300), Vec2(200, 500), PURPLE)
    this.graphics.drawCircle(Vec2(400, 500), 50, Math.PI * 0.5, 64, true, 11, YELLOW)
    this.graphics.drawCircle(Vec2(400, 600), 50, (Math.PI * 2) / 3, 64, true, 11, YELLOW)
    const points = [
      { x: 540, y: 1040 },
      { x: 540, y: 640 },
      { x: 840, y: 940 },
      { x: 740, y: 1040 },
    ].map(Vec2)
    // this.graphics.drawPoly(points, true, BLUE)
    const graphics = this.graphics.node.instance
    graphics.drawPoly(points)
    graphics.drawRect(Vec2(600, 610), Vec2(200, 345))
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex Graphics" />
        <GraphicsRender $ref={this.graphics} fillColor={CYAN} strokeColor={PINK} lineWidth={5} />
      </SceneComponent>
    )
  }
}
