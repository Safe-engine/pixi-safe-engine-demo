import { ComponentX, GraphicsRender, LabelComp, PI_2, SceneComponent, Vec2 } from '@safe-engine/pixi';

import { defaultFont } from '../assets';
import { BackButton } from '../components/BackButton';
import { CYAN, PINK, PURPLE, YELLOW } from '../helper/constant';

export class GraphicsScene extends ComponentX {

  graphics: GraphicsRender

  start() {
    this.graphics.drawRect(Vec2(100, 300), Vec2(200, 500), PURPLE)
    this.graphics.drawCircle(Vec2(400, 500), 50, PI_2, 64, true, 1, 1, YELLOW, 1)
    const points = [{ 'x': 540, 'y': 1040 }, { 'x': 540, 'y': 1240 }, { 'x': 740, 'y': 1240 }, { 'x': 740, 'y': 1040 }].map(Vec2)
    // this.graphics.drawPoly(points, true, BLUE)
    const graphics = this.graphics.node.instance
    graphics.poly(points, true)
    graphics.rect(600, 610, 200, 345)
    graphics.fill()
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex Graphics" font={defaultFont} />
        <BackButton />
        <GraphicsRender $ref={this.graphics} fillColor={CYAN} strokeColor={PINK} lineWidth={5} />
      </SceneComponent>
    )
  }
}
