import { ComponentX, LabelComp, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/pixi'
import { DynamicBody, PhysicsBoxCollider, RigidBody } from '@safe-engine/pixi/dist/box2d-wasm'
import { DragonBonesComp } from '@safe-engine/pixi/dist/dragonbones'
import { db_mecha_1004d_show, defaultFont, sf_button } from '../assets'
import { BackButton } from '../components/BackButton'

export class PhysicsScene extends ComponentX {
  body: RigidBody

  start() {
    this.body.applyForceToCenter(Vec2(100, 1000))
  }

  onBeginContact(other: RigidBody) {
    console.log('onBeginContact', other)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex physics" font={defaultFont} />
        <BackButton />
        <DragonBonesComp node={{ xy: [640, 1140] }} data={db_mecha_1004d_show} animation="idle" playTimes={3}>
          <RigidBody $ref={this.body} type={DynamicBody} friction={0.5} restitution={0.5}></RigidBody>
          {/* <CircleColliderPhysics radius={50} /> */}
          <PhysicsBoxCollider width={500} height={600} offset={[-4, -100]} />
        </DragonBonesComp>
        <SpriteRender node={{ xy: [40, 1500] }} spriteFrame={sf_button}>
          <RigidBody></RigidBody>
          <PhysicsBoxCollider height={60} width={1200}></PhysicsBoxCollider>
        </SpriteRender>
        <SpriteRender node={{ xy: [60, 1230] }} spriteFrame={sf_button}>
          <RigidBody type={DynamicBody} onBeginContact={this.onBeginContact}></RigidBody>
          <PhysicsBoxCollider height={56} width={150}></PhysicsBoxCollider>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
