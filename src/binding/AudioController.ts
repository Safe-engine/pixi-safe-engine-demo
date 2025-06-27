import { back_ground_music_sfx, button_sfx } from '../assets/AudioAssets'
import { getEffect, getMusic } from '../data/GameDataManager'

export default class AudioController {
  private static _instance: AudioController
  private constructor() {}
  public static get Instance() {
    if (!AudioController._instance) {
      AudioController._instance = new AudioController()
    }
    return AudioController._instance
  }

  playBackgroundMusic() {
    const newMusicState = getMusic()
    // cc.log('toggleBackgroundMusic', this.music);
    if (newMusicState) {
      if (!cc.audioEngine.isMusicPlaying()) {
        cc.audioEngine.playMusic(back_ground_music_sfx, true)
        // cc.audioEngine.setMusicVolume(1);
      } else {
        cc.audioEngine.resumeMusic()
      }
    } else {
      cc.audioEngine.pauseMusic()
    }
  }
  playEffectSound(type: string) {
    if (getEffect()) {
      cc.audioEngine.playEffect(type, false)
    }
  }

  playButtonClickSound() {
    this.playEffectSound(button_sfx)
  }
}
