import { ButtonComp, ComponentX, InputComp, LabelComp, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/cocos'

import { sf_button } from '../assets'

export class InputTestScene extends ComponentX {
  captchaInput: InputComp

  // start() {
  //   console.log(sp_spineboy_pro)
  //   console.log(Assets.cache.get(sp_spineboy_pro.skeleton));
  //   console.log(Assets.cache.get(sp_spineboy_pro.atlas));
  // }

  async onSubmitCaptcha() {
    const captcha = this.captchaInput.string
    console.log('auth', captcha)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ position: Vec2(406, 440) }} string="Hello safex Input" />
        <InputComp $ref={this.captchaInput} node={{ position: Vec2(220, 120) }} placeHolder="Input here"></InputComp>
        <SpriteRender node={{ position: Vec2(282, 50) }} spriteFrame={sf_button}>
          <LabelComp string="Submit" />
          <ButtonComp onPress={this.onSubmitCaptcha} />
        </SpriteRender>
      </SceneComponent>
    )
  }
}
