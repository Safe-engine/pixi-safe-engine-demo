import { ComponentX, LabelComp, SceneComponent, SpineSkeleton, Vec2 } from "@safe-engine/cocos";
import { defaultFont, sp_spineboy_pro } from "../assets";

export class SpineScene extends ComponentX {
  // start() {
  //   console.log(sp_spineboy_pro)
  //   console.log(Assets.cache.get(sp_spineboy_pro.skeleton));
  //   console.log(Assets.cache.get(sp_spineboy_pro.atlas));
  // }
  static create() {
    return (
      <SceneComponent>
        <LabelComp node={{ position: Vec2(106, 240) }} string="Hello safex spine" font={defaultFont} />
        <SpineSkeleton node={{ position: Vec2(306, 1140) }} data={sp_spineboy_pro} animation="run" loop={true} />
      </SceneComponent>
    )
  }
}