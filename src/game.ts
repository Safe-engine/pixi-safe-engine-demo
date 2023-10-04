import { Application, Sprite, Assets, SpriteSource } from 'pixi.js'
import { GameWorld } from './gworld'
import { SpriteRender } from './lib/gworld/components/RenderComponent'
import { NodeComp } from './lib/gworld/components/EnhancedComponent'

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application()

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view as never)
;(async () => {
  // load the texture we need
  const texture = await Assets.load<SpriteSource>('dialog-name.png')

  // This creates a texture from a 'bunny.png' image
  const bunny = Sprite.from(texture)

  // Setup the position of the bunny
  bunny.x = app.renderer.width / 2
  bunny.y = app.renderer.height / 2

  // Rotate around the center
  bunny.anchor.x = 0.5
  bunny.anchor.y = 0.5

  // Add the bunny to the scene we are building
  // app.stage.addChild(bunny)
  // Listen for frame updates
  // app.ticker.add(() => {
  //   // each frame we spin the bunny around a bit
  //   bunny.rotation += 0.01
  // })
  const world = GameWorld.Instance
  world.entities.reset()
  const root = world.entities.create()
  const rootNode = root.assign(new NodeComp(app.stage, root))
  const sprite = world.entities.create()
  sprite.assign(new SpriteRender(texture))
  const spriteNode = sprite.getComponent(NodeComp)
  rootNode.addChild(spriteNode)
  spriteNode.x = 100
  spriteNode.y = 100
  spriteNode.anchorY = 1
})()
