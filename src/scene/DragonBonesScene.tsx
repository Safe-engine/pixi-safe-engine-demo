import { ComponentX, DragonBones, LabelComp, SceneComponent } from '@safe-engine/pixi';

import { db_mecha_1004_d, defaultFont } from '../assets';
import { BackButton } from '../components/BackButton';

export class DragonBonesScene extends ComponentX {

  dragon: DragonBones

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex dragon bones" font={defaultFont} />
        <BackButton />
        <DragonBones $ref={this.dragon} node={{ xy: [640, 1140] }} data={db_mecha_1004_d} animation="idle" playTimes={3} />
      </SceneComponent>
    )
  }
}
