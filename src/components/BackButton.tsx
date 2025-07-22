import { ButtonComp, ComponentX, instantiate, SpriteRender } from '@safe-engine/pixi'

import { sf_home } from '../assets/TextureAssets'
import AudioController from '../binding/AudioController'
import { Home } from '../scene/Home'

export class BackButton extends ComponentX {
  onPress() {
    AudioController.Instance.playButtonClickSound()
    instantiate(Home)
  }
  render() {
    return (
      <SpriteRender node={{ xy: [850, 40] }} spriteFrame={sf_home}>
        <ButtonComp onPress={this.onPress}></ButtonComp>
      </SpriteRender>
    )
  }
}
