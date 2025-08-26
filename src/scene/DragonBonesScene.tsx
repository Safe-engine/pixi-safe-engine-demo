import { ComponentX, LabelComp, SceneComponent, Vec2 } from '@safe-engine/cocos'
import { DragonBonesComp } from '@safe-engine/cocos/dist/dragonbones'

import { db_mecha_1004d_show, defaultFont } from '../assets'
import { BackButton } from '../components/BackButton'

export class DragonBonesScene extends ComponentX {
  dragon: DragonBonesComp

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ position: Vec2(607, 270) }} string="Hello safex dragon bones" font={defaultFont} />
        <DragonBonesComp $ref={this.dragon} node={{ position: Vec2(587, 454) }} data={db_mecha_1004d_show} animation="idle" playTimes={3} />
        <BackButton />
      </SceneComponent>
    )
  }
}
