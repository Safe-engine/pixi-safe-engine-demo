import { app } from '../lib/safex'

export function pauseAll() {
  app.ticker.stop()
}

export function resumeAll() {
  app.ticker.start()
}
