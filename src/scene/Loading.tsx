import { ComponentX, ProgressTimerComp, SceneComponent, SpriteRender } from '@safe-engine/pixi'

import { sf_bitmap_2_yellow, sf_crash, sf_thanhmau_2 } from '../assets/TextureAssets'
import { loadAssets } from '../binding/loader'
import { Home } from './Home'

export class Loading extends ComponentX {
  score = 0
  loadingSprite: ProgressTimerComp = null

  async start() {
    await loadAssets(this.onProgress.bind(this))
  }

  onProgress(p: number) {
    // console.log('onProgress', p)
    this.loadingSprite.setFillRange(p)
    if (p === 1) {
      setTimeout(() => {
        Home.create()
      }, 0)
    }
  }

  static create() {
    return (
      <SceneComponent>
        <SpriteRender node={{ x: 0, y: 0 }} spriteFrame={sf_bitmap_2_yellow}>
          <SpriteRender node={{ x: 40, y: 150 }} spriteFrame={sf_crash}>
            <ProgressTimerComp $ref="loadingSprite" node={{ x: 10, y: 1118 }} spriteFrame={sf_thanhmau_2} fillRange={0} />
          </SpriteRender>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
