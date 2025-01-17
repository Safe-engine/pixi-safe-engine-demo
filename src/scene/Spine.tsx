import { LabelComp, SceneComponent } from "@safe-engine/pixi";
import { SpineSkeleton } from "@safe-engine/pixi-spine";
import { defaultFont, sp_spineboy_pro } from "../assets";

export class Spine extends SceneComponent {
    static create() {
      return (
        <SceneComponent>
          <LabelComp node={{ x: 106, y: 240 }} string="Hello safex spine" font={defaultFont} />
          <SpineSkeleton node={{ x: 306, y: 140 }} data={sp_spineboy_pro} animation="Walk" loop={true} />
        </SceneComponent>
      )
    }
}