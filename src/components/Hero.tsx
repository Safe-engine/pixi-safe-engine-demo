import { GameWorld } from '../gworld'
import { SpriteSourceAssets } from '../assets'
import { EnhancedComponent, NodeComp } from '../lib/gworld/components/EnhancedComponent'
import { SpriteRender } from '../lib/gworld/components/RenderComponent'

export class Hero extends EnhancedComponent {
  hp = 100
  sprite: SpriteRender = null

  attack() {
    // this.spine.play('attack')
    // const bullet = instantiate(Bullet)
    // bullet.speed = 100
    // bullet.move()
    // bullet.active(true)
  }

  static create() {
    return (
      <NodeComp x={100} y={240}>
        <SpriteRender ref="sprite" spriteFrame={SpriteSourceAssets.demo} />
      </NodeComp>
    )
  }
}
