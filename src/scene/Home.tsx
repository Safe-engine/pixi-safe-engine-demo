import { ButtonComp, ComponentX, ExtraDataComp, instantiate, LabelComp, SceneComponent, SpriteRender } from 'safex'
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
      instantiate(SpineScene)
    }
    if (id === Scenes.DragonBones) {
      instantiate(DragonBonesScene)
    }
    if (id === Scenes.TouchEvents) {
      instantiate(TouchEventsScene)
    }
    if (id === Scenes.Sprite) {
      instantiate(SpriteScene)
    }
    if (id === Scenes.Label) {
      instantiate(LabelScene)
    }
    if (id === Scenes.Graphics) {
      instantiate(GraphicsScene)
    }
    if (id === Scenes.Collider) {
      instantiate(CollidersScene)
    }
    if (id === Scenes.Physics) {
      instantiate(PhysicsScene)
    }
    if (id === Scenes.Game) {
      instantiate(Game)
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
