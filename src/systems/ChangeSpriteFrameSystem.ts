import { ChangeSpriteFrame } from '../components/ChangeSpriteFrame'
import { EntityManager } from '../lib/exts/entity'
import { ComponentAddedEvent, EventManager, EventReceive } from '../lib/exts/event'
import { System } from '../lib/exts/system'
import { SpriteRender } from '../lib/gworld/components/RenderComponent'

export class ChangeSpriteFrameSystem implements System {
  elapsed = 0

  configure(event_manager: EventManager) {
    event_manager.subscribe(ComponentAddedEvent(ChangeSpriteFrame), this)
    // event_manager.subscribe(ComponentRemovedEvent(NodeRender), this);
  }

  receive(type: string, event: EventReceive) {
    switch (type) {
      case ComponentAddedEvent(ChangeSpriteFrame): {
        const nodeRenderComp = event.entity.getComponent(SpriteRender)
        nodeRenderComp.spriteFrame = event.component.frame
      }
    }
  }
  update(entities: EntityManager, events: EventManager, dt: number) {
    // throw new Error("Method not implemented.");
    this.elapsed += dt
  }
}
