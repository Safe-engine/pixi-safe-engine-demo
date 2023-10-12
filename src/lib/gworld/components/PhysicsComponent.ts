import { Body, BodyType, Vec2 } from 'planck'
import { Group } from '../../../settings'
import { EnhancedComponent } from './EnhancedComponent'

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
// export enum BodyType {
//   kinematic,
//   dynamic,
//   static,
// }
export class RigidBody extends EnhancedComponent {
  type: BodyType
  density: number
  restitution: number
  friction: number
  body: Body
  gravityScale = 1
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

export class PhysicsMaterial extends EnhancedComponent {
  density: number
  restitution: number
  friction: number
  constructor({ density, restitution, friction }) {
    super()
    this.density = density
    this.restitution = restitution
    this.friction = friction
  }
}

export class Collider extends EnhancedComponent {
  tag: number
  group: number
  offset: Vec2

  enabled: boolean = true

  constructor(tag: number, offset: Vec2) {
    super()
    this.tag = tag
    this.offset = offset
    this.group = Group.Default
  }
}

export class BoxCollider extends Collider {
  width: number
  height: number

  constructor({ tag = 0, offset = Vec2.zero(), width, height }) {
    super(tag, offset)
    this.width = width
    this.height = height
  }
}

export class CircleCollider extends Collider {
  radius: number

  constructor({ tag, offset, radius }) {
    super(tag, offset)
    this.radius = radius
  }
}

export class PolygonCollider extends Collider {
  points: number[]

  constructor({ tag, offset, points }) {
    super(tag, offset)
    this.points = points
  }
}
