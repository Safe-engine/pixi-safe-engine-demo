import { ButtonComp, ComponentX, ExtraDataComp, LabelComp, loadScene, SceneComponent, SpriteRender } from '@safe-engine/pixi'

import { defaultFont, sf_button } from '../assets'
import { Hero } from '../components/Hero'
import { CYAN, ORANGE, Scenes } from '../helper/constant'
import { CollidersScene } from './Colliders'
import { DragonBonesScene } from './DragonBonesScene'
import { Game } from './Game'
import { GraphicsScene } from './Graphics'
import { GridScene } from './Grid'
import { LabelScene } from './Label'
import { PhysicsScene } from './Physics'
import { SpineScene } from './SpineScene'
import { SpriteScene } from './Sprite'
import { TouchEventsScene } from './TouchEvents'

export class Home extends ComponentX {
  score = 0
  hero: Hero

  static cases = Object.keys(Scenes).filter(key => isNaN(Number(key)));

  start() {
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
      loadScene(TouchEventsScene)
    }
    if (id === Scenes.Sprite) {
      loadScene(SpriteScene)
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
    if (id === Scenes.Grid) {
      loadScene(GridScene)
    }
    if (id === Scenes.Game) {
      loadScene(Game)
    }
  }

  render() {
    return (
      <SceneComponent  >
        <LabelComp node={{ xy: [406, 140], color: CYAN }} string="hello safex" font={defaultFont} />
        {
          Home.cases.map((name, j = 1) => (
            <SpriteRender node={{ xy: [200, 120 + 150 * j], width: 200, height: 60 }} spriteFrame={sf_button}  >
              <ButtonComp onPress={this.onPress} />
              <LabelComp node={{ xy: [20, 10], color: ORANGE }} string={name} font={defaultFont} size={48} />
              <ExtraDataComp key="id" value={j} />
            </SpriteRender>
          ))
        }
      </SceneComponent >
    )
  }
}
