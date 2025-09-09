import { ButtonComp, ComponentX, ExtraDataComp, SceneComponent, SpriteRender, SpriteTypes } from '@safe-engine/cocos'

import { sf_btn_other_button_square_01_yellow, sf_crash } from '../assets'
import { BackButton } from '../components/BackButton'

export default class ButtonScene extends ComponentX {
  start() {
    // TODO: implement start logic
  }
  onPress(button: ButtonComp) {
    console.log('Clicked', button.node.getData('id'))
  }
  render() {
    return (
      <SceneComponent>
        <SpriteRender spriteFrame={sf_crash} node={{ xy: [185 + 180, 960], scaleX: 1.6, scaleY: -1.6 }}>
          <ButtonComp onPress={this.onPress} />
          <ExtraDataComp value={12} key="id" />
        </SpriteRender>
        <SpriteRender
          spriteFrame={sf_btn_other_button_square_01_yellow}
          type={SpriteTypes.SLICED}
          capInsets={[31, 84, 2, 2]}
          node={{ xy: [480, 560], w: 400, h: 180, scale: 2 }}
        >
          <ButtonComp onPress={this.onPress} />
          <ExtraDataComp value={34} key="id" />
        </SpriteRender>
        <SpriteRender
          spriteFrame={sf_btn_other_button_square_01_yellow}
          capInsets={[34, 67, 28, 23]}
          node={{ xy: [680, 1260], w: 800, h: 80 }}
        >
          <ButtonComp onPress={this.onPress} />
          <ExtraDataComp value={34} key="id" />
        </SpriteRender>
        <BackButton />
      </SceneComponent>
    )
  }
}
