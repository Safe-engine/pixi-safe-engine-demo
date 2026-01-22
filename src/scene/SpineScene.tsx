import { ButtonComp, LabelComp, SceneComponent } from '@safe-engine/cocos'
import { SpineSkeleton } from '@safe-engine/cocos/dist/spine'

import { defaultFont, sp_spineboy_pma } from '../assets'
import { BackButton } from '../components/BackButton'
import { LIME, ORANGE } from '../helper/constant'

export class SpineScene extends SceneComponent {
  private static readonly anims = [
    'aim',
    'death',
    'hoverboard',
    'idle',
    'idle-turn',
    'jump',
    'portal',
    'run',
    'run-to-idle',
    'shoot',
    'walk',
  ]
  animIndex = 0
  skeleton: SpineSkeleton
  animName: LabelComp
  start() {
    console.log(this.skeleton)
    // this.skeleton.setSkeletonData(sp_icon_ready)
    // this.skeleton.setAnimation('animation')
  }

  nextAnim() {
    this.animIndex++
    if (this.animIndex >= SpineScene.anims.length) this.animIndex = 0
    this.skeleton.setAnimation(SpineScene.anims[this.animIndex])
    this.animName.string = SpineScene.anims[this.animIndex]
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [526, 1698] }} string="Hello safex spine" font={defaultFont} />
        <SpineSkeleton $ref={this.skeleton} node={{ xy: [521, 575] }} data={sp_spineboy_pma} loop={true} />
        <LabelComp $ref={this.animName} string="Anim Name" node={{ xy: [560, 495], w: 500, color: LIME }} />
        <BackButton />
        <LabelComp string="Next Anim" node={{ xy: [540, 265], color: ORANGE }}>
          <ButtonComp onPress={this.nextAnim} />
        </LabelComp>
      </SceneComponent>
    )
  }
}
