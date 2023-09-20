import { ComponentType } from 'lib/gworld/components/EnhancedComponent'
import { Entity } from './entity'
import { Constructor } from './global'
import { System } from './system'
import { World } from './world'

export class EventManager {
  world: World
  constructor(world: World) {
    this.world = world
  }

  publish<T extends ComponentType>(event: string, entity: Entity, component: T) {
    // console.log('event', event);
    if (this.world.eventsMap[event]) {
      this.world.eventsMap[event].forEach((sys) => {
        sys.receive(event, { entity, component })
      })
    }
  }

  subscribe(eventName: string, target: System) {
    if (!this.world.eventsMap[eventName]) {
      this.world.eventsMap[eventName] = []
    }
    const targets = this.world.eventsMap[eventName]
    targets.push(target)
  }
}

export function ComponentAddedEvent<T extends ComponentType>(component: Constructor<T> | string) {
  if (typeof component === 'string') {
    return `ComponentAddedEvent_${component}`
  }
  return `ComponentAddedEvent_${component.name}`
}

export function ComponentRemovedEvent<T extends ComponentType>(component: Constructor<T> | string) {
  if (typeof component === 'string') {
    return `ComponentRemovedEvent_${component}`
  }
  return `ComponentRemovedEvent_${component.name}`
}

export interface EventReceive {
  component: ComponentType
  entity: Entity
}

export interface EventMapData {
  [key: string]: Array<System>
}

export type ReceiveEvent = typeof ComponentAddedEvent | typeof ComponentRemovedEvent
