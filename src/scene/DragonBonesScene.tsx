import { ComponentX, LabelComp, SceneComponent } from '@safe-engine/pixi'

import { DragonBonesComp } from '@safe-engine/pixi/dist/dragonbones'
import { db_mecha_1004d_show, defaultFont } from '../assets'
import { BackButton } from '../components/BackButton'

export class DragonBonesScene extends ComponentX {
  dragon: DragonBonesComp

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex dragon bones" font={defaultFont} />
        <BackButton />
        <DragonBonesComp $ref={this.dragon} node={{ xy: [640, 1140] }} data={db_mecha_1004d_show} animation="idle" playTimes={3} />
      </SceneComponent>
    )
  }
}
