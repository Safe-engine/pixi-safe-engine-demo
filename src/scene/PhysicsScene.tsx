import { ComponentX, LabelComp, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/cocos'
import {
  DynamicBody,
  PhysicsBoxCollider,
  PhysicsCircleCollider,
  PhysicsPolygonCollider,
  RigidBody,
  StaticBody,
} from '@safe-engine/cocos/dist/chipmunk'

import { DragonBonesComp } from '@safe-engine/cocos/dist/dragonbones'
import { defaultFont, sf_button, sf_crash, sf_dialog_name } from '../assets'
import { BackButton } from '../components/BackButton'

export class PhysicsScene extends ComponentX {
  dragon: DragonBonesComp
  body: RigidBody

  start() {
    this.body.applyLinearImpulse(Vec2(10, 100))
    console.log(this.body.linearVelocity)
    this.body.applyTorque(10)
  }

  onCollisionEnter(other: RigidBody) {
    console.log('box contact', other.props.tag)
    // this.body.position = Vec2(600, 1800)
    other.node.destroy()
  }

  update() {
    // console.log('update', this.body.node.rotation)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [541, 1755] }} string="Hello safex physics" font={defaultFont} />
        <BackButton />
        <SpriteRender node={{ xy: [560, 1030] }} spriteFrame={sf_button}>
          <RigidBody type={DynamicBody} onBeginContact={this.onCollisionEnter} isSensor />
          <PhysicsBoxCollider height={56} width={150} offset={[-100, -20]} />
        </SpriteRender>
        <SpriteRender node={{ xy: [360, 1130] }} spriteFrame={sf_dialog_name}>
          <RigidBody $ref={this.body} type={DynamicBody} />
          <PhysicsCircleCollider radius={150} offset={[-100, -20]} />
        </SpriteRender>
        <SpriteRender node={{ xy: [660, 1530] }} spriteFrame={sf_button}>
          <RigidBody type={DynamicBody} />
          <PhysicsPolygonCollider
            offset={[-100, -20]}
            points={[
              [0, 1],
              [0, 50],
              [169, 51],
              [170, 1],
            ]}
          />
        </SpriteRender>
        <SpriteRender node={{ xy: [860, 1230] }} spriteFrame={sf_crash}>
          <RigidBody type={DynamicBody} />
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
          />
        </SpriteRender>
        <SpriteRender node={{ xy: [540, 500] }} spriteFrame={sf_button}>
          <RigidBody type={StaticBody} />
          <PhysicsBoxCollider height={60} width={1200} />
        </SpriteRender>
      </SceneComponent>
    )
  }
}
