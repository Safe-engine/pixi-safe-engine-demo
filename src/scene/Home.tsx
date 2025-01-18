import { ButtonComp, Collider, ExtraDataComp, LabelComp, SceneComponent, SpriteRender } from 'safex'
import { defaultFont, sf_button } from '../assets'
import { Hero } from '../components/Hero'
import { CYAN, ORANGE, Scenes } from '../helper/constant'
import { DragonBonesScene } from './DragonBonesScene'
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
    console.log('Clicked', id, Scenes[id])
    if (id === Scenes.Spine) {
      Spine.create()
    }
    if (id === Scenes.DragonBones) {
      DragonBonesScene.create()
    }
    if (id === Scenes.TouchEvents) {
      // TouchEvents.create()
    }
    if (id === Scenes.Sprite) {
      // Sprite.create()
    }
    if (id === Scenes.Button) {
      // Button.create()
    }
    if (id === Scenes.Graphics) {
      // Graphics.create()
    }
    if (id === Scenes.Collider) {
      // Collider.create()
    }
    if (id === Scenes.Physics) {
      // Physics.create()
    }
    if (id === Scenes.Game) {
      // Game.create()
    }
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
