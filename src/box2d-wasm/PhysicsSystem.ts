import {
  EntityManager,
  EventManager,
  EventTypes,
  System
} from 'entityx-ts';

import { app, GameWorld, Graphics, instantiate, NodeComp } from 'safex';
import { box2D } from '../game';
import {
  BoxColliderPhysics,
  CircleColliderPhysics,
  ColliderPhysics,
  PolygonColliderPhysics,
  RigidBody,
} from './PhysicsComponent';
import { PhysicsSprite } from './PhysicsSprite';
import { makeDebugDraw } from './debugDraw';

// Box2D.b2Fixture.prototype.shouldCollide = function (other) {
//   const nodeThis: NodeComp = this.getBody().getUserData()
//   const nodeOther = other.getBody().getUserData() as NodeComp
//   const { colliderMatrix } = GameWorld.Instance.systems.get(PhysicsSystem)
//   return colliderMatrix[nodeOther.group][nodeThis.group]
// }

export function setColliderMatrix(colliderMatrix = [[true]]) {
  const physicsSystem = GameWorld.Instance.systems.get(PhysicsSystem)
  physicsSystem.colliderMatrix = colliderMatrix
}
const maxTimeStep = 1 / 60;
const velocityIterations = 1;
const positionIterations = 1;
const metadata: { [key: number]: NodeComp } = {}
const pixelsPerMeter = 32;

export class PhysicsSystem implements System {
  world: Box2D.b2World
  listRemoveBody: Body[] = []
  listRemoveShape: Box2D.b2Shape[] = []
  colliderMatrix = [[true]]
  graphics: Graphics

  configure(event_manager: EventManager) {
    const { b2BodyDef, b2_dynamicBody, b2_staticBody, b2PolygonShape, b2Vec2, b2World, getPointer, b2Draw } = box2D as typeof Box2D;
    const gravity = new b2Vec2(0, 10);
    const world = new b2World(gravity);
    this.world = world
    // event_manager.world.physicsManager = this
    const graphics = new Graphics();
    this.graphics = graphics
    graphics.zIndex = 1000
    app.stage.addChild(graphics);
    const debugDraw = makeDebugDraw(graphics, pixelsPerMeter, box2D);
    // const points = [{ "x": 540, "y": 1040 }, { "x": 540, "y": 1240 }, { "x": 740, "y": 1240 }, { "x": 740, "y": 1040 }].map(Vec2)
    // graphics.poly(points, true)
    // graphics.fill()
    world.SetDebugDraw(debugDraw);
    // event_manager.subscribe(ComponentAddedEvent(RigidBody), this);
    event_manager.subscribe(EventTypes.ComponentAdded, BoxColliderPhysics, ({ entity, component }) => {
      console.log('ComponentAddedEvent BoxColliderPhysics', component)
      let rigidBody = entity.getComponent(RigidBody)
      if (!rigidBody) {
        rigidBody = instantiate(RigidBody)
        entity.assign(rigidBody)
      }
      const { type = 'dynamic', gravityScale = 1, density = 1, friction = 0.3, restitution = 0.5 } = rigidBody.props
      // const physicsMaterial = entity.getComponent(PhysicsMaterial)
      const box = component
      const node = entity.getComponent(NodeComp)
      const { width, height, ...colliderProps } = box.props
      // ett.assign(instantiate(ColliderPhysics, { tag, offset }))
      // const { density, restitution, friction } = physicsMaterial
      const { x = 0, y = 0 } = colliderProps.offset || {}
      const zero = new b2Vec2(0, 0);
      const position = new b2Vec2(node.x, node.y);

      const bd = new b2BodyDef();
      bd.set_type(type === 'dynamic' ? b2_dynamicBody : b2_staticBody);
      bd.set_position(zero);
      // bd.set_gravityScale(gravityScale)
      const body = this.world.CreateBody(bd)
      rigidBody.body = body
      console.log('body', type, b2_dynamicBody, b2_staticBody, getPointer(body));
      // body.setMassData({ mass: 1 } as any)
      const physicsNode = new PhysicsSprite(node.instance, body)
      const square = new b2PolygonShape();
      square.SetAsBox(width / 2, height / 2);
      body.CreateFixture(square, 1)
      body.SetTransform(position, 0);
      body.SetLinearVelocity(zero);
      body.SetAwake(true);
      body.SetEnabled(true);
      metadata[getPointer(body)] = node
      // const debugBox = new Graphics()
      // debugBox.rect(x, y, width, height)
      // debugBox.fill({ color: 0xff0000, alpha: 0.3 })
      // node.instance.addChild(debugBox)
      const physicsCollide = entity.assign(instantiate(ColliderPhysics, colliderProps))
      physicsCollide.instance = physicsNode
      physicsCollide.node = node
      box.node = node
    })
    event_manager.subscribe(EventTypes.ComponentAdded, (CircleColliderPhysics), () => { })
    event_manager.subscribe(EventTypes.ComponentAdded, (PolygonColliderPhysics), () => { })
    event_manager.subscribe(EventTypes.ComponentRemoved, (NodeComp), () => {
      // log('ComponentRemovedEvent NodeComp', event);
      // const node = event.entity.getComponent(NodeComp)
      // if (node.instance instanceof Sprite) {
      //   const body = node.instance.getBody()
      //   this.listRemoveShape.push(...body.shapeList)
      //   this.listRemoveBody.push(body)
      // }
    })
    // this.world.on('begin-contact', this.contactBegin.bind(this))
    // this.world.on('end-contact', this.contactEnd.bind(this))
    // this.world.on('pre-solve', this.preSolve.bind(this))
    // this.world.on('post-solve', this.postSolve.bind(this))
  }

