import { loadAll } from '@safe-engine/cocos'
// import * as JsonAssets from '../assets/JsonAssets'
// import * as SpriteSheetAssets from '../assets/SpriteSheetAssets'

import { flatten } from 'lodash-es'
import * as DragonBonesAssets from '../assets/DragonBonesAssets'
import * as FontAssets from '../assets/FontAssets'
import * as SpineAssets from '../assets/SpineAssets'
import * as TextureAssets from '../assets/TextureAssets'
// import JsonCache from '../data/JsonCache'

export async function loadAssets(cb: (progress: number) => void, onCompleted: () => void) {
  // load the texture we need
  // Object.values(SpineAssets).map(loadSpineAssets)
  // Object.values(DragonBonesAssets).map(loadDragonBonesAssets)
  const assets = [
    ...Object.values(TextureAssets),
    ...flatten(Object.values(DragonBonesAssets).map(({ skeleton, atlas, texture }) => [skeleton, atlas, texture])),
    ...flatten(Object.values(SpineAssets).map(({ skeleton, atlas, texture }) => [skeleton, atlas, texture])),
    // ...Object.values(SpriteSheetAssets),
    // ...Object.values(JsonAssets),
    ...Object.values(FontAssets),
  ]
  await loadAll(assets, cb)
  onCompleted()
}
