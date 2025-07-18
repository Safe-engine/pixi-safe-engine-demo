import { ComponentX, FederatedPointerEvent, LabelComp, SceneComponent, SpriteRender, TouchEventRegister } from '@safe-engine/pixi';

import { sf_bg_home } from '../assets';
import { BackButton } from '../components/BackButton';

export class TouchEventsScene extends ComponentX {

  onTouchStart(event) {
    console.log('onTouchStart')
  }
  onTouchMove(event: FederatedPointerEvent) {
    console.log('onTouchMove', event.global)
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
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex touch events" />
        <SpriteRender spriteFrame={sf_bg_home}>
          <BackButton />
          <TouchEventRegister
            onTouchStart={this.onTouchStart}
            onTouchEnd={this.onTouchEnd}
            onTouchCancel={this.onTouchCancel}  // Not supported on iOS
            onTouchMove={this.onTouchMove} />
        </SpriteRender>
      </SceneComponent>
    )
  }
}
