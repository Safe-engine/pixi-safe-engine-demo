import { ComponentX, DragonBonesComp, LabelComp, SceneComponent, Vec2 } from "@safe-engine/cocos";
import { db_mecha_1004_d, defaultFont } from "../assets";

export class DragonBonesScene extends ComponentX {

  dragon: DragonBonesComp

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ position: Vec2(106, 240) }} string="Hello safex dragon bones" font={defaultFont} />
        <DragonBonesComp $ref={this.dragon} node={{ position: Vec2(406, 540) }} data={db_mecha_1004_d} animation="idle" playTimes={3} />
      </SceneComponent>
    )
  }
}
