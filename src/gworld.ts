import { Constructor } from './lib/exts/global'
import { System } from './lib/exts/system'
import { World } from './lib/exts/world'
// import { PhysicsSystem } from './lib/gworld/systems/PhysicsSystem'
// import { CollideSystem } from 'lib/gworld/systems/CollideSystem'
import { RenderSystem } from './lib/gworld/systems/RenderSystem'
import { GUISystem } from './lib/gworld/systems/GUISystem'
// import { AnimationSystem } from './lib/gworld/systems/AnimationSystem'
// ${customComponents.map(createImportSystem).join('\n')}

export class GameWorld extends World {
  listUpdate: (System | Constructor<System>)[] = []
  private constructor() {
    super()
    this.systems.add(RenderSystem)
    // ${(isUsePhysics) ? '    this.systems.add(PhysicsSystem);' : ''}
    // this.systems.add(CollideSystem)
    this.systems.add(GUISystem)
    // this.systems.add(AnimationSystem)
    // ${customComponents.map(createAddSystemTS).join('\n')}
    // this.systems.configure()
  }

  update(dt: number) {
    // ${(isUsePhysics) ? '    this.systems.update(PhysicsSystem, dt);' : ''}
    // this.systems.update(CollideSystem, dt)
    // this.systems.update(AnimationSystem, dt)
    // ${customComponents.map(createUpdateSystemTS).join('\n')}
    this.listUpdate.forEach((system) => {
      this.systems.update(system, dt)
    })
  }

  private static _instance: GameWorld

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this())
  }
}
