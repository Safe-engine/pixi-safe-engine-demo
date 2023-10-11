import { colliderMatrix, groupList } from 'settings'
import { NodeComp } from '../components/EnhancedComponent'
import { BoxCollider, CircleCollider, Collider, PolygonCollider, SpriteComp, RigidBody } from '../components/PhysicsComponent'
import { SpriteRender } from '../components/RenderComponent'
import { Entity, EntityManager } from '../../exts/entity'
import { ComponentAddedEvent, ComponentRemovedEvent, EventManager, EventReceive } from '../../exts/event'
import { System } from '../../exts/system'
import { World, Vec2, Box, Contact } from 'planck'
import { Graphics } from 'pixi.js'

// function create(key: string, event: EventReceive, world: World) {
//   const sprite = event.entity.getComponent(SpriteComp)
//   const rigidBody = event.entity.getComponent(RigidBody)
//   const { texType, path, group } = sprite
//   // const { type } = rigidBody;
//   let physicSprite: Sprite
//   if (texType === ccui.Widget.LOCAL_TEXTURE) {
//     physicSprite = Sprite.create(path)
//   } else {
//     const frame = spriteFrameCache.getSpriteFrame(path)
//     physicSprite = Sprite.create(frame)
//   }
//   const ett = event.entity
//   const node = ett.assign(new NodeComp(physicSprite, ett))
//   let body: cp.Body
//   let shape: cp.Shape
//   let collider: any
//   switch (key) {
//     case ComponentAddedEvent(BoxCollider): {
//       collider = ett.getComponent(BoxCollider)
//       const { density, width, height, offset, restitution, friction, tag } = collider
//       const { x, y } = offset
//       body = new cp.Body(density, cp.momentForBox(density, width, height))
//       const hw = width * 0.5
//       const hh = height * 0.5
//       shape = new cp.BoxShape2(body, new cp.BB(-hw + x, -hh + y, hw + x, hh + y))
//       const physicsCollide = ett.assign(Collider, new Collider(tag, offset, density, restitution, friction))
//       physicsCollide.node = node
//       break
//     }
//     case ComponentAddedEvent(CircleCollider): {
//       collider = ett.getComponent(CircleCollider)
//       const { density, offset, radius, restitution, friction, tag } = collider
//       body = new cp.Body(density, cp.momentForCircle(density, radius, radius, offset))
//       shape = new cp.CircleShape(body, radius, offset)
//       const physicsCollide = ett.assign(Collider, new Collider(tag, offset, density, restitution, friction))
//       physicsCollide.node = node
//       break
//     }
//     case ComponentAddedEvent(PolygonCollider): {
//       collider = ett.getComponent(PolygonCollider)
//       const { density, offset, points, restitution, friction, tag } = collider
//       body = new cp.Body(density, cp.momentForPoly(density, points, offset))
//       shape = new cp.PolyShape(body, points, offset)
//       const physicsCollide = ett.assign(Collider, new Collider(tag, offset, density, restitution, friction))
//       physicsCollide.node = node
//       break
//     }
//     default:
//       break
//   }
//   const { restitution = 0, friction = 0.2, tag, sensor } = collider
//   shape.setElasticity(restitution)
//   shape.setFriction(friction)
//   // shape.setSensor(sensor);
//   shape.group = typeof group === 'string' ? groupList.indexOf(group) : group
//   // if (type === RigidBodyType.Dynamic) {
//   world.addShape(shape)
//   sprite.shape = shape
//   // } else {
//   //   world.addStaticShape(shape);
//   // }
//   world.addBody(body)
//   physicSprite.setBody(body)

//   body.data = ett
//   // sprite.node = node;
//   collider.node = node
//   // rigidBody.node = node;
//   ett.components[SpriteRender.name] = new SpriteRender(path, texType, SpriteType.SIMPLE)
// }

export class PhysicsSystem implements System {
  world: World
  _debugNode: Graphics
  listRemoveBody: Body[] = []
  listRemoveShape: Shape[] = []

  configure(event_manager: EventManager) {
    this.world = new World()
    // this.world.setDefaultCollisionHandler(
    //   this.collisionBegin.bind(this),
    //   this.collisionPre.bind(this),
    //   this.collisionPost.bind(this),
    //   this.collisionSeparate.bind(this),
    // )
    // event_manager.world.physicsManager = this
    // event_manager.subscribe(ComponentAddedEvent(RigidBody), this);
    event_manager.subscribe(ComponentAddedEvent(BoxCollider), this)
    event_manager.subscribe(ComponentAddedEvent(CircleCollider), this)
    event_manager.subscribe(ComponentAddedEvent(PolygonCollider), this)
    event_manager.subscribe(ComponentRemovedEvent(NodeComp), this)
    this.world.on('begin-contact', this.contactBegin.bind(this))
    this.world.on('end-contact', this.contactEnd.bind(this))
    this.world.on('pre-solve', function (contact, oldManifold) {
      /* handle pre-solve event */
    })
    this.world.on('post-solve', function (contact, contactImpulse) {
      /* handle post-solve event */
    })
  }

