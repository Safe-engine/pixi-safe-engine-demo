import { SharedDragonBonesManager } from '@safe-engine/cocos'
import * as DragonBonesAssets from '../assets/DragonBonesAssets'
import * as FontAssets from '../assets/FontAssets'
// import * as JsonAssets from '../assets/JsonAssets'
// import * as SpriteSheetAssets from '../assets/SpriteSheetAssets'
import * as SpineAssets from '../assets/SpineAssets'
import * as TextureAssets from '../assets/TextureAssets'
// import JsonCache from '../data/JsonCache'
export function loadAssets(cb: (progress: number) => void) {
  // load the texture we need
  const keys = []
  Object.values(SpineAssets).map(({ skeleton, atlas }) => {
    keys.push(skeleton, atlas)
  });
  Object.values(DragonBonesAssets).map(({ skeleton, atlas, texture }) => {
    SharedDragonBonesManager.loadAssetsOnce(skeleton, atlas, texture)
  })
  // console.log('keys', keys)
  cc.loader.load(
    [
      ...keys,
      ...Object.values(TextureAssets),
      // ...Object.values(SpriteSheetAssets),
      // ...Object.values(JsonAssets),
      ...Object.values(FontAssets).map((font) => ({
        type: 'font',
        name: cc.path.basename(font, '.ttf'),
        srcs: [font],
      })),
    ],
    function (result, count, loadedCount) {
      // console.log(result)
      if (result instanceof cc.Texture2D) {
        // cc.textureCache.addImage(result.url)
        const frame = new cc.SpriteFrame(result.url, cc.rect(0, 0, result.getPixelsWide(), result.getPixelsHigh()))
        // console.log('cc.Texture2D', result, frame)
        cc.spriteFrameCache.addSpriteFrame(frame, result.url)
      }
      let percent = loadedCount / count
      percent = Math.min(percent, 1)
      cb(percent)
    },
    function () {
      // Object.values(SpriteSheetAssets).forEach((spriteSheet) => {
      //   cc.spriteFrameCache.addSpriteFrames(spriteSheet)
      // })
      // JsonCache.load()
      setTimeout(cb, 500, 1)
    },
  )
}

export function loadJsonFromCache<T>(filePath: string): T {
  const res = cc.loader.getRes(filePath)
  // console.log(filePath, res)
  return res
}
