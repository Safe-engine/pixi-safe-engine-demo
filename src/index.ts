import {
  Assets,
  GameWorld,
  loadScene,
  setupCollider,
  setupDragonBones,
  setupRichText,
  setupSpine,
  startGame,
  Vec2,
} from '@safe-engine/pixi'

import { initBox2d, setupPhysics } from '@safe-engine/pixi/src/box2d-wasm'
import { defaultFont } from './assets'
import { Boot } from './scene/Boot'
import { colliderMatrix, designedResolution } from './settings'

async function start() {
  // console.log('box2d started', box2D)
  await initBox2d()
  await startGame(defaultFont, designedResolution, Assets)
  setupRichText()
  setupSpine()
  setupDragonBones()
  setupCollider(colliderMatrix, true)
  setupPhysics(GameWorld.Instance, true, Vec2(0, 98))
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
