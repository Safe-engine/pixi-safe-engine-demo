import { ComponentX, LabelComp, SceneComponent } from '@safe-engine/pixi'

import { SpineSkeleton } from '@safe-engine/pixi/dist/spine'
import { sp_spineboy_pro } from '../assets'
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
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex spine" />
        <BackButton />
        <SpineSkeleton node={{ xy: [306, 1140] }} data={sp_spineboy_pro} animation="run" loop={true} />
      </SceneComponent>
    )
  }
}
