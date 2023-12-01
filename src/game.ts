import 'pixi-spine'

import { addGameCanvasTo, initWorld, enabledDebugDraw, setColliderMatrix, setupResolution } from './lib/safex'
import { Home } from './scene/Home'
import { settings } from './settings'
import { loadAssets } from './binding/loader'

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
// The application will create a canvas element for you that you
// can then insert into the DOM
const { colliderMatrix, designedResolution } = settings
initWorld()
setupResolution(designedResolution)
setColliderMatrix(colliderMatrix)
enabledDebugDraw(false)
addGameCanvasTo('game')
loadAssets((p) => {
  console.log(p)
  if (p >= 1) {
    Home.create()
  }
})
