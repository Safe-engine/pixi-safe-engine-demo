import { Assets } from '@safe-engine/pixi'
import { button_sfx } from '../assets/AudioAssets'

export default class AudioController {
  private static _instance: AudioController
  private constructor() { }
  public static get Instance() {
    if (!AudioController._instance) {
      AudioController._instance = new AudioController()
    }
    return AudioController._instance
  }

  playEffectSound(type: any) {
    const audioResource = Assets.get(type)
    // console.log('playEffectSound', type, audioResource)
    if (audioResource) {
      audioResource.play()
    } else {
      console.warn(`Audio resource for ${type} not found`)
    }
  }

  playButtonClickSound() {
    this.playEffectSound(button_sfx)
  }
}
