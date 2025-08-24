import { ComponentX, LabelComp, loadScene, ProgressTimerComp, SceneComponent } from '@safe-engine/pixi'

import { sf_progress_bar } from '../assets'
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
    console.log('onProgress', p)
    this.loadingSprite.fillRange = p
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp string="Loading" node={{ xy: [120, 900] }} />
        <ProgressTimerComp $ref={this.loadingSprite} node={{ xy: [10, 1118] }} spriteFrame={sf_progress_bar} fillRange={0} />
      </SceneComponent>
    )
  }
}
