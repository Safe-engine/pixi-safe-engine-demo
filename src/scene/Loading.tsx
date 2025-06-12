import { ComponentX, loadScene, ProgressTimerComp, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/cocos'

import { sf_bitmap_2_yellow, sf_crash, sf_progress_bar } from '../assets'
import { loadAssets } from '../binding/loader'
import { Home } from './Home'

export class Loading extends ComponentX {
  score = 0
  loadingSprite: ProgressTimerComp

  async start() {
    loadAssets(this.onProgress.bind(this))
  }

  onProgress(p: Float) {
    console.log('onProgress', p)
    this.loadingSprite.setFillRange(p)
    if (p === 1) {
      // setTimeout(() => {
      loadScene(Home)
      // }, 0)
    }
  }

  render() {
    return (
      <SceneComponent>
        <SpriteRender node={{ position: Vec2(0, 0) }} spriteFrame={sf_bitmap_2_yellow}>
          <SpriteRender node={{ position: Vec2(40, 150) }} spriteFrame={sf_crash}>
            <ProgressTimerComp $ref={this.loadingSprite} node={{ position: Vec2(10, 1118) }} spriteFrame={sf_progress_bar} fillRange={0} />
          </SpriteRender>
        </SpriteRender >
      </SceneComponent >
    )
  }
}
