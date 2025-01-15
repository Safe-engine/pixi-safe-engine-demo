import { ComponentX, SpriteRender } from "@safe-engine/pixi"
import { sf_dialog_name } from "../assets/TextureAssets"


export class Monster extends ComponentX {
  hp = 100
  sprite: SpriteRender

  // attack() {
  //   this.spine.play('attack')
  //   const bullet = instantiate(Bullet)
  //   bullet.speed = 100
  //   bullet.move()
  //   bullet.active(true)
  // }

  static create(): Monster {
    const sprite = SpriteRender.create({
      spriteFrame: sf_dialog_name,
    }) as SpriteRender
    const monster = sprite.addComponent<Monster>(new Monster())
    monster.sprite = sprite
    return monster
  }
}
