import { DragonBones, LabelComp, SceneComponent } from "safex";
import { db_mecha_1502_b, defaultFont } from "../assets";

export class DragonBonesScene extends SceneComponent {

  static create() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="Hello safex dragon bones" font={defaultFont} />
        <DragonBones node={{ x: 306, y: 1140 }} data={db_mecha_1502_b} animation="idle" loop={true} />
      </SceneComponent>
    )
  }
}
