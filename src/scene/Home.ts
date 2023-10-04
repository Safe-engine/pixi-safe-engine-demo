import { Container } from 'pixi.js'
import { SpriteSourceAssets } from '../assets'
import { GameWorld } from '../gworld'
import { NodeComp } from '../lib/gworld/components/EnhancedComponent'
import { SpriteRender } from '../lib/gworld/components/RenderComponent'
import { SceneComponent } from '../lib/gworld/core/Scene'
import { Monster } from '../components/Monster'

export class Home extends SceneComponent {
  score = 0
  // uiRef: UIController = null
  // gameRef: GameController = null

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
  // onPress(event) {
  //   console.log('Clicked')
  //   this.uiRef.showDialog(true)
  // }

  static boot(stage: Container) {
    const world = GameWorld.Instance
    world.entities.reset()
    const root = world.entities.create()
    const rootNode = root.assign(new NodeComp(stage, root))
    const sprite = world.entities.create()
    sprite.assign(new SpriteRender(SpriteSourceAssets.demo))
    const spriteNode = sprite.getComponent(NodeComp)
    rootNode.addChild(spriteNode)
    spriteNode.x = 100
    spriteNode.y = 100
    spriteNode.anchorY = 1
    const monster = new Monster().render()
    rootNode.addChild(monster.node)
  }
}
