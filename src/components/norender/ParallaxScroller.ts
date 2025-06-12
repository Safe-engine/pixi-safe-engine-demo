import { NoRenderComponentX } from '@safe-engine/cocos'

export default class ParallaxScroller extends NoRenderComponentX {
  resetY = 20.0
  speed = 20.0

  // onLoad () {}

  update(dt: Float) {
    let y = this.node.position.y
    y += this.speed * dt
    if (y <= this.resetY * this.node.scaleY) {
      y -= this.resetY * this.node.scaleY
    }
    this.node.setPositionY(y)
  }
}
