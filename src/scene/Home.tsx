import { ButtonComp, Collider, ComponentX, ExtraDataComp, LabelComp, loadScene, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/cocos'
import { defaultFont, sf_button } from '../assets'
import { Hero } from '../components/Hero'
import { CYAN, ORANGE, Scenes } from '../helper/constant'
import { DragonBonesScene } from './DragonBonesScene'
import { Game } from './Game'
import { SpineScene } from './SpineScene'

export class Home extends ComponentX {
  score = 0
  hero: Hero

  static readonly cases = ['Spine', 'Dragon Bones', 'Touch Events', 'Sprite', 'Button', 'Graphics', 'Collider', 'Physics', 'Game']

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
      loadScene(DragonBonesScene)
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
      loadScene(Game)
    }
  }

  onCollisionEnter(other: Collider) {
    console.log(other.props.tag)
  }

  render() {
    return (
      <SceneComponent  >
        <LabelComp node={{ position: Vec2(406, 140), color: CYAN }} string="hello safex" font={defaultFont} />
        {
          Home.cases.map((name, j = 1) => (
            <SpriteRender node={{ position: Vec2(200, 120 + 150 * j) }} spriteFrame={sf_button}  >
              <ButtonComp onPress={this.onPress} />
              <LabelComp node={{ position: Vec2(20, 10), color: ORANGE }} string={name} font={defaultFont} size={48} />
              <ExtraDataComp key="id" value={j} />
            </SpriteRender>
          ))
        }
      </SceneComponent >
    )
  }
}
