import { Assets, extensions, loadAll } from '@safe-engine/pixi'
import HowlerLoaderParser from 'howler-pixi-loader-middleware'

import * as allAssets from '../assets'

extensions.add(HowlerLoaderParser)

export async function loadAssets(cb: (progress: number) => void, onCompleted: () => void) {
  await loadAll(allAssets, cb)
  onCompleted()
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
