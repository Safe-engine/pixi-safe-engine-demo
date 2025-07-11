import { ComponentX, SceneComponent, SpriteRender } from '@safe-engine/cocos'

import { sf_crash, sf_dialog_name } from '../assets'

export default class SpriteTest extends ComponentX {
  start() {
    // TODO: implement start logic
  }

  render() {
    return (
      <SceneComponent>
        <SpriteRender spriteFrame={sf_crash} node={{ xy: [300, 300] }}>
          <SpriteRender spriteFrame={sf_dialog_name}></SpriteRender>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
