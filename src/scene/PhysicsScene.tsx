import { ComponentX, LabelComp, SceneComponent, SpriteRender } from '@safe-engine/cocos'
import { DragonBonesComp } from '@safe-engine/cocos/dist/dragonbones'
import { BoxColliderPhysics, RigidBody } from '@safe-engine/cocos/src/box2d-wasm'

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
          <BoxColliderPhysics height={60} width={1200}></BoxColliderPhysics>
        </SpriteRender>
        <SpriteRender node={{ xy: [560, 1230] }} spriteFrame={sf_button}>
          <RigidBody type="dynamic"></RigidBody>
          <BoxColliderPhysics height={56} width={150}></BoxColliderPhysics>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
