import { GameWorld, initWorld, loadAll, loadScene, setupCollider, setupDragonBones, setupSpine, startGame } from '@safe-engine/cocos'
import { initBox2d, setupPhysics } from '@safe-engine/cocos/dist/box2d-wasm'

import { defaultFont, sf_progress_bar } from './assets'
import { Loading } from './scene/Loading'
import { colliderMatrix, designedResolution } from './settings'
// if (module.hot) {
//   module.hot.accept(() => {
//     // console.log('hot')
//     cc.game.onStart()
//   })
// }
initBox2d(() => {
  startGame(
    {
      debugMode: 1,
      showFPS: false,
      frameRate: 60,
      id: 'gameCanvas',
      renderMode: 1,
    },
    designedResolution,
    () => {
      initWorld(defaultFont)
      setupDragonBones(GameWorld.Instance)
      setupSpine(GameWorld.Instance)
      setupCollider(colliderMatrix, true)
      setupPhysics(GameWorld.Instance, true)
      loadAll([sf_progress_bar], (p) => {
        if (p >= 1) loadScene(Loading)
      })
    },
  )
})
