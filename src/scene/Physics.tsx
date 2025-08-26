import { ComponentX, LabelComp, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/pixi'
import { DragonBonesComp } from '@safe-engine/pixi/dist/dragonbones'
import { DynamicBody, PhysicsBoxCollider, RigidBody } from '@safe-engine/pixi/src/box2d-wasm'
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
        <LabelComp node={{ xy: [549, 337] }} string="Hello safex physics" font={defaultFont} />
        <BackButton />
        <DragonBonesComp node={{ xy: [640, 1140] }} data={db_mecha_1004d_show} animation="idle" playTimes={3}>
          <PhysicsBoxCollider width={500} height={600} offset={[-4, -100]} />
          <RigidBody $ref={this.body} type={DynamicBody} friction={0.5} restitution={0.5} />
        </DragonBonesComp>
        <SpriteRender node={{ xy: [353, 1550] }} spriteFrame={sf_button}>
          <PhysicsBoxCollider height={60} width={1200} />
          <RigidBody />
        </SpriteRender>
        <SpriteRender node={{ xy: [313, 1277] }} spriteFrame={sf_button}>
          <PhysicsBoxCollider height={56} width={150} />
          <RigidBody type={DynamicBody} onBeginContact={this.onBeginContact} />
        </SpriteRender>
      </SceneComponent>
    )
  }
}
