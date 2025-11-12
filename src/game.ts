import { loadAll, loadScene, setupCollider, setupRichText, startGame } from '@safe-engine/cocos'
import { initBox2d } from '@safe-engine/cocos/dist/box2d-wasm'

import { setupPhysics } from '@safe-engine/cocos/dist/chipmunk'
import { setupDragonBones } from '@safe-engine/cocos/dist/dragonbones'
import { setupSpine } from '@safe-engine/cocos/dist/spine'
import { setupTiledMap } from '@safe-engine/cocos/dist/tiledmap'
import { defaultFont, sf_progress_bar, sf_progress_bg } from './assets'
import { Loading } from './scene/Loading'
import { colliderMatrix, designedResolution } from './settings'

initBox2d().then(async () => {
  await startGame(defaultFont, designedResolution)
  setupDragonBones()
  setupSpine()
  setupCollider(colliderMatrix, true)
  setupPhysics(colliderMatrix, true)
  setupRichText()
  setupTiledMap()
  await loadAll([sf_progress_bar, sf_progress_bg])
  loadScene(Loading)
})
