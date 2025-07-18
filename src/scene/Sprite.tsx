import { ButtonComp, ComponentX, LabelComp, SceneComponent, SpriteRender } from '@safe-engine/pixi';

import { defaultFont, sf_button, sf_crash } from '../assets';
import { BackButton } from '../components/BackButton';

export class SpriteScene extends ComponentX {

  sprite: SpriteRender

  onPress = () => {
    console.log('Button pressed')
    this.sprite.spriteFrame = sf_button
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex Sprite" font={defaultFont} />
        <BackButton />
        <SpriteRender $ref={this.sprite} node={{ xy: [500, 600] }} spriteFrame={sf_crash}>
          <ButtonComp onPress={this.onPress} />
        </SpriteRender>
      </SceneComponent>
    )
  }
}
