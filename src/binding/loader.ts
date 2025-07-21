import { Assets, extensions, Texture } from '@safe-engine/pixi'
import HowlerLoaderParser from 'howler-pixi-loader-middleware'

import * as AudioAssets from '../assets/AudioAssets'
import * as DragonBonesAssets from '../assets/DragonBonesAssets'
import * as FontAssets from '../assets/FontAssets'
import * as SpineAssets from '../assets/SpineAssets'
import * as TextureAssets from '../assets/TextureAssets'

extensions.add(HowlerLoaderParser)

export function loadAssets(cb: (progress: number) => void) {
  // load the texture we need
  const fontBundle = {}
  Object.keys(FontAssets).forEach((key) => {
    const val = FontAssets[key]
    fontBundle[val] = val
  })
  Assets.addBundle('fonts', fontBundle)
  const keys = []
  Object.keys(SpineAssets).map((key) => {
    const { skeleton, atlas } = SpineAssets[key]
    Assets.add({ alias: skeleton, src: skeleton })
    Assets.add({ alias: atlas, src: atlas })
    keys.push(skeleton, atlas)
  })
  return Promise.all([
    Assets.loadBundle('fonts'),
    Assets.load(keys),
    ...Object.keys(AudioAssets).map((key) => {
      return Assets.load(AudioAssets[key]).then((audioResource) => {
        AudioAssets[key] = audioResource
      })
    }),
    ...Object.entries(DragonBonesAssets).map(([key, value]) => {
      // console.log(key, value)
      const { skeleton, atlas } = value
      return Assets.load([skeleton, atlas])
    }),
    // ...Object.values(JsonAssets).map(loadJsonAsync),
  ]).then(() => {
    return Assets.load<Texture>(Object.values(TextureAssets), cb)
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
