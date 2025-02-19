import { addGameCanvasTo, app, loadScene, setupResolution, startGameSystems } from 'safex'

import Box2DFactory from 'box2d-wasm'
import { PhysicsSystem } from './box2d-wasm'
import { Boot } from './scene/Boot'
import { settings } from './settings'

export let box2D
const { designedResolution } = settings
async function start() {
  box2D = await Box2DFactory();
  // console.log('box2d started', box2D)
  await addGameCanvasTo()
  Object.assign(app.canvas.style, {
    width: `${window.innerWidth}px`,
    height: `${window.innerHeight}px`,
    overflow: 'visible',
  })
  setupResolution(designedResolution)
  startGameSystems([PhysicsSystem])
  loadScene(Boot)
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
