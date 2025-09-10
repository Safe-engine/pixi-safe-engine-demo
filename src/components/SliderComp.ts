import { Slider, SliderOptions } from '@pixi/ui'
import { ComponentX, GameWorld, NodeComp } from '@safe-engine/pixi'

export class SliderComp extends ComponentX<
  {
    bg: string
    fill: SliderOptions['fill']
    slider: string
    min?: number
    max?: number
    value?: number
    onChange?: (value: number) => void
  },
  Slider
> {
  render() {
    const { bg, slider, fill, onChange, min, max, value } = this.props
    const view = new Slider({ bg, fill, slider, min, max, value })
    if (onChange) view.onChange.connect(onChange)
    const world = GameWorld.Instance
    const entity = world.entities.create()
    entity.assign(new NodeComp(view, entity))
    const comp = entity.assign(this)
    return comp
  }
}
