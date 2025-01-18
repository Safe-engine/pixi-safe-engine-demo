import { ComponentX, SceneComponent } from 'safex';

import { Assets, Texture } from 'pixi.js';
import { sf_bitmap_2_yellow, sf_crash, sf_progress_bar } from '../assets';
import { Loading } from './Loading';

export class Boot extends ComponentX {
  async start() {
    await Assets.load<Texture>([
      sf_crash,
      sf_bitmap_2_yellow,
      sf_progress_bar
    ]);
    // console.log('Boot start', sf_progress_bar)
    // console.log(Assets.cache.get(sf_progress_bar));
    Loading.create()
  }

  static create() {
    return (
      <SceneComponent>
      </SceneComponent>
    )
  }
}
