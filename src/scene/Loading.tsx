import { ComponentX, loadScene, ProgressTimerComp, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/cocos'

import { sf_progress_bar, sf_progress_bg } from '../assets'
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
        <SpriteRender node={{ position: Vec2(540, 250), opacity: 100 }} spriteFrame={sf_progress_bg}>
          <ProgressTimerComp $ref={this.loadingSprite} node={{ position: Vec2(181, 30) }} spriteFrame={sf_progress_bar} fillRange={0} />
        </SpriteRender>
      </SceneComponent>
    )
  }
}
