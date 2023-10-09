import { GameWorld } from '../gworld'
import { EntityManager } from '../lib/exts/entity'
import { EventManager, ComponentAddedEvent, EventReceive } from '../lib/exts/event'
import { Constructor } from '../lib/exts/global'
import { System } from '../lib/exts/system'
import { ComponentType, NodeComp } from '../lib/gworld/components/EnhancedComponent'

export function instantiate(component: Constructor<ComponentType>) {
  return component.create().node
}

export function registerSystem(component) {
  class NewSystem implements System {
    configure(event_manager: EventManager) {
      console.log('registerSystem', component.name)
      event_manager.subscribe(ComponentAddedEvent(component), this)
    }

    receive(type: string, event: EventReceive) {
      switch (type) {
        case ComponentAddedEvent(component): {
          console.log('ComponentAddedEvent', event)
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
