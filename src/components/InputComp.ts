import { Input, InputOptions } from '@pixi/ui'
import { BaseComponentProps, ComponentX, GameWorld, NodeComp } from '@safe-engine/pixi'

interface InputCompProps extends BaseComponentProps<InputComp>, InputOptions { }

export class InputComp extends ComponentX<InputCompProps, Input> {
  get string() {
    return this.node.instance.value
  }
  render() {
    const input = new Input(this.props)
    const world = GameWorld.Instance
    const entity = world.entities.create()
    entity.assign(new NodeComp(input, entity))
    const comp = entity.assign(this)
    console.log('node', input)
    return comp
  }
}
