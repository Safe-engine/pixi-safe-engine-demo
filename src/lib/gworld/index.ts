import { Constructor } from '../exts/global'
import { System } from '../exts/system'
import { World } from '../exts/world'
import { PhysicsSystem } from './systems/PhysicsSystem'
import { RenderSystem } from './systems/RenderSystem'
import { GUISystem } from './systems/GUISystem'

export class GameWorld extends World {
  listUpdate: (System | Constructor<System>)[] = []
  private constructor() {
    super()
    this.systems.add(RenderSystem)
    this.systems.add(PhysicsSystem)
    this.systems.add(GUISystem)
  }

  update(dt: number) {
    this.systems.update(PhysicsSystem, dt)
    this.listUpdate.forEach((system: any) => {
      this.systems.update(system, dt)
    })
  }

  private static _instance: GameWorld

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this())
  }
}
