import { ComponentX, NodeComp, SpriteRender } from "safex";
import { sf_progress_bg } from "../assets/TextureAssets";

interface HeroProps {
  gameNode?: NodeComp
}
export class Hero extends ComponentX<HeroProps> {
  hp = 100
  sprite: SpriteRender
  gameNode?: NodeComp

  start() {
    console.log("hero", this.gameNode)
  }
  render() {
    return <SpriteRender node={{ x: 500, y: 240 }} $ref={this.sprite} spriteFrame={sf_progress_bg}></SpriteRender>
  }
}
