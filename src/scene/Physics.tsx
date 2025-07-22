import { ComponentX, DragonBones, LabelComp, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/pixi'

import { BoxColliderPhysics, RigidBody } from '@safe-engine/pixi/src/box2d-wasm'
import { db_mecha_1004d_show, defaultFont, sf_button } from '../assets'
import { BackButton } from '../components/BackButton'

export class PhysicsScene extends ComponentX {
  dragon: DragonBones

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex physics" font={defaultFont} />
        <BackButton />
        <DragonBones $ref={this.dragon} node={{ xy: [640, 1140] }} data={db_mecha_1004d_show} animation="idle" playTimes={3}>
          <RigidBody type="dynamic" friction={0.5} restitution={0.5}></RigidBody>
          {/* <CircleColliderPhysics radius={50} /> */}
          <BoxColliderPhysics width={500} height={600} offset={Vec2(-4, -100)} />
        </DragonBones>
        <SpriteRender node={{ xy: [40, 1500] }} spriteFrame={sf_button}>
          <RigidBody type="static"></RigidBody>
          <BoxColliderPhysics height={60} width={1200}></BoxColliderPhysics>
        </SpriteRender>
        <SpriteRender node={{ xy: [60, 1230] }} spriteFrame={sf_button}>
          <RigidBody type="dynamic"></RigidBody>
          <BoxColliderPhysics height={56} width={150}></BoxColliderPhysics>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
