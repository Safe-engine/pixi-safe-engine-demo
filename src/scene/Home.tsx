import { Container } from 'pixi.js'
import { SpriteSourceAssets } from '../assets'
import { GameWorld } from '../gworld'
import { NodeComp } from '../lib/gworld/components/EnhancedComponent'
import { SpriteRender } from '../lib/gworld/components/RenderComponent'
import { SceneComponent } from '../lib/gworld/core/Scene'
import { Monster } from '../components/Monster'
import { Hero } from '../components/Hero'
import { app } from '../app'
import { ButtonComp } from '../lib/gworld/components/GUIComponent'

export class Home extends SceneComponent {
  score = 0
  // uiRef: UIController = null
  hero: Hero = null

  // onStart(props: NodeProps) {
  //   schedule((dt) => {
  //     const monster = instantiate(Monster)
  //     const box = monster.getComponent(BoxCollider)
  //     box.width = 123
  //     monster.on(DEATH, (point) => {
  //       this.score += point
  //       this.uiRef.updateScore(this.score)
  //       if (this.score > 1000) {
  //         console.log('you win')
  //         loadScene('game')
  //       }
  //     })
  //     this.addChild(monster)
  //   }, 2)
  // }

  // onUpdate(dt: number) {}
  onPress(event) {
    console.log('Clicked')
    // this.uiRef.showDialog(true)
  }

  static boot() {
    return (
      <SceneComponent>
        <SpriteRender node={{ x: 200, y: 420, anchorY: 1 }} spriteFrame={SpriteSourceAssets.demo}>
          <ButtonComp $onPress="onPress" />
        </SpriteRender>
        <Monster node={{ x: 10, y: 240 }}></Monster>
        <Hero $ref="hero" node={{ x: 50, y: 130 }}></Hero>
      </SceneComponent>
    )
  }
}
