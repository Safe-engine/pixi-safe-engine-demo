import { Assets, extensions, Texture } from '@safe-engine/pixi'
import HowlerLoaderParser from 'howler-pixi-loader-middleware'

import * as AudioAssets from '../assets/AudioAssets'
import * as DragonBonesAssets from '../assets/DragonBonesAssets'
import * as FontAssets from '../assets/FontAssets'
import * as SpineAssets from '../assets/SpineAssets'
import * as TextureAssets from '../assets/TextureAssets'

extensions.add(HowlerLoaderParser)

export function loadAssets(cb: (progress: number) => void, onCompleted: () => void) {
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
  Object.keys(AudioAssets).map((key) => {
    keys.push(AudioAssets[key])
  })
  Object.values(DragonBonesAssets).map((value) => {
    // console.log(key, value)
    const { skeleton, atlas, texture } = value
    keys.push(skeleton, atlas, texture)
  })
  return Promise.all([
    Assets.loadBundle('fonts'),
    Assets.load(keys),
    // ...Object.values(JsonAssets).map(loadJsonAsync),
  ]).then(async () => {
    await Assets.load<Texture>(Object.values(TextureAssets), cb)
    onCompleted()
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
