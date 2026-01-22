import {
  ButtonComp,
  ExtraDataComp,
  LabelComp,
  loadScene,
  RichTextComp,
  SceneComponent,
  ScrollViewComp,
  ScrollViewDirection,
  Size,
  SpriteRender,
  Vec2,
} from '@safe-engine/cocos'

import { defaultFont, sf_base, sf_button } from '../assets'
import { BLUE, Scenes, WHITE } from '../helper/constant'
import ButtonScene from './ButtonScene'
import { CollidersScene } from './CollidersScene'
import { DragonBonesScene } from './DragonBonesScene'
import { Game } from './Game'
import { GraphicsScene } from './GraphicsScene'
import { InputTestScene } from './InputTestScene'
import { LabelScene } from './Label'
import MotionStreakTest from './MotionStreakTest'
import { PhysicsScene } from './PhysicsScene'
import { SpineScene } from './SpineScene'
import SpriteTest from './SpriteTest'
import { TiledMapScene } from './TiledMapScene'

export class Home extends SceneComponent {
  static readonly cases = [
    'Spine',
    'Dragon Bones',
    'Input Test',
    'Sprite',
    'Button',
    'Label',
    'Graphics',
    'Collider',
    'Physics',
    'Game',
    'MotionStreak',
    'Tiled Map',
  ]

  start() {
    console.log('you win')
    // loadScene(SpriteTest)
  }

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
    if (id === Scenes.Label) {
      loadScene(LabelScene)
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
    if (id === Scenes.MotionStreak) {
      loadScene(MotionStreakTest)
    }
    if (id === Scenes.Tiled) {
      loadScene(TiledMapScene)
    }
  }

  render() {
    return (
      <SceneComponent>
        <SpriteRender node={{ xy: [540, 960], color: BLUE }} spriteFrame={sf_base} tiledSize={Size(1080, 2160)}></SpriteRender>
        <RichTextComp
          node={{ xy: [640, 140] }}
          font={defaultFont}
          size={72}
          string="<color=#ff00ff>hello</color> <color=#00ff00>safex</color>"
        />
        <ScrollViewComp contentSize={Size(1080, 2120)} viewSize={Size(1080, 2220)} direction={ScrollViewDirection.VERTICAL}>
          {Home.cases.map((name, j = 1) => (
            <SpriteRender node={{ xy: [200, 220 + 150 * j] }} spriteFrame={sf_button}>
              <ButtonComp onPress={this.onPress} />
              <LabelComp node={{ position: Vec2(90, 30), color: WHITE }} string={name} font={defaultFont} size={48} />
              <ExtraDataComp key="id" value={j} />
            </SpriteRender>
          ))}
        </ScrollViewComp>
      </SceneComponent>
    )
  }
}
