import { BoxColliderPhysics, CircleColliderPhysics, ComponentX, DragonBones, LabelComp, RigidBody, SceneComponent, SpriteRender, Vec2 } from "safex";
import { db_mecha_1004_d, defaultFont, sf_button } from "../assets";
import { BackButton } from "../components/BackButton";

export class PhysicsScene extends ComponentX {

  dragon: DragonBones

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="Hello safex physics" font={defaultFont} />
        <BackButton />
        <DragonBones $ref={this.dragon} node={{ x: 640, y: 1140 }} data={db_mecha_1004_d} animation="idle" playTimes={3} >
          <RigidBody friction={0.5} restitution={0.5}></RigidBody>
          <CircleColliderPhysics radius={50} />
          <BoxColliderPhysics width={500} height={800} offset={Vec2(-400, -600)} />
        </DragonBones>
        <SpriteRender node={{ x: 40, y: 1500 }} spriteFrame={sf_button}>
          <RigidBody type="static"></RigidBody>
          <BoxColliderPhysics height={100} width={1200}></BoxColliderPhysics>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
