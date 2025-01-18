import { ButtonComp, Collider, ExtraDataComp, LabelComp, SceneComponent, SpriteRender } from '@safe-engine/pixi'
import { defaultFont, sf_button } from '../assets'
import { Hero } from '../components/Hero'
import { CYAN, ORANGE } from '../helper/constant'
import { Spine } from './Spine'

export class Home extends SceneComponent {
  score = 0
  hero: Hero

  static cases = ['Spine', 'Dragon Bones', 'Touch Events', 'Sprite', 'Button', 'Graphics', 'Collider', 'Physics', 'Game']

  onStart() {
    console.log('you win')
  }

  // onUpdate(dt: number) {}
  onPress(event: ButtonComp) {
    const id = event.node.getData<Integer>('id')
    console.log('Clicked', id)
    Spine.create()
  }

  onCollisionEnter(other: Collider) {
    console.log(other.tag)
  }

  static create(): Home {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 406, y: 140, color: CYAN }} string="hello safex" font={defaultFont} />
        {this.cases.map((name, j = 1) => (
          <SpriteRender node={{ x: 200, y: 120 + 150 * j, with: 600, height: 100, color: ORANGE }} spriteFrame={sf_button}>
            <ButtonComp $onPress="onPress" />
            <LabelComp node={{ x: 20, y: -10 }} string={name} font={defaultFont} size={48} />
            <ExtraDataComp key="id" value={j} />
          </SpriteRender>
        ))}
      </SceneComponent>
    )
  }
}
