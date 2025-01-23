import { ButtonComp, ComponentX, SpriteRender } from "safex";
import { sf_home } from "../assets/TextureAssets";
import { Home } from "../scene/Home";

export class BackButton extends ComponentX {

  onPress() {
    Home.create()
  }
  render() {
    return <SpriteRender node={{ x: 500, y: 240 }} spriteFrame={sf_home}>
      <ButtonComp onPress={this.onPress}></ButtonComp>
    </SpriteRender>
  }
}
