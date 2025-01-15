import { ComponentX, SceneComponent } from '@safe-engine/pixi';
import { Assets, Sprite } from 'pixi.js';

import { sf_bitmap_2_yellow, sf_crash, sf_thanhmau_2 } from '../assets/TextureAssets';
import { Loading } from './Loading';

export class Boot extends ComponentX {
  async start() {
    await Assets.load<Sprite>([
      sf_crash,
      sf_bitmap_2_yellow,
      sf_thanhmau_2
    ]);
    // console.log('Boot start', sf_background)
    // console.log(Assets.cache.get(sf_background));
    Loading.create()
  }

  static create() {
    return (
      <SceneComponent>
      </SceneComponent>
    )
  }
}
