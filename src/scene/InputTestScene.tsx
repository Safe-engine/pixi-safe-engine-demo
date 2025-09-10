import { ButtonComp, ComponentX, LabelComp, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/pixi'

import { sf_button, sf_crash, sf_dialog_name, sf_progress_bg } from '../assets'
import { BackButton } from '../components/BackButton'
import { InputComp } from '../components/InputComp'
import { SliderComp } from '../components/SliderComp'

export class InputTestScene extends ComponentX {
  captchaInput: InputComp

  async onSubmitCaptcha() {
    const captcha = this.captchaInput.string
    console.log('auth', captcha)
  }

  onChangeSlider(value: number) {
    console.log('onChangeSlider', value)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ position: Vec2(406, 440) }} string="Hello safex Input" />
        <InputComp
          $ref={this.captchaInput}
          node={{ position: Vec2(220, 120), scale: 3 }}
          bg={sf_dialog_name}
          value="test"
          textStyle={{ fontSize: 48, fill: 0xff0000 }}
          placeholder="Input here"
        ></InputComp>
        <SpriteRender node={{ position: Vec2(282, 50) }} spriteFrame={sf_button}>
          <LabelComp string="Submit" />
          <ButtonComp onPress={this.onSubmitCaptcha} />
        </SpriteRender>
        <SliderComp
          bg={sf_progress_bg}
          fill={sf_progress_bg}
          slider={sf_crash}
          max={360}
          onChange={this.onChangeSlider}
          node={{ xy: [540, 700] }}
        />
        <BackButton />
        <BackButton />
      </SceneComponent>
    )
  }
}
