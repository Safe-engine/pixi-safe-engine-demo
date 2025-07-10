import { CollideSystem, GameWorld, GUISystem, initWorld, loadScene, startGame } from '@safe-engine/cocos'

import { defaultFont } from './assets'
import { Loading } from './scene/Loading'
import { settings } from './settings'
// if (module.hot) {
//   module.hot.accept(() => {
//     // console.log('hot')
//     cc.game.onStart()
//   })
// }
initWorld()
const { colliderMatrix, designedResolution } = settings
const collideSystem = GameWorld.Instance.systems.get(CollideSystem)
collideSystem.colliderMatrix = colliderMatrix
// collideSystem.toggleDebugDraw(true)
const guiSystem = GameWorld.Instance.systems.get(GUISystem)
guiSystem.defaultFont = defaultFont

startGame(
  {
    debugMode: 1,
    showFPS: false,
    frameRate: 60,
    id: 'gameCanvas',
    renderMode: 0,
  },
  designedResolution,
  () => {
    loadScene(Loading)
  },
)
