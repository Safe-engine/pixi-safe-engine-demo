import {
  GameWorld,
  initBox2d,
  initWorld,
  loadScene,
  setupCollider,
  setupDragonBones,
  setupPhysics,
  setupSpine,
  startGame,
} from '@safe-engine/cocos'

import { defaultFont } from './assets'
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
      setupPhysics(GameWorld.Instance)
      loadScene(Loading)
    },
  )
})
