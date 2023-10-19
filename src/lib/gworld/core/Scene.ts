import { app } from '../../../app'
import { GameWorld } from '..'
import { EnhancedComponent, NodeComp } from '../components/EnhancedComponent'

export class SceneComponent extends EnhancedComponent {
  static boot: () => void
  static create() {
    const world = GameWorld.Instance
    world.entities.reset()
    const root = world.entities.create()
    root.assign(new NodeComp(app.stage, root))
    const sceneComponent = root.assign(new SceneComponent())
    return sceneComponent
  }
}
