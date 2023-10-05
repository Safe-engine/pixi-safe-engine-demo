import { SpriteSourceAssets } from '../assets'
import { GameWorld } from '../gworld'
import { ComponentAddedEvent, EventManager, EventReceive } from '../lib/exts/event'
import { System } from '../lib/exts/system'
import { EnhancedComponent, NodeComp } from '../lib/gworld/components/EnhancedComponent'
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
function createSystem(component) {
  class NewSystem implements System {
    configure(event_manager: EventManager) {
      event_manager.subscribe(ComponentAddedEvent(component), this)
    }

    receive(type: string, event: EventReceive) {
      switch (type) {
        case ComponentAddedEvent(component): {
          // cc.log('component', event);
          const ett = event.entity
          const newComp = ett.getComponent(component)
          newComp.node = ett.getComponent(NodeComp)
          break
        }
        default:
          break
      }
    }
    update(entities: EntityManager, events: EventManager, dt: number) {
      // throw new Error('Method not implemented.');
    }
  }
  GameWorld.Instance.systems.add(NewSystem)
  GameWorld.Instance.listUpdate.push(NewSystem)
  return NewSystem
}
export const MonsterSystem = createSystem(Monster)
