import { ButtonComp, ComponentX, InputComp, LabelComp, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/cocos'

import { sf_button } from '../assets'
import { BackButton } from '../components/BackButton'

export class InputTestScene extends ComponentX {
  captchaInput: InputComp

  async onSubmitCaptcha() {
    const captcha = this.captchaInput.string
    console.log('auth', captcha)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ position: Vec2(406, 440) }} string="Hello safex Input" />
        <InputComp $ref={this.captchaInput} node={{ position: Vec2(420, 320) }} placeHolder="Input here"></InputComp>
        <SpriteRender node={{ position: Vec2(382, 150) }} spriteFrame={sf_button}>
          <LabelComp string="Submit" node={{ position: Vec2(72, 25) }} />
          <ButtonComp onPress={this.onSubmitCaptcha} />
        </SpriteRender>
        <BackButton />
      </SceneComponent>
    )
  }
}
