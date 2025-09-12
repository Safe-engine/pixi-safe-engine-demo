import { BLUE, ComponentX, GraphicsRender, LabelComp, SceneComponent, Vec2 } from '@safe-engine/cocos'

import { BackButton } from '../components/BackButton'
import { CYAN, ORANGE, PINK, PURPLE, YELLOW } from '../helper/constant'

export class GraphicsScene extends ComponentX {
  graphics: GraphicsRender

  start() {
    this.graphics.drawRect(Vec2(100, 300), Vec2(200, 500), PURPLE)
    this.graphics.drawCircle(Vec2(400, 500), 50, Math.PI * 0.5, 64, true, 11, YELLOW)
    this.graphics.drawCircle(Vec2(400, 600), 50, (Math.PI * 2) / 3, 64, true, 11, YELLOW)
    const points: Vec2[] = [Vec2(40, 1040), Vec2(540, 640), Vec2(840, 940), Vec2(740, 1040)]
    this.graphics.drawPoly(points, BLUE, 20)
    this.graphics.drawRect(Vec2(200, 1610), Vec2(500, 1845), ORANGE)
    this.graphics.drawDot(300, 1500, 50)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [306, 240] }} string="Hello safex Graphics" />
        <GraphicsRender $ref={this.graphics} fillColor={CYAN} strokeColor={PINK} lineWidth={5} />
        <BackButton />
      </SceneComponent>
    )
  }
}
