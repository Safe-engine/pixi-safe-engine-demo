import { CollideSystem, GameWorld, initWorld } from 'safex'

import { Loading } from './scene/Loading'
import { settings } from './settings'
// if (module.hot) {
//   module.hot.accept(() => {
//     // console.log('hot')
//     cc.game.onStart()
//   })
// }
class BootScene extends cc.Scene {
  constructor() {
    // 1. super init first
    super()
    super.ctor() // always call this for compatibility with cocos2dx JS Javascript class system
    this.scheduleUpdate()
  }
  onEnter() {
    super.onEnter()
    const { colliderMatrix } = settings
    const collideSystem = GameWorld.Instance.systems.get(CollideSystem)
    collideSystem.colliderMatrix = colliderMatrix
    collideSystem.toggleDebugDraw(true)
    Loading.create()
  }

  update(dt) {
    GameWorld.Instance.update(dt)
  }
}

cc._isContextMenuEnable = true
cc.game.onStart = function onStart() {
  const { designedResolution } = settings
  const { width, height } = designedResolution
  // Pass true to enable retina display, disabled by default to improve performance
  cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS)
  // Adjust viewport meta
  cc.view.adjustViewPort(true)
  // Setup the resolution policy and design resolution size
  cc.view.setDesignResolutionSize(width, height, cc.ResolutionPolicy.FIXED_WIDTH)
  // The game will be resized when browser size change
  cc.view.resizeWithBrowserSize(true)

  initWorld()
  cc.director.runScene(new BootScene())
}
cc.game.run()
