import { ComponentX, SceneComponent, Size, SpriteRender, SpriteTypes } from '@safe-engine/cocos'

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
          <SpriteRender spriteFrame={sf_crash} node={{ xy: [115, 350 + i * 275] }} />
        ))}
        <SpriteRender
          spriteFrame={sf_dialog_name}
          node={{ xy: [500, 500], contentSize: Size(200, 600) }}
          capInsets={[10, 10, 20, 10]}
          type={SpriteTypes.SLICED}
        ></SpriteRender>
        <SpriteRender spriteFrame={sf_crash} type={SpriteTypes.TILED} tiledSize={Size(320, 1600)} node={{ xy: [330, 1600] }}></SpriteRender>
        <BackButton />
      </SceneComponent>
    )
  }
}
