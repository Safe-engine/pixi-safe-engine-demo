import { ComponentX, ExtraDataComp, LabelComp, SceneComponent, SpriteRender } from '@safe-engine/pixi'

import { defaultFont, sf_crash } from '../assets'
import { BackButton } from '../components/BackButton'

export class GridScene extends ComponentX {
  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex Grid" font={defaultFont} />
        <BackButton />
        {Array(3).map((i) =>
          Array(3).map((j) => (
            <SpriteRender node={{ xy: [25 + i * 236, 318 + j * 205] }} spriteFrame={sf_crash}>
              <ExtraDataComp key="id" value={j * 3 + i} />
            </SpriteRender>
          )),
        )}
      </SceneComponent>
    )
  }
}
