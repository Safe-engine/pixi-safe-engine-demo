import { ComponentX, LabelComp, SceneComponent, SpriteRender } from '@safe-engine/cocos'

import { DragonBones } from '../../packages/safex-pixi/dist'
import { defaultFont, sf_button } from '../assets'
import { BoxColliderPhysics, RigidBody } from '../box2d-wasm'
import { BackButton } from '../components/BackButton'

export class PhysicsScene extends ComponentX {
  dragon: DragonBones

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex physics" font={defaultFont} />
        <BackButton />
        <SpriteRender node={{ xy: [40, 500] }} spriteFrame={sf_button}>
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
