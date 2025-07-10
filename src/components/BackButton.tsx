import { ButtonComp, ComponentX, instantiate, SpriteRender } from '@safe-engine/cocos'

import { sf_crash } from '../assets'
import { Home } from '../scene/Home'

export class BackButton extends ComponentX {
  onPress() {
    instantiate(Home)
  }
  render() {
    return (
      <SpriteRender node={{ xy: [850, 40] }} spriteFrame={sf_crash}>
        <ButtonComp onPress={this.onPress}></ButtonComp>
      </SpriteRender>
    )
  }
}
