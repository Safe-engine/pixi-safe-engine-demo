import { ButtonComp, Collider, ExtraDataComp, LabelComp, SceneComponent, SpriteRender } from '@safe-engine/pixi'
import { defaultFont, sf_button } from '../assets'
import { Hero } from '../components/Hero'
import { Spine } from './Spine'

export class Home extends SceneComponent {
  score = 0
  hero: Hero

  static cases = ['Spine', "Touch Events", 'Sprite', 'Button', 'Collider', 'Physics']

  onStart() {
    console.log('you win')
  }

  // onUpdate(dt: number) {}
  onPress(event: ButtonComp) {
    console.log('Clicked', event.node.getData<Integer>('id'))
    Spine.create()
  }

  onCollisionEnter(other: Collider) {
    console.log(other.tag)
  }

  static create(): Home {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="hello safex" font={defaultFont} />
        {this.cases.map((name, j = 1) => (
          <SpriteRender node={{ x: 200, y: 120 + 230 * j, anchorY: 1 }} spriteFrame={sf_button}>
            <ButtonComp $onPress="onPress" />
            <LabelComp node={{ x: 20, y: 10 }} string={name} font={defaultFont} />
            <ExtraDataComp key="id" value={j} />
          </SpriteRender>
        ))}
      </SceneComponent>
    )
  }
}
