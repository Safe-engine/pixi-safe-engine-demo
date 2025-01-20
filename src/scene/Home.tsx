import { ButtonComp, Collider, ComponentX, ExtraDataComp, LabelComp, NodeRender, SceneComponent, SpriteRender } from 'safex'
import { defaultFont, sf_button } from '../assets'
import { Hero } from '../components/Hero'
import { CYAN, ORANGE, Scenes } from '../helper/constant'
import { DragonBonesScene } from './DragonBonesScene'
import { Game } from './Game'
import { SpineScene } from './SpineScene'

export class Home extends ComponentX {
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
      SpineScene.create()
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
      Game.create()
    }
  }

  onCollisionEnter(other: Collider) {
    console.log(other.tag)
  }

  render() {
    return (
      <SceneComponent  >
        <LabelComp node={{ x: 406, y: 140, color: CYAN }} string="hello safex" font={defaultFont} />
        {
          Home.cases.map((name, j = 1) => (
            <NodeRender node={{ x: 200, y: 120 + 150 * j }} >
              <SpriteRender node={{ width: 600, height: 100 }} spriteFrame={sf_button} />
              <ButtonComp onPress={this.onPress} />
              <LabelComp node={{ x: 20, y: 10, color: ORANGE }} string={name} font={defaultFont} size={48} />
              <ExtraDataComp key="id" value={j} />
            </NodeRender>
          ))
        }
      </SceneComponent >
    )
  }
}
