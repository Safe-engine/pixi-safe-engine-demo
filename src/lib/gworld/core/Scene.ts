import { app } from '../../app'
import { GameWorld } from '..'
import { EnhancedComponent } from '../components/EnhancedComponent'
import { NodeComp } from '../components/NodeComp'

export class SceneComponent extends EnhancedComponent {
  static boot: () => void
  static create() {
    const world = GameWorld.Instance
    world.entities.reset()
    const root = world.entities.create()
    const node = root.assign(new NodeComp(app.stage, root))
    const sceneComponent = root.assign(new SceneComponent())
    sceneComponent.node = node
    return sceneComponent
  }
}
