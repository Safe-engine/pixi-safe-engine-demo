import { ComponentX, LabelComp, LabelOutlineComp, LabelShadowComp, RichTextComp, SceneComponent } from "safex";
import { defaultFont } from "../assets";
import { BackButton } from "../components/BackButton";
import { CYAN, DARK_GREEN, ORANGE, RED, YELLOW } from "../helper/constant";

export class LabelScene extends ComponentX {


  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="Hello safex label" font={defaultFont} />
        <BackButton />
        <RichTextComp node={{ x: 154, y: 640, color: CYAN }} string="<font color='#ff00ff' size=24>Pink</font>       and <font color='#00ff00'>Green</font>" size={64} />
        <RichTextComp node={{ x: 154, y: 540, color: ORANGE }} string="RichTextComp normal" size={80} />
        <LabelComp node={{ x: 406, y: 740, color: YELLOW }} string="Yellow label" font={defaultFont} />
        <LabelComp node={{ x: 406, y: 840, color: DARK_GREEN }} string="Yellow outline label" font={defaultFont} >
          <LabelOutlineComp color={YELLOW} width={5}></LabelOutlineComp>
        </LabelComp>
        <LabelComp node={{ x: 406, y: 940, color: YELLOW }} string="Yellow shadow label" font={defaultFont}>
          <LabelShadowComp blur={6} color={RED} />
        </LabelComp>
      </SceneComponent>
    )
  }
}
