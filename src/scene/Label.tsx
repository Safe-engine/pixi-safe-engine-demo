import { ComponentX, LabelComp, RichTextComp, SceneComponent } from "safex";
import { defaultFont } from "../assets";

export class LabelScene extends ComponentX {


  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="Hello safex dragon bones" font={defaultFont} />
        <RichTextComp string="<color=#ff00ff>Pink</color> <color=#00ff00>Green</color>" />
      </SceneComponent>
    )
  }
}
