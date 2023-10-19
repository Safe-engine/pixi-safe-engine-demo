import { Point, Sprite, SpriteSource, Texture, TextureSource } from 'pixi.js'
import { EnhancedComponent, NodeComp } from './EnhancedComponent'
import { GameWorld } from '..'
export class NodeRender extends EnhancedComponent {
  nodeName: string
  constructor(name?: string) {
    super()
    this.nodeName = name
  }
}

export class SpriteRender extends EnhancedComponent {
  private frameName: TextureSource
  texType: number
  type: number
  fillType: number
  _fillRange: number
  fillCenter: Point
  static FillType = {
    HORIZONTAL: 0,
    VERTICAL: 1,
    RADIAL: 2,
  }

  // constructor(frameName: SpriteSource, texType?: number, type?: number, fillType?: number, fillRange?: number, fillCenter?: Point) {
  //   super()
  //   this.frameName = frameName
  //   this.texType = texType
  //   this.type = type
  //   this.fillType = fillType
  //   this._fillRange = fillRange
  //   this.fillCenter = fillCenter
  // }

  // set fillStart(val: number) {
  //   if (this.node.instance instanceof cc.ProgressTimer) {
  //     this.node.instance.setMidpoint(cc.v2(val, val));
  //   }
  // }

  // set fillRange(val: number) {
  //   if (this.node.instance instanceof cc.ProgressTimer) {
  //     this.node.instance.setPercentage(val * 100);
  //   }
  // }

  get spriteFrame() {
    return this.frameName
  }

  set spriteFrame(frame) {
    this.frameName = frame
    const sprite = this.node.instance as Sprite
    // if (this.node.instance instanceof cc.Sprite) {
    sprite.texture = Texture.from(frame)
    // } else if (this.node.instance instanceof ccui.ImageView) {
    //   if (this.texType) {
    //     this.node.instance.loadTexture(frame, this.texType);
    //   } else {
    //     this.node.instance.loadTexture(frame);
    //   }
    //   const sprite = new cc.Sprite(frame);
    //   this.node.setContentSize(sprite.getContentSize());
    // } else if (this.node.instance instanceof ccui.Button) {
    //   this.node.instance.loadTextureNormal(frame);
    // }
  }
  static create() {
    const world = GameWorld.Instance
    const root = world.entities.create()
    const sprite = root.assign(new SpriteRender())
    return sprite
  }
}

export class ImageRender extends EnhancedComponent {
  spriteFrame: string
  texType: number
  constructor(spriteFrame: string, texType?: number) {
    super()
    this.spriteFrame = spriteFrame
    this.texType = texType
  }
}

export class MaskRender extends EnhancedComponent {
  type: number
  segments: number
  inverted: boolean
  constructor(type: number, segments: number, inverted: boolean) {
    super()
    this.type = type
    this.segments = segments
    this.inverted = inverted
  }
}

export class SpineSkeleton extends EnhancedComponent {
  data: any
  skin: string
  animation: string
  loop: boolean
  timeScale: number
  constructor({ data, skin, animation, loop, timeScale }) {
    super()
    this.data = data
    this.skin = skin
    this.animation = animation
    this.loop = loop
    this.timeScale = timeScale
  }
  static create(data) {
    const world = GameWorld.Instance
    const root = world.entities.create()
    const sprite = root.assign(new SpineSkeleton(data))
    return sprite
  }
}
