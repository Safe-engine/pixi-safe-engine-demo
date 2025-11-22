import { Assets, loadScene, NodeComp, startGame, Texture, Vec2 } from '@safe-engine/pixi'

import { initBox2d, setupPhysics } from '@safe-engine/pixi/dist/box2d-wasm'
import { setupCollider } from '@safe-engine/pixi/dist/collider'
import { setupDragonBones } from '@safe-engine/pixi/dist/dragonbones'
import { setupGUI } from '@safe-engine/pixi/dist/gui'
import { setupRichText } from '@safe-engine/pixi/dist/richtext'
import { setupSpine } from '@safe-engine/pixi/dist/spine'
import { actionManager, Animation } from 'pixi-action-ease'
import { defaultFont, sf_progress_bar, sf_progress_bg } from './assets'
import { Loading } from './scene/Loading'
import { colliderMatrix, designedResolution } from './settings'

async function start() {
  await initBox2d()
  const app = await startGame(defaultFont, designedResolution, Assets)
  setupGUI()
  setupRichText()
  setupSpine()
  setupDragonBones()
  setupCollider(colliderMatrix, true)
  setupPhysics(colliderMatrix, true, Vec2(0, 98))
  await Assets.load<Texture>([sf_progress_bar, sf_progress_bg])
  loadScene(Loading)
  app.ticker.add(() => {
    const dt = app.ticker.deltaMS * 0.001
    actionManager.update(dt)
  })

  NodeComp.prototype.actionsList = []
  NodeComp.prototype.stopAllActions = function () {
    this.actionsList.forEach((act) => {
      actionManager.cancelAction(act)
    })
    this.actionsList = []
  }

  NodeComp.prototype.pauseAllActionsAndSchedule = function () {
    this.actionsList.forEach((anim: Animation) => {
      anim.isPause = true
    })
  }

  NodeComp.prototype.resumeAllActionsAndSchedule = function () {
    this.actionsList.forEach((anim: Animation) => {
      anim.isPause = false
    })
  }
}
start()
