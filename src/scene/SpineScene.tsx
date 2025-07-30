import { ComponentX, LabelComp, SceneComponent, Vec2 } from '@safe-engine/cocos'
import { SpineSkeleton } from '@safe-engine/cocos/dist/spine'

import { defaultFont, sp_spineboy_pro } from '../assets'
import { BackButton } from '../components/BackButton'

export class SpineScene extends ComponentX {
  // start() {
  //   console.log(sp_spineboy_pro)
  //   console.log(Assets.cache.get(sp_spineboy_pro.skeleton));
  //   console.log(Assets.cache.get(sp_spineboy_pro.atlas));
  // }
  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ position: Vec2(106, 240) }} string="Hello safex spine" font={defaultFont} />
        <SpineSkeleton node={{ position: Vec2(306, 1140) }} data={sp_spineboy_pro} animation="run" loop={true} />
        <BackButton />
      </SceneComponent>
    )
  }
}