  update(entities: EntityManager, events: EventManager, dt: number) {
    if (this.world) {
      this.graphics.clear()
      const clampedDelta = Math.min(dt, maxTimeStep);
      this.world.Step(clampedDelta, velocityIterations, positionIterations);
      this.world.DebugDraw();
    }
  }

  renderBody(body: Box2D.b2Body) {
    // Render or update body rendering
    const ett = metadata[Box2D.getPointer(body)] as NodeComp
    const collider = ett.getComponent(ColliderPhysics)
    if (collider) {
      collider.instance.node.position = body.GetPosition()
      // collider.instance.angle = body.GetAngle()
      // console.log('renderBody body', body.getPosition())
    }
  }

  renderFixture(fixture: Box2D.b2Fixture) {
    // Render or update fixture rendering
    // const shape = fixture.getShape()
    // console.log('renderFixture shape', shape.m_type)
  }

  renderJoint(joint) {
    // Render or update joint rendering
  }

  contactBegin(contact: Box2D.b2Contact) {
    console.log('contactBegin');
    const { getPointer } = box2D as typeof Box2D;
    const ett1: NodeComp = metadata[getPointer(contact.GetFixtureA().GetBody())]
    const ett2: NodeComp = metadata[getPointer(contact.GetFixtureB().GetBody())]
    // this.world.addPostStepCallback(() => {
    //   // log('addPostStepCallback');
    //   this.listRemoveShape.forEach((s) => this.world.removeShape(s))
    //   this.listRemoveBody.forEach((b) => this.world.removeBody(b))
    //   this.listRemoveBody = []
    //   this.listRemoveShape = []
    // })
    const phys1 = ett1.getComponent(ColliderPhysics)
    const phys2 = ett2.getComponent(ColliderPhysics)
    if (phys1 && phys2) {
      if (Object.prototype.hasOwnProperty.call(phys1, 'onCollisionEnter')) {
        phys1.props.onCollisionEnter(phys2)
      }
      if (Object.prototype.hasOwnProperty.call(phys2, 'onCollisionEnter')) {
        phys2.props.onCollisionEnter(phys1)
      }
    }
  }

  preSolve(contact: Box2D.b2Contact, oldManifold: Box2D.b2Manifold) {
    console.log('preSolve');
  }

  postSolve(contact: Box2D.b2Contact, contactImpulse) {
    console.log('collisionPost');
  }

  contactEnd(contact: Box2D.b2Contact) {
    console.log('collisionSeparate');
    const { getPointer } = box2D as typeof Box2D;
    const ett1: NodeComp = metadata[getPointer(contact.GetFixtureA().GetBody())]
    const ett2: NodeComp = metadata[getPointer(contact.GetFixtureB().GetBody())]
    // const event1 = ett1.getComponent(NodeComp)
    const phys1 = ett1.getComponent(ColliderPhysics)
    const phys2 = ett2.getComponent(ColliderPhysics)
    // const event2 = ett2.getComponent(NodeComp)
    if (phys1 && phys2) {
      if (Object.prototype.hasOwnProperty.call(phys1, 'onCollisionExit')) {
        phys1.props.onCollisionExit(phys2)
      }
      if (Object.prototype.hasOwnProperty.call(phys2, 'onCollisionExit')) {
        phys2.props.onCollisionExit(phys1)
      }
    }
  }

  set enabled(val) {
    if (val) {
      this.world.SetGravity(new Box2D.b2Vec2(0, 98))
      // this.world.iterations = 60
      // this.world.collisionSlop = 0.5
    }
  }
}
