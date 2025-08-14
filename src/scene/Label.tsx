import { ComponentX, LabelComp, SceneComponent } from '@safe-engine/pixi'

import { RichTextComp } from '@safe-engine/pixi/dist/richtext'
import { BackButton } from '../components/BackButton'
import { CYAN, DARK_GREEN, ORANGE, RED, YELLOW } from '../helper/constant'

export class LabelScene extends ComponentX {
  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [406, 240] }} string="Hello safex label" />
        <BackButton />
        <RichTextComp
          node={{ xy: [154, 540], color: CYAN }}
          string="<font color='#ff00ff' size=24>Pink</font>       and <font color='#00ff00'>Green</font>"
          size={64}
        />
        <RichTextComp node={{ xy: [154, 340], color: ORANGE }} string="RichTextComp normal" size={60} />
        <LabelComp node={{ xy: [706, 440], color: YELLOW }} string="Yellow label" />
        <LabelComp node={{ xy: [306, 840], color: DARK_GREEN }} string="Yellow outline label" outline={[YELLOW, 5]}></LabelComp>
        <LabelComp node={{ xy: [406, 1240], color: YELLOW }} string="Yellow shadow label" shadow={[RED, 12]}></LabelComp>
      </SceneComponent>
    )
  }
}
