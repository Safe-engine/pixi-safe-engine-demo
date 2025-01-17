import { ButtonComp, ExtraDataComp, LabelComp, SceneComponent, SpriteRender } from '@safe-engine/pixi'
import { Collider } from '@safe-engine/pixi-collider'
import { defaultFont, sf_button } from '../assets'
import { Hero } from '../components/Hero'
import { Game } from './Game'

export class Home extends SceneComponent {
  score = 0
  hero: Hero

  static cases = []

  onStart() {
    //   schedule((dt) => {
    //     const monster = instantiate(Monster)
    //     const box = monster.getComponent(BoxCollider)
    //     box.width = 123
    //     monster.on(DEATH, (point) => {
    //       this.score += point
    //       this.uiRef.updateScore(this.score)
    //       if (this.score > 1000) {
    console.log('you win')
    //         loadScene('game')
    //       }
    //     })
    //     this.addChild(monster)
    //   }, 2)
  }

  // onUpdate(dt: number) {}
  onPress(event: ButtonComp) {
    console.log('Clicked')
    // this.uiRef.showDialog(true)
    Game.create()
  }

  onCollisionEnter(other: Collider) {
    console.log(other.tag)
  }

  static create(): Home {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="hello safex" font={defaultFont} />
        {this.cases.map((name, j = 1) => (
          <SpriteRender node={{ x: 200, y: 120 - 30 * j, anchorY: 1 }} spriteFrame={sf_button}>
            <ButtonComp $onPress="onPress" />
            <LabelComp node={{ x: 220, y: 90 }} string={name} font={defaultFont} />
            <ExtraDataComp key="id" value={j} />
          </SpriteRender>
        ))}
      </SceneComponent>
    )
  }
}
