import { Action, Animation } from 'pixi-action-ease'

interface HMR {
  accept: (cb?: () => void) => void
  dispose: (cb?: () => void) => void
}

declare namespace module {
  const hot: HMR
}

// Add this after the imports (after importing Action and Animation)
declare module '@safe-engine/pixi' {
  interface NodeComp {
    actionsList: Animation[]
    runAction(act: Action): Animation
    stopAllActions(): void
    pauseAllActionsAndSchedule(): void
    resumeAllActionsAndSchedule(): void
  }
}
