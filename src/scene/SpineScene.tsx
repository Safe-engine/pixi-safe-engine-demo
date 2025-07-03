import { ComponentX, LabelComp, SceneComponent, SpineSkeleton } from '@safe-engine/pixi';

import { defaultFont, sp_spineboy_pro } from '../assets';
import { BackButton } from '../components/BackButton';

export class SpineScene extends ComponentX {
  // start() {
  //   console.log(sp_spineboy_pro)
  //   console.log(Assets.cache.get(sp_spineboy_pro.skeleton));
  //   console.log(Assets.cache.get(sp_spineboy_pro.atlas));
  // }
  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="Hello safex spine" font={defaultFont} />
        <BackButton />
        <SpineSkeleton node={{ x: 306, y: 1140 }} data={sp_spineboy_pro} animation="run" loop={true} />
      </SceneComponent>
    )
  }
}