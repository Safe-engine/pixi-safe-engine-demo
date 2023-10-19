import { GameWorld } from '../gworld'
import { EntityManager } from '../exts/entity'
import { ComponentAddedEvent, EventManager, EventReceive } from '../exts/event'
import { System } from '../exts/system'
import { NodeComp } from '../gworld/components/EnhancedComponent'

export function registerSystem(component) {
  class NewSystem implements System {
    configure(event_manager: EventManager) {
      console.log('registerSystem', component.name)
      event_manager.subscribe(ComponentAddedEvent(component), this)
    }

    receive(type: string, event: EventReceive) {
      switch (type) {
        case ComponentAddedEvent(component): {
          console.log('Component Added', event.component)
          const ett = event.entity
          const newComp: any = ett.getComponent(component)
          newComp.node = ett.getComponent(NodeComp)
          break
        }
        default:
          break
      }
    }
    update(entities: EntityManager, events: EventManager, dt: number) {
      // throw new Error('Method not implemented.');
      for (const entt of entities.entities_with_components(component)) {
        const comp: any = entt.getComponent(component)
        if (Object.prototype.hasOwnProperty.call(comp, 'update')) {
          comp.update(dt)
        }
      }
    }
  }
  Object.defineProperty(NewSystem, 'name', { value: `${component.name}System` })
  GameWorld.Instance.systems.add(NewSystem)
  GameWorld.Instance.listUpdate.push(NewSystem)
  return NewSystem
}
