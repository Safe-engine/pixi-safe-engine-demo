import { GameWorld, loadAll, loadScene, setupCollider, setupDragonBones, setupRichText, setupSpine, startGame } from '@safe-engine/cocos'
import { initBox2d, setupPhysics } from '@safe-engine/cocos/dist/box2d-wasm'

import { defaultFont, sf_progress_bar, sf_progress_bg } from './assets'
import { Loading } from './scene/Loading'
import { colliderMatrix, designedResolution } from './settings'
// if (module.hot) {
//   module.hot.accept(() => {
//     // console.log('hot')
//     cc.game.onStart()
//   })
// }
initBox2d().then(async () => {
  await startGame(defaultFont, designedResolution)
  setupDragonBones()
  setupSpine()
  setupCollider(colliderMatrix, true)
  setupPhysics(GameWorld.Instance, true)
  setupRichText()
  loadAll([sf_progress_bar, sf_progress_bg], (p) => {
    if (p >= 1) loadScene(Loading)
  })
})
