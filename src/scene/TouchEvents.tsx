import { LabelComp, SceneComponent, SpriteRender, Touch, TouchEventRegister } from '@safe-engine/pixi'

import { sf_bg_home } from '../assets'
import { BackButton } from '../components/BackButton'

export class TouchEventsScene extends SceneComponent {
  onTouchStart(event) {
    console.log('onTouchStart')
  }
  onTouchMove(event: Touch) {
    console.log('onTouchMove', event.getLocation())
  }
  onTouchEnd(event) {
    console.log('onTouchEnd')
  }
  onTouchCancel(event) {
    console.log('onTouchCancel')
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [563, 160] }} string="Hello safex touch events" />
        <BackButton />
        <SpriteRender spriteFrame={sf_bg_home} node={{ xy: [524, 996] }}>
          <TouchEventRegister
            onTouchStart={this.onTouchStart}
            onTouchEnd={this.onTouchEnd}
            onTouchCancel={this.onTouchCancel}
            onTouchMove={this.onTouchMove}
          />
        </SpriteRender>
      </SceneComponent>
    )
  }
}
