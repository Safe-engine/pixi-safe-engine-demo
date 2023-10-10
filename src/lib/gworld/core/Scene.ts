import { app } from '../../../app'
import { GameWorld } from '../../../gworld'
import { NodeComp } from '../components/EnhancedComponent'

export class SceneComponent {
  boot: () => void
  static create() {
    const world = GameWorld.Instance
    world.entities.reset()
    const root = world.entities.create()
    const rootNode = root.assign(new NodeComp(app.stage, root))
    return { node: rootNode }
  }
}
