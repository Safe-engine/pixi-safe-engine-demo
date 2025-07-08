import { ButtonComp, ComponentX, ExtraDataComp, SceneComponent, SpriteRender } from '@safe-engine/cocos'

import { sf_crash } from '../assets'

export default class Button extends ComponentX {
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
      </SceneComponent>
    )
  }
}
