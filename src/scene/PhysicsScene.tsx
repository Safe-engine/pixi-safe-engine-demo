import { ComponentX, DragonBonesComp, LabelComp, PhysicsBoxCollider, RigidBody, SceneComponent, SpriteRender } from '@safe-engine/cocos'

import { defaultFont, sf_button } from '../assets'
import { BackButton } from '../components/BackButton'

export class PhysicsScene extends ComponentX {
  dragon: DragonBonesComp

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex physics" font={defaultFont} />
        <BackButton />
        <SpriteRender node={{ xy: [540, 500] }} spriteFrame={sf_button}>
          <RigidBody type="static"></RigidBody>
          <PhysicsBoxCollider height={60} width={1200}></PhysicsBoxCollider>
        </SpriteRender>
        <SpriteRender node={{ xy: [560, 1230] }} spriteFrame={sf_button}>
          <RigidBody type="dynamic"></RigidBody>
          <PhysicsBoxCollider height={56} width={150}></PhysicsBoxCollider>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
