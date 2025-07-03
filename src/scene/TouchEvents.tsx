import { ComponentX, FederatedPointerEvent, LabelComp, SceneComponent, SpriteRender, TouchEventRegister } from '@safe-engine/pixi';

import { defaultFont, sf_bg_home } from '../assets';
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
        <LabelComp node={{ x: 106, y: 240 }} string="Hello safex touch events" font={defaultFont} />
        <BackButton />
        <SpriteRender spriteFrame={sf_bg_home}>
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
