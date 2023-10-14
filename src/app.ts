import { Application } from 'pixi.js'
export const app = new Application({
  width: 1080,
  height: 1920,
  antialias: true,
  resolution: window.devicePixelRatio,
})

app.stage.position.y = app.renderer.height / app.renderer.resolution
app.stage.scale.y = -1
