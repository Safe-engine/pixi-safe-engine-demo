import {
  ButtonComp,
  ComponentX,
  ExtraDataComp,
  LabelComp,
  loadScene,
  RichTextComp,
  SceneComponent,
  SpriteRender,
  Vec2,
  WHITE,
} from '@safe-engine/cocos'

import { defaultFont, sf_button } from '../assets'
import { Scenes } from '../helper/constant'
import ButtonScene from './ButtonScene'
import { CollidersScene } from './CollidersScene'
import { DragonBonesScene } from './DragonBonesScene'
import { Game } from './Game'
import { GraphicsScene } from './GraphicsScene'
import { InputTestScene } from './InputTestScene'
import { PhysicsScene } from './PhysicsScene'
import { SpineScene } from './SpineScene'
import SpriteTest from './SpriteTest'

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
      loadScene(InputTestScene)
    }
    if (id === Scenes.Sprite) {
      loadScene(SpriteTest)
    }
    if (id === Scenes.Button) {
      loadScene(ButtonScene)
    }
    if (id === Scenes.Graphics) {
      loadScene(GraphicsScene)
    }
    if (id === Scenes.Collider) {
      loadScene(CollidersScene)
    }
    if (id === Scenes.Physics) {
      loadScene(PhysicsScene)
    }
    if (id === Scenes.Game) {
      loadScene(Game)
    }
  }

  render() {
    return (
      <SceneComponent>
        <RichTextComp
          node={{ xy: [406, 140] }}
          font={defaultFont}
          size={72}
          string="<color=#ff00ff>hello</color> <color=#00ff00>safex</color>"
        />
        {Home.cases.map((name, j = 1) => (
          <SpriteRender node={{ xy: [200, 120 + 150 * j] }} spriteFrame={sf_button}>
            <ButtonComp onPress={this.onPress} />
            <LabelComp node={{ position: Vec2(90, 30), color: WHITE }} string={name} font={defaultFont} size={48} />
            <ExtraDataComp key="id" value={j} />
          </SpriteRender>
        ))}
      </SceneComponent>
    )
  }
}
