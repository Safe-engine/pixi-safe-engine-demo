import { loadAll } from '@safe-engine/cocos'
// import * as JsonAssets from '../assets/JsonAssets'
// import * as SpriteSheetAssets from '../assets/SpriteSheetAssets'
import { SharedDragonBonesManager } from '@safe-engine/cocos/dist/dragonbones/PixiDragonBonesSprite'

import * as DragonBonesAssets from '../assets/DragonBonesAssets'
import * as FontAssets from '../assets/FontAssets'
import * as SpineAssets from '../assets/SpineAssets'
import * as TextureAssets from '../assets/TextureAssets'
// import JsonCache from '../data/JsonCache'

export function loadAssets(cb: (progress: number) => void, onCompleted: () => void) {
  // load the texture we need
  const keys = []
  Object.values(SpineAssets).map(({ skeleton, atlas }) => {
    keys.push(skeleton, atlas)
  })
  Object.values(DragonBonesAssets).map(({ skeleton, atlas, texture }) => {
    SharedDragonBonesManager.loadAssetsOnce(skeleton, atlas, texture)
  })
  // console.log('keys', keys)
  const assets = [
    ...keys,
    ...Object.values(TextureAssets),
    // ...Object.values(SpriteSheetAssets),
    // ...Object.values(JsonAssets),
    ...Object.values(FontAssets),
  ]
  loadAll(assets, cb, onCompleted)
}
