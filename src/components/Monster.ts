import { SpriteSourceAssets } from '../assets'
import { EnhancedComponent } from '../lib/gworld/components/EnhancedComponent'
import { SpriteRender } from '../lib/gworld/components/RenderComponent'

export class Monster extends EnhancedComponent {
  hp = 100
  sprite: SpriteRender = null

  // attack() {
  //   this.spine.play('attack')
  //   const bullet = instantiate(Bullet)
  //   bullet.speed = 100
  //   bullet.move()
  //   bullet.active(true)
  // }

  static create() {
    const sprite = SpriteRender.create()
    sprite.spriteFrame = SpriteSourceAssets.demo
    const monster = sprite.addComponent<Monster>(new Monster())
    monster.sprite = sprite
    return monster
  }
}
