import { app } from '@safe-engine/pixi'

export function pauseAll() {
  app.ticker.stop()
}

export function resumeAll() {
  app.ticker.start()
}
