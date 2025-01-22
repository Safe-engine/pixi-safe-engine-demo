import { ComponentX, NodeComp, SpriteRender } from "safex";
import { BaseComponentProps } from "safex/@types/safex";
import { sf_progress_bg } from "../assets/TextureAssets";

interface HeroProps extends BaseComponentProps {
  gameNode?: NodeComp
}
export class HomeButton extends ComponentX {
  hp = 100
  sprite: SpriteRender
  gameNode?: NodeComp
  constructor(props: HeroProps) {
    super(props);
  }
  start() {
    console.log("hero", this.gameNode)
  }
  render(props: HeroProps) {
    this.gameNode = props.gameNode
    return <SpriteRender node={{ x: 500, y: 240 }} $ref={this.sprite} spriteFrame={sf_progress_bg}></SpriteRender>
  }
}
