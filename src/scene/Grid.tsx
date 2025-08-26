import { ComponentX, ExtraDataComp, LabelComp, SceneComponent, SpriteRender } from '@safe-engine/pixi'

import { defaultFont, sf_crash } from '../assets'
import { BackButton } from '../components/BackButton'

export class GridScene extends ComponentX {
  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [551, 325] }} string="Hello safex Grid" font={defaultFont} />
        <BackButton />
        <SpriteRender node={{ xy: [NaN, NaN] }} spriteFrame={sf_crash}>
          <ExtraDataComp key="id" value={j * 3 + i} />
        </SpriteRender>
      </SceneComponent>
    )
  }
}
