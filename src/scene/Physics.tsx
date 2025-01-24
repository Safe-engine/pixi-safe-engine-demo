import { BoxColliderPhysics, CircleColliderPhysics, ComponentX, DragonBones, LabelComp, RigidBody, SceneComponent } from "safex";
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
          <RigidBody friction={1} restitution={1}></RigidBody>
          <CircleColliderPhysics radius={50} />
          <BoxColliderPhysics width={500} height={800} />
        </DragonBones>
      </SceneComponent>
    )
  }
}
