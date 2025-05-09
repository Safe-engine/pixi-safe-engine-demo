import { ComponentX, loadScene, ProgressTimerComp, SceneComponent, SpriteRender } from 'safex'

import { sf_bitmap_2_yellow, sf_crash, sf_progress_bar } from '../assets'
import { loadAssets } from '../binding/loader'
import { Home } from './Home'

export class Loading extends ComponentX {
  score = 0
  loadingSprite: ProgressTimerComp

  async start() {
    await loadAssets(this.onProgress.bind(this))
  }

  onProgress(p: number) {
    // console.log('onProgress', p)
    this.loadingSprite.setFillRange(p)
    if (p === 1) {
      setTimeout(() => {
        loadScene(Home)
      })
    }
  }

  render() {
    return (
      <SceneComponent>
        <SpriteRender node={{ x: 0, y: 0 }} spriteFrame={sf_bitmap_2_yellow}>
          <SpriteRender node={{ x: 40, y: 150 }} spriteFrame={sf_crash}>
            <ProgressTimerComp $ref={this.loadingSprite} node={{ x: 10, y: 1118 }} spriteFrame={sf_progress_bar} fillRange={0} />
          </SpriteRender>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
