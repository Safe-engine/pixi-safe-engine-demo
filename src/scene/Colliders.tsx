import { ComponentX, DragonBones, LabelComp, SceneComponent } from "safex";
import { db_mecha_1004_d, defaultFont } from "../assets";

export class CollidersScene extends ComponentX {

  dragon: DragonBones

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="Hello safex dragon bones" font={defaultFont} />
        <DragonBones $ref={this.dragon} node={{ x: 406, y: 1140 }} data={db_mecha_1004_d} animation="idle" playTimes={3} />
      </SceneComponent>
    )
  }
}
