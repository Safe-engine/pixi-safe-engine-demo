import { CircleColliderPhysics, ComponentX, DragonBones, LabelComp, SceneComponent } from "safex";
import { db_mecha_1004_d, defaultFont } from "../assets";
import { BackButton } from "../components/BackButton";

export class PhysicsScene extends ComponentX {

  dragon: DragonBones

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="Hello safex physics" font={defaultFont} />
        <BackButton />
        <DragonBones $ref={this.dragon} node={{ x: 640, y: 1140 }} data={db_mecha_1004_d} animation="idle" playTimes={3} >
          <CircleColliderPhysics radius={50} />
        </DragonBones>
      </SceneComponent>
    )
  }
}
