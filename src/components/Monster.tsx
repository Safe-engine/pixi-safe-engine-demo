import { ComponentX, instantiate, SpriteRender } from "safex"
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

  render() {
    const sprite = instantiate(SpriteRender, {
      spriteFrame: sf_dialog_name,
    }) as SpriteRender
    const monster = sprite.addComponent<Monster>(this)
    monster.sprite = sprite
    return this
  }
}
