import { ComponentX, SceneComponent, SpriteRender } from '@safe-engine/cocos'

import { sf_crash, sf_dialog_name } from '../assets'
import { BackButton } from '../components/BackButton'

export default class SpriteTest extends ComponentX {
  start() {
    // TODO: implement start logic
  }

  render() {
    return (
      <SceneComponent>
        {Array(4).map((i = 1) => (
          <SpriteRender spriteFrame={sf_crash} node={{ xy: [115, 350 + i * 275], scale: 1.48 }} />
        ))}
        <SpriteRender spriteFrame={sf_crash} node={{ xy: [300, 300] }}>
          <SpriteRender spriteFrame={sf_dialog_name}></SpriteRender>
        </SpriteRender>
        <BackButton />
      </SceneComponent>
    )
  }
}