  receive(type: string, event: EventReceive) {
    // const currentScene = director.getRunningScene();
    switch (type) {
      // case ComponentAddedEvent(SpriteComp): {
      //   log(event);
      //   break;
      // }

      case ComponentAddedEvent(BoxCollider): {
        const ett = event.entity
        const rigidBody = ett.getComponent(RigidBody)
        const box = ett.getComponent(BoxCollider)
        const node = ett.getComponent(NodeComp)
        const body = this.world.createBody({
          position: Vec2(0, 2), // the body's origin position.
          angle: 0.25 * Math.PI, // the body's angle in radians.
          userData: ett,
        })
        const { density, width, height, offset, restitution, friction, tag } = box
        const { x, y } = offset
        const shape = new Box(width, height)
        const myFixture = body.createFixture({
          shape,
          density: 1,
        })
        const physicsCollide = ett.assign(new Collider(tag, offset, density, restitution, friction))
        physicsCollide.node = node
        box.node = node
        break
      }
      case ComponentAddedEvent(CircleCollider):
      case ComponentAddedEvent(PolygonCollider): {
        // log('BoxCollider', event);
        create(type, event, this.world)
        break
      }

      case ComponentRemovedEvent(NodeComp): {
        // log('ComponentRemovedEvent NodeComp', event);
        const node = event.entity.getComponent(NodeComp)
        if (node.instance instanceof Sprite) {
          const body = node.instance.getBody()
          this.listRemoveShape.push(...body.shapeList)
          this.listRemoveBody.push(body)
        }
        break
      }
      default:
        break
    }
  }

  update(entities: EntityManager, events: EventManager, dt: number) {
    if (this.world) {
      this.world.step(dt)

      // Iterate over bodies
      for (let body = this.world.getBodyList(); body; body = body.getNext()) {
        this.renderBody(body)
        // ... and fixtures
        for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
          this.renderFixture(fixture)
        }
      }

      // Iterate over joints
      for (let joint = this.world.getJointList(); joint; joint = joint.getNext()) {
        this.renderJoint(joint)
      }
    }
  }

  renderBody(body) {
    // Render or update body rendering
  }

  renderFixture(fixture) {
    // Render or update fixture rendering
  }

  renderJoint(joint) {
    // Render or update joint rendering
  }

  contactBegin(contact: Contact) {
    const shapes = arbiter.getShapes()
    // log(arbiter);
    const ett1: Entity = arbiter.body_a.data
    const ett2: Entity = arbiter.body_b.data
    const groupA = shapes[0].group
    const groupB = shapes[1].group
    // log(groupA, groupB, colliderMatrix[groupA][groupB]);
    if (!colliderMatrix[groupA][groupB]) {
      return false
    }
    this.world.addPostStepCallback(() => {
      // log('addPostStepCallback');
      this.listRemoveShape.forEach((s) => this.world.removeShape(s))
      this.listRemoveBody.forEach((b) => this.world.removeBody(b))
      this.listRemoveBody = []
      this.listRemoveShape = []
    })
    const event1 = ett1.getComponent(NodeComp)
    const phys1 = ett1.getComponent(Collider)
    const phys2 = ett2.getComponent(Collider)
    const event2 = ett2.getComponent(NodeComp)
    if (event1) {
      if (phys1 && phys2) {
        event1.emit('onContactBegin', arbiter.contacts, phys1, phys2)
      }
    }
    if (event2) {
      if (phys1 && phys2) {
        event2.emit('onContactBegin', arbiter.contacts, phys2, phys1)
      }
    }
    return false
  }

  collisionPre(arbiter: cp.Arbiter, world: World) {
    // log('collisionPre');
    return true
  }

  collisionPost(arbiter: cp.Arbiter, world: World) {
    // log('collisionPost');
    return true
  }

  contactEnd(contact: Contact) {
    // log('collisionSeparate');
    const ett1: Entity = arbiter.body_a.data
    const ett2: Entity = arbiter.body_b.data
    const event1 = ett1.getComponent(NodeComp)
    const phys1 = ett1.getComponent(Collider)
    const phys2 = ett2.getComponent(Collider)
    const event2 = ett2.getComponent(NodeComp)
    if (event1) {
      if (phys1 && phys2) {
        event1.emit('onContactEnd', arbiter.contacts, ett1.getComponent(Collider), ett2.getComponent(Collider))
      }
    }
    if (event2) {
      if (phys1 && phys2) {
        event2.emit('onContactEnd', arbiter.contacts, ett2.getComponent(Collider), ett1.getComponent(Collider))
      }
    }
    return true
  }

  setupDebugNode(currentScene: Node) {
    // const currentScene = director.getRunningScene();
    this._debugNode = new DebugNode(this.world)
    this._debugNode.visible = true
    currentScene.addChild(this._debugNode, 100)
  }

  set enabled(val) {
    if (val) {
      this.world.gravity = cp.v(0, -300)
      this.world.iterations = 60
      this.world.collisionSlop = 0.5
    }
  }
}
