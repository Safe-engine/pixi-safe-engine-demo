import { EnhancedComponent, NodeComp } from './EnhancedComponent'
import { Vec2 } from 'planck'

// export class SpriteComp extends EnhancedComponent {
//   path: string
//   texType: ccui.Widget.TextureType
//   group: string | number
//   shape: cp.Shape

//   constructor(path: string, texType?: ccui.Widget.TextureType, group?: string | number) {
//     super()
//     this.path = path
//     this.texType = texType
//     this.group = group
//   }
// }
export enum BodyType {
  kinematic,
  dynamic,
  static,
}
export class RigidBody extends EnhancedComponent {
  type: BodyType
  density: number
  restitution: number
  friction: number
  constructor(type: BodyType) {
    super()
    this.type = type
  }

  // set linearVelocity(vel: Vec2) {
  //   if (!this.node) {
  //     return
  //   }
  //   const physics = this.node.instance
  //   if (physics instanceof Sprite) {
  //     physics.getBody().setVel(vel)
  //   }
  // }

  // get linearVelocity() {
  //   if (!this.node) {
  //     return Vec2.ZERO
  //   }
  //   const physics = this.node.instance
  //   const vel = (physics as Sprite).getBody().getVel()
  //   return v2(vel)
  // }
}

export class Collider extends EnhancedComponent {
  tag: number
  offset: Vec2

  enabled: boolean = true

  constructor(tag: number, offset: Vec2, density: number, restitution: number, friction: number) {
    super()
    this.tag = tag
    this.offset = offset
  }
}

export class BoxCollider extends Collider {
  width: number
  height: number

  constructor(tag: number, offset: Vec2, density: number, restitution: number, friction: number, width: number, height: number) {
    super(tag, offset, density, restitution, friction)
    this.width = width
    this.height = height
  }
}

export class CircleCollider extends Collider {
  radius: number

  constructor(tag: number, offset: Vec2, density: number, restitution: number, friction: number, radius: number) {
    super(tag, offset, density, restitution, friction)
    this.radius = radius
  }
}

export class PolygonCollider extends Collider {
  points: number[]

  constructor(tag: number, offset: Vec2, density: number, restitution: number, friction: number, points: number[]) {
    super(tag, offset, density, restitution, friction)
    this.points = points
  }
}
