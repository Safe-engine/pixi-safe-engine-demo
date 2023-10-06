import { SpriteSourceAssets } from '../assets'
import { GameWorld } from '../gworld'
import { EnhancedComponent } from '../lib/gworld/components/EnhancedComponent'
import { SpriteRender } from '../lib/gworld/components/RenderComponent'
import { NodeComponent } from '../lib/gworld/core/Node'

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
      <NodeComponent x={100}>
        <SpriteRender ref="sprite" />
      </NodeComponent>
    )
  }
}
