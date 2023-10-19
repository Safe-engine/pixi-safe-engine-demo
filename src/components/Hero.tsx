import { SpriteSourceAssets } from '../assets'
import { EnhancedComponent } from '../lib/gworld/components/EnhancedComponent'
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

  static create(): Hero {
    return <SpriteRender node={{ x: 500, y: 240 }} $ref="sprite" spriteFrame={SpriteSourceAssets.thanhmau2}></SpriteRender>
  }
}
