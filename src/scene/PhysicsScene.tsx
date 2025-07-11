import {
  ComponentX,
  DragonBonesComp,
  DynamicBody,
  LabelComp,
  PhysicsBoxCollider,
  PhysicsCircleCollider,
  PhysicsCollider,
  PhysicsPolygonCollider,
  RigidBody,
  SceneComponent,
  SpriteRender,
  StaticBody,
  Vec2,
} from '@safe-engine/cocos'

import { defaultFont, sf_button, sf_crash } from '../assets'
import { BackButton } from '../components/BackButton'

export class PhysicsScene extends ComponentX {
  dragon: DragonBonesComp

  onCollisionEnter(other: PhysicsCollider) {
    console.log('box contact', other.props.tag)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex physics" font={defaultFont} />
        <BackButton />
        <SpriteRender node={{ xy: [560, 1030] }} spriteFrame={sf_button}>
          <RigidBody type={DynamicBody}></RigidBody>
          <PhysicsCollider onBeginContact={this.onCollisionEnter} />
          <PhysicsBoxCollider height={56} width={150}></PhysicsBoxCollider>
        </SpriteRender>
        <SpriteRender node={{ xy: [360, 1130] }} spriteFrame={sf_crash}>
          <RigidBody type={DynamicBody}></RigidBody>
          <PhysicsCircleCollider radius={150}></PhysicsCircleCollider>
        </SpriteRender>
        <SpriteRender node={{ xy: [860, 1230] }} spriteFrame={sf_crash}>
          <RigidBody type={DynamicBody}></RigidBody>
          <PhysicsPolygonCollider points={[Vec2(0, 0), Vec2(100, 100), Vec2(200, 100)]}></PhysicsPolygonCollider>
        </SpriteRender>
        <SpriteRender node={{ xy: [540, 500] }} spriteFrame={sf_button}>
          <RigidBody type={StaticBody}></RigidBody>
          <PhysicsBoxCollider height={60} width={1200}></PhysicsBoxCollider>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
