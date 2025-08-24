import { Assets, GameWorld, loadScene, setupGUI, startGame, Texture, Vec2 } from '@safe-engine/pixi'
import { initBox2d, setupPhysics } from '@safe-engine/pixi/dist/box2d-wasm'
import { setupCollider } from '@safe-engine/pixi/dist/collider'
import { setupDragonBones } from '@safe-engine/pixi/dist/dragonbones'
import { setupRichText } from '@safe-engine/pixi/dist/richtext'
import { setupSpine } from '@safe-engine/pixi/dist/spine'
import box2dUrl from 'box2d-wasm/dist/es/Box2D.simd.wasm?url'
import { defaultFont, sf_progress_bar, sf_progress_bg } from './assets'
import { Loading } from './scene/Loading'
import { colliderMatrix, designedResolution } from './settings'

await initBox2d(box2dUrl)
await startGame(defaultFont, designedResolution, Assets)
setupGUI()
setupRichText()
setupSpine()
setupDragonBones()
setupCollider(colliderMatrix, true)
setupPhysics(GameWorld.Instance, true, Vec2(0, 98))
await Assets.load<Texture>([sf_progress_bar, sf_progress_bg])
loadScene(Loading)
