import { ButtonComp, ComponentX, ExtraDataComp, LabelComp, loadScene, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/cocos'
import { Collider } from '@safe-engine/cocos/dist/collider/CollideComponent'

import { defaultFont, sf_button } from '../assets'
import { CYAN, ORANGE, Scenes } from '../helper/constant'
import Button from './Button'
import { DragonBonesScene } from './DragonBonesScene'
import { Game } from './Game'
import { GraphicsScene } from './GraphicsScene'
import { InputTestScene } from './InputTestScene'
import { SpineScene } from './SpineScene'

export class Home extends ComponentX {
  static readonly cases = ['Spine', 'Dragon Bones', 'Touch Events', 'Sprite', 'Button', 'Graphics', 'Collider', 'Physics', 'Game']

  onStart() {
    console.log('you win')
  }

  // onUpdate(dt: number) {}
  onPress(event: ButtonComp) {
    const id = event.node.getData<Integer>('id')
    console.log('Clicked', id, Scenes[id])
    if (id === Scenes.Spine) {
      loadScene(SpineScene)
    }
    if (id === Scenes.DragonBones) {
      loadScene(DragonBonesScene)
    }
    if (id === Scenes.TouchEvents) {
      // TouchEvents.create()
    }
    if (id === Scenes.Sprite) {
      loadScene(InputTestScene)
    }
    if (id === Scenes.Button) {
      loadScene(Button)
    }
    if (id === Scenes.Graphics) {
      loadScene(GraphicsScene)
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
      <SceneComponent>
        <LabelComp node={{ xy: [406, 140], color: CYAN }} string="hello safex" font={defaultFont} />
        {Home.cases.map((name, j = 1) => (
          <SpriteRender node={{ xy: [200, 120 + 150 * j] }} spriteFrame={sf_button}>
            <ButtonComp onPress={this.onPress} />
            <LabelComp node={{ position: Vec2(20, 10), color: ORANGE }} string={name} font={defaultFont} size={48} />
            <ExtraDataComp key="id" value={j} />
          </SpriteRender>
        ))}
      </SceneComponent>
    )
  }
}
