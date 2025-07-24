import { ComponentX, DragonBonesComp, LabelComp, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/cocos'
import {
  DynamicBody,
  PhysicsBoxCollider,
  PhysicsCircleCollider,
  PhysicsPolygonCollider,
  RigidBody,
  StaticBody,
} from '@safe-engine/cocos/dist/box2d-wasm'

import { defaultFont, sf_button, sf_crash } from '../assets'
import { BackButton } from '../components/BackButton'

export class PhysicsScene extends ComponentX {
  dragon: DragonBonesComp
  body: RigidBody

  start() {
    this.body.applyLinearImpulse(Vec2(1000, -10000))
    console.log(this.body.linearVelocity)
  }

  onCollisionEnter(other: RigidBody) {
    console.log('box contact', other.props.tag)
    // this.body.position = Vec2(600, 1800)
  }

  // update() {
  //   console.log('update', this.body.linearVelocity)
  // }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex physics" font={defaultFont} />
        <BackButton />
        <SpriteRender node={{ xy: [560, 1030] }} spriteFrame={sf_button}>
          <RigidBody type={DynamicBody} onBeginContact={this.onCollisionEnter}></RigidBody>
          <PhysicsBoxCollider height={56} width={150} offset={[-100, -20]}></PhysicsBoxCollider>
        </SpriteRender>
        <SpriteRender node={{ xy: [360, 1130] }} spriteFrame={sf_crash}>
          <RigidBody $ref={this.body} type={DynamicBody}></RigidBody>
          <PhysicsCircleCollider radius={150} offset={[-100, -20]}></PhysicsCircleCollider>
        </SpriteRender>
        <SpriteRender node={{ xy: [660, 1530] }} spriteFrame={sf_button}>
          <RigidBody type={DynamicBody}></RigidBody>
          <PhysicsPolygonCollider
            offset={[-100, -20]}
            points={[
              [0, 1],
              [0, 50],
              [169, 51],
              [170, 1],
            ]}
          ></PhysicsPolygonCollider>
        </SpriteRender>
        <SpriteRender node={{ xy: [860, 1230] }} spriteFrame={sf_crash}>
          <RigidBody type={DynamicBody}></RigidBody>
          <PhysicsPolygonCollider
            points={[
              [46, 1],
              [0, 39],
              [1, 82],
              [44, 119],
              [87, 122],
              [157, 95],
              [158, 52],
              [121, 7],
              [69, 2],
            ]}
          ></PhysicsPolygonCollider>
        </SpriteRender>
        <SpriteRender node={{ xy: [540, 500] }} spriteFrame={sf_button}>
          <RigidBody type={StaticBody}></RigidBody>
          <PhysicsBoxCollider height={60} width={1200}></PhysicsBoxCollider>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
