import { ComponentX, SpriteRender } from "@safe-engine/pixi"
import { sf_thanhmau_2 } from "../assets/TextureAssets"


export class Hero extends ComponentX {
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
    return <SpriteRender node={{ x: 500, y: 240 }} $ref="sprite" spriteFrame={sf_thanhmau_2}></SpriteRender>
  }
}
