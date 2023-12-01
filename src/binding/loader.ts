import HowlerLoaderParser from 'howler-pixi-loader-middleware'
import { Assets, extensions, SpriteSource } from 'pixi.js'

import { AudioAssets, FontAssets, JsonAssets, SpineAssets, SpriteSourceAssets } from '../assets'
extensions.add(HowlerLoaderParser)

export function loadAssets(cb: (progress: number) => void) {
  // load the texture we need
  const fontBundle = {}
  Object.keys(FontAssets).forEach((key) => {
    const val = FontAssets[key]
    fontBundle[val] = val
  })
  Assets.addBundle('fonts', fontBundle)
  Promise.all([
    Assets.loadBundle('fonts'),
    ...Object.keys(SpineAssets).map((key) => {
      return Assets.load(SpineAssets[key]).then((resource) => {
        // console.log('resource.spineData', resource.spineData)
        SpineAssets[key] = resource.spineData
      })
    }),
    ...Object.keys(AudioAssets).map((key) => {
      return Assets.load(AudioAssets[key]).then((audioResource) => {
        AudioAssets[key] = audioResource
      })
    }),
    ...Object.values(JsonAssets).map(loadJsonAsync),
  ]).then(() => {
    Assets.load<SpriteSource>(Object.values(SpriteSourceAssets), cb)
  })
}

const jsonCache = {}
export async function loadJsonAsync<T>(filePath: string): Promise<T> {
  const json = await Assets.load(filePath)
  jsonCache[filePath] = json
  return json
}

export function loadJsonFromCache<T>(filePath: string): T {
  return jsonCache[filePath]
}
