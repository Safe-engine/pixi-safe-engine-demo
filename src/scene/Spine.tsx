import { LabelComp, SceneComponent, SpineSkeleton } from "safex";
import { defaultFont, sp_spineboy_pro } from "../assets";

export class Spine extends SceneComponent {
  // start() {
  //   console.log(sp_spineboy_pro)
  //   console.log(Assets.cache.get(sp_spineboy_pro.skeleton));
  //   console.log(Assets.cache.get(sp_spineboy_pro.atlas));
  // }
  static create() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="Hello safex spine" font={defaultFont} />
        <SpineSkeleton node={{ x: 306, y: 1140 }} data={sp_spineboy_pro} animation="run" loop={true} />
      </SceneComponent>
    )
  }
}