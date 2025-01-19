import { ComponentX, SpriteRender } from "safex";
import { sf_progress_bg } from "../assets/TextureAssets";

export class Hero extends ComponentX {
  hp = 100
  sprite: SpriteRender
  // constructor(props: HeroProps) {
  //   super(props);
  // }
  static create() {
    return <SpriteRender node={{ x: 500, y: 240 }} $ref="sprite" spriteFrame={sf_progress_bg}></SpriteRender>
  }
}
