import { ComponentX, LabelComp, SceneComponent } from '@safe-engine/pixi'

import { TiledMapComp } from '@safe-engine/pixi/dist/tiledmap/TiledMapComp'
import { map_1_json } from '../assets'
import { BackButton } from '../components/BackButton'

export class TiledMapScene extends ComponentX {
  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [540, 140] }} string="Hello safex tiled" />
        <BackButton />
        <TiledMapComp node={{ xy: [306, 140] }} mapUrl={map_1_json} />
      </SceneComponent>
    )
  }
}
