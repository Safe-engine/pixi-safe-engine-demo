import { ComponentX, loadScene, ProgressTimerComp, SceneComponent, SpriteRender } from '@safe-engine/pixi'

import { sf_bitmap_2_yellow, sf_crash, sf_progress_bar } from '../assets'
import { loadAssets } from '../binding/loader'
import { Home } from './Home'

export class Loading extends ComponentX {
  loadingSprite: ProgressTimerComp

  async start() {
    await loadAssets(this.onProgress.bind(this), () => {
      loadScene(Home)
    })
  }

  onProgress(p: number) {
    // console.log('onProgress', p)
    this.loadingSprite.fillRange = p
  }

  render() {
    return (
      <SceneComponent>
        <SpriteRender node={{ xy: [0, 0] }} spriteFrame={sf_bitmap_2_yellow}>
          <SpriteRender node={{ xy: [40, 150] }} spriteFrame={sf_crash}>
            <ProgressTimerComp $ref={this.loadingSprite} node={{ xy: [10, 1118] }} spriteFrame={sf_progress_bar} fillRange={0} />
          </SpriteRender>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
