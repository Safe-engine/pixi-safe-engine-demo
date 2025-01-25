import { ComponentX, LabelComp, RichTextComp, SceneComponent } from "safex";
import { defaultFont } from "../assets";
import { BackButton } from "../components/BackButton";
import { CYAN, ORANGE } from "../helper/constant";

export class LabelScene extends ComponentX {


  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="Hello safex label" font={defaultFont} />
        <BackButton />
        <RichTextComp node={{ x: 154, y: 640, color: CYAN }} string="<font color='#ff00ff' size=24>Pink</font>       and <font color='#00ff00'>Green</font>" size={64} />
        <RichTextComp node={{ x: 154, y: 540, color: ORANGE }} string="RichTextComp normal" size={80} />
      </SceneComponent>
    )
  }
}
