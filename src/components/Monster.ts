import { SpriteSourceAssets } from '../assets'
import { GameWorld } from '../gworld'
import { EnhancedComponent } from '../lib/gworld/components/EnhancedComponent'
import { SpriteRender } from '../lib/gworld/components/RenderComponent'

export class Monster extends EnhancedComponent {
  hp = 100
  sprite: SpriteRender = null

  // attack() {
  //   this.spine.play('attack')
  //   const bullet = instantiate(Bullet)
  //   bullet.speed = 100
  //   bullet.move()
  //   bullet.active(true)
  // }

  render() {
    const world = GameWorld.Instance
    const root = world.entities.create()
    this.sprite = root.assign(new SpriteRender(SpriteSourceAssets.demo))
    // const rootNode = root.getComponent(NodeComp)
    return root.assign(new Monster())
  }
}
