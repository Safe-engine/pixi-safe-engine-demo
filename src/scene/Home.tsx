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
    // const world = GameWorld.Instance
    // world.entities.reset()
    // const root = world.entities.create()
    // const rootNode = root.assign(new NodeComp(app.stage, root))
    return (
      <SceneComponent>
        <NodeComp x={100} y={20} anchorY={1}>
          <SpriteRender spriteFrame={SpriteSourceAssets.demo} />
          <ButtonComp onPress="onPress" />
        </NodeComp>
        <Monster node={{ x: 10, y: 200 }}></Monster>
        <Hero ref="hero" x={500} y={320}></Hero>
      </SceneComponent>
    )
  }
}
