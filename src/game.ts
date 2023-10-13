import 'pixi-spine'
import { Assets, Sprite, SpriteSource } from 'pixi.js'
import { app } from './app'
import { Hero } from './components/Hero'
import { Monster } from './components/Monster'
import { GameWorld } from './gworld'
import { registerSystem } from './helper/utils'
import { Home } from './scene/Home'
import { SpineAssets } from './assets'

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
// The application will create a canvas element for you that you
// can then insert into the DOM
async function start() {
  document.body.appendChild(app.view as never)
  // load the texture we need
  const texture = await Assets.load<SpriteSource>('dialog-name.png')
  Assets.addBundle('fonts', {
    LilitaOne: 'LilitaOne-Regular.ttf',
  })
  await Assets.loadBundle('fonts')
  await Assets.load(SpineAssets.boss01).then((resource) => {
    console.log('resource.spineData', resource.spineData)
    SpineAssets.boss01 = resource.spineData
  })
  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    GameWorld.Instance.update(app.ticker.deltaTime)
  })
  registerSystem(Monster)
  registerSystem(Hero)
  registerSystem(Home)
  GameWorld.Instance.systems.configure()
  Home.boot()
}
start()
