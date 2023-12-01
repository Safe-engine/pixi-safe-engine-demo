import { SpriteSourceAssets } from '../assets'
import { ComponentX, SpriteRender } from '../lib/safex'

export class Monster extends ComponentX {
  hp = 100
  sprite: SpriteRender = null

  // attack() {
  //   this.spine.play('attack')
  //   const bullet = instantiate(Bullet)
  //   bullet.speed = 100
  //   bullet.move()
  //   bullet.active(true)
  // }

  static create(): Monster {
    const sprite = SpriteRender.create({
      spriteFrame: SpriteSourceAssets.demo,
    }) as SpriteRender
    const monster = sprite.addComponent<Monster>(new Monster())
    monster.sprite = sprite
    return monster
  }
}
