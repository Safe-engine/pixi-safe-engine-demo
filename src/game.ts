import { addGameCanvasTo, app, GUISystem, RenderSystem, setupResolution, startGameWithSystems } from '@safe-engine/pixi'

import { CollideSystem } from '@safe-engine/pixi-collider'
import { SpineSystem } from '@safe-engine/pixi-spine/src'
import { Boot } from './scene/Boot'
import { settings } from './settings'

const { designedResolution } = settings
const systemsList = [RenderSystem, GUISystem, SpineSystem, CollideSystem]

async function start() {
  await addGameCanvasTo()
  Object.assign(app.canvas.style, {
    width: `${window.innerWidth}px`,
    height: `${window.innerHeight}px`,
    overflow: 'visible',
  })
  setupResolution(designedResolution)
  startGameWithSystems(systemsList)
  Boot.create()
}
start()

// if (module.hot) {
//   module.hot.dispose(() => {
//     try {
//       extensions.remove(ResizePlugin)
//       extensions.remove(TickerPlugin)
//     } catch (error) {
//       console.log(error)
//     }
//   })
//   module.hot.accept(() => {
//     console.log('hot accept is needed')
//   })
// }
