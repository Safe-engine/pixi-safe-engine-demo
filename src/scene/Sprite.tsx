import { ComponentX, LabelComp, SceneComponent, SpriteRender } from "safex";
import { defaultFont, sf_crash } from "../assets";
import { BackButton } from "../components/BackButton";

export class SpriteScene extends ComponentX {

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="Hello safex Sprite" font={defaultFont} />
        <BackButton />
        <SpriteRender spriteFrame={sf_crash} />
      </SceneComponent>
    )
  }
}
