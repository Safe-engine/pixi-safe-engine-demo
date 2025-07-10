import { GameWorld, initWorld, loadScene, startGame } from '@safe-engine/cocos'
import { setupCollider } from '@safe-engine/cocos/dist/collider'
import { setupDragonBones } from '@safe-engine/cocos/dist/dragonbones'
import { setupSpine } from '@safe-engine/cocos/dist/spine'
import Box2DFactory from 'box2d-wasm'

import { defaultFont } from './assets'
import { PhysicsSystem } from './box2d-wasm'
import { Loading } from './scene/Loading'
import { colliderMatrix, designedResolution } from './settings'
// if (module.hot) {
//   module.hot.accept(() => {
//     // console.log('hot')
//     cc.game.onStart()
//   })
// }
export let box2D
async function start() {
  box2D = await Box2DFactory()

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
      setupCollider()
      setupDragonBones(GameWorld.Instance)
      setupSpine(GameWorld.Instance)
      setupCollider(colliderMatrix, true)
      GameWorld.Instance.systems.add(PhysicsSystem)
      GameWorld.Instance.systems.configureOnce(PhysicsSystem)
      GameWorld.Instance.listUpdate.push(PhysicsSystem)
      loadScene(Loading)
    },
  )
}
start()
