import { AudioAssets } from '../assets'
import { getEffect, getMusic, setMusic } from '../data/GameDataManager'

export default class AudioController {
  private static _instance: AudioController
  private constructor() {}
  public static get Instance() {
    if (!AudioController._instance) {
      AudioController._instance = new AudioController()
    }
    return AudioController._instance
  }

  playEffectSound(type: any) {
    if (getEffect()) {
      type.play()
    }
  }

  playButtonClickSound() {
    this.playEffectSound(AudioAssets.Button)
  }
}
