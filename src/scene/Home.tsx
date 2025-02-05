import { ButtonComp, ComponentX, ExtraDataComp, LabelComp, loadScene, SceneComponent, SpriteRender } from 'safex'
import { defaultFont, sf_button } from '../assets'
import { Hero } from '../components/Hero'
import { CYAN, ORANGE, Scenes } from '../helper/constant'
import { CollidersScene } from './Colliders'
import { DragonBonesScene } from './DragonBonesScene'
import { Game } from './Game'
import { GraphicsScene } from './Graphics'
import { LabelScene } from './Label'
import { PhysicsScene } from './Physics'
import { SpineScene } from './SpineScene'
import { SpriteScene } from './Sprite'
import { TouchEventsScene } from './TouchEvents'

export class Home extends ComponentX {
  score = 0
  hero: Hero

  static cases = ['Spine', 'Dragon Bones', 'Touch Events', 'Sprite', 'Label', 'Graphics', 'Collider', 'Physics', 'Game']

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
    if (id === Scenes.Game) {
      loadScene(Game)
    }
  }

  render() {
    return (
      <SceneComponent  >
        <LabelComp node={{ x: 406, y: 140, color: CYAN }} string="hello safex" font={defaultFont} />
        {
          Home.cases.map((name, j = 1) => (
            <SpriteRender node={{ x: 200, y: 120 + 150 * j, width: 200, height: 60 }} spriteFrame={sf_button}  >
              <ButtonComp onPress={this.onPress} />
              <LabelComp node={{ x: 20, y: 10, color: ORANGE }} string={name} font={defaultFont} size={48} />
              <ExtraDataComp key="id" value={j} />
            </SpriteRender>
          ))
        }
      </SceneComponent >
    )
  }
}
