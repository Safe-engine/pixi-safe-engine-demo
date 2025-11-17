import { ComponentX, LabelComp, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/pixi'

import { TiledMapComp } from '@safe-engine/pixi/dist/tiledmap/TiledMapComp'
import { map_1_json, sf_crash } from '../assets'
import { BackButton } from '../components/BackButton'

export class TiledMapScene extends ComponentX {
  tiledMapComp: TiledMapComp
  spriteRender: SpriteRender

  start() {
    // console.log('TiledMapScene started', this.tiledMapComp.node.instance)
    const { x, y } = this.tiledMapComp.getLayer('map').getPositionAt(4, 7)
    this.spriteRender.node.position = Vec2(x, y)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [540, 140] }} string="Hello safex tiled" />
        <BackButton />
        <TiledMapComp $ref={this.tiledMapComp} node={{ xy: [306, 140] }} mapFile={map_1_json}>
          <SpriteRender $ref={this.spriteRender} spriteFrame={sf_crash}></SpriteRender>
        </TiledMapComp>
      </SceneComponent>
    )
  }
}
