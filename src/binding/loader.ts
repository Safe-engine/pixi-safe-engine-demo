import { loadAll } from '@safe-engine/cocos'
// import * as JsonAssets from '../assets/JsonAssets'
// import * as SpriteSheetAssets from '../assets/SpriteSheetAssets'

import { loadDragonBonesAssets } from '@safe-engine/cocos/dist/dragonbones'
import { loadSpineAssets } from '@safe-engine/cocos/dist/spine/PixiSpineSprite'
import * as DragonBonesAssets from '../assets/DragonBonesAssets'
import * as FontAssets from '../assets/FontAssets'
import * as SpineAssets from '../assets/SpineAssets'
import * as TextureAssets from '../assets/TextureAssets'
// import JsonCache from '../data/JsonCache'

export function loadAssets(cb: (progress: number) => void, onCompleted: () => void) {
  // load the texture we need
  Object.values(SpineAssets).map(({ skeleton, atlas, texture }) => {
    loadSpineAssets(skeleton, atlas, texture)
  })
  Object.values(DragonBonesAssets).map(({ skeleton, atlas, texture }) => {
    loadDragonBonesAssets(skeleton, atlas, texture)
  })
  const assets = [
    ...Object.values(TextureAssets),
    // ...Object.values(SpriteSheetAssets),
    // ...Object.values(JsonAssets),
    ...Object.values(FontAssets),
  ]
  loadAll(assets, cb, onCompleted)
}
