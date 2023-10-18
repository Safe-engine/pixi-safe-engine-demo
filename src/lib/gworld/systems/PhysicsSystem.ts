import { Container, Graphics } from 'pixi.js'
import { Body, Box, Contact, Fixture, Manifold, Shape, Vec2, World } from 'planck'
import { colliderMatrix } from '../../../settings'
import { Entity, EntityManager } from '../../exts/entity'
import { ComponentAddedEvent, ComponentRemovedEvent, EventManager, EventReceive } from '../../exts/event'
import { System } from '../../exts/system'
import { NodeComp } from '../components/EnhancedComponent'
import { BoxCollider, CircleCollider, Collider, PhysicsMaterial, PolygonCollider, RigidBody } from '../components/PhysicsComponent'

Fixture.prototype.shouldCollide = function (other) {
  const nodeThis: NodeComp = this.getBody().getUserData()
  const nodeOther: NodeComp = other.getBody().getUserData()
  return colliderMatrix[nodeOther.group][nodeThis.group]
}

export class PhysicsSystem implements System {
  world: World
  _debugNode: Graphics
  listRemoveBody: Body[] = []
  listRemoveShape: Shape[] = []

  configure(event_manager: EventManager) {
    // Settings.lengthUnitsPerMeter = 100
    this.world = new World({
      gravity: Vec2(0, -1),
    })
    // event_manager.world.physicsManager = this
    // event_manager.subscribe(ComponentAddedEvent(RigidBody), this);
    event_manager.subscribe(ComponentAddedEvent(BoxCollider), this)
    event_manager.subscribe(ComponentAddedEvent(CircleCollider), this)
    event_manager.subscribe(ComponentAddedEvent(PolygonCollider), this)
    event_manager.subscribe(ComponentRemovedEvent(NodeComp), this)
    this.world.on('begin-contact', this.contactBegin.bind(this))
    this.world.on('end-contact', this.contactEnd.bind(this))
    this.world.on('pre-solve', this.preSolve.bind(this))
    this.world.on('post-solve', this.postSolve.bind(this))
  }

  receive(type: string, event: EventReceive) {
    switch (type) {
      // case ComponentAddedEvent(SpriteComp): {
      //   log(event);
      //   break;
      // }

      case ComponentAddedEvent(BoxCollider): {
        console.log('ComponentAddedEvent BoxCollider', event)
        const ett = event.entity
        const rigidBody = ett.getComponent(RigidBody)
        const physicsMaterial = ett.getComponent(PhysicsMaterial)
        const box = ett.getComponent(BoxCollider)
        const node = ett.getComponent(NodeComp)
        const { width, height, offset, tag } = box
        ett.assign(new Collider(tag, offset))
        // const { density, restitution, friction } = physicsMaterial
        const { x, y } = offset
        const bodyDef = {
          position: node.position as any, // the body's origin position.
          angle: 0.25 * Math.PI, // the body's angle in radians.
          userData: node,
          type: rigidBody.type,
          gravityScale: 0,
        }
        if (rigidBody) {
          const { gravityScale } = rigidBody
          bodyDef.gravityScale = gravityScale
        }
        const body = this.world.createBody(bodyDef)
        rigidBody.body = body
        // body.setMassData({ mass: 1 } as any)

        const shape = new Box(width, height)
        body.createFixture({
          shape,
          density: 1,
          isSensor: false,
        })
        const debugBox = new Graphics()
        // const { x, y } = node.position
        // shape.m_vertices
        debugBox.beginFill(0xff0000, 0.3)
        debugBox.drawRect(x, y, width, height)
        node.instance.addChild(debugBox)
        const physicsCollide = ett.assign(new Collider(tag, offset))
        physicsCollide.node = node
        box.node = node
        break
      }
      case ComponentAddedEvent(CircleCollider):
      case ComponentAddedEvent(PolygonCollider): {
        // log('BoxCollider', event);
        // create(type, event, this.world)
        break
      }

      case ComponentRemovedEvent(NodeComp): {
        // log('ComponentRemovedEvent NodeComp', event);
        const node = event.entity.getComponent(NodeComp)
        // if (node.instance instanceof Sprite) {
        //   const body = node.instance.getBody()
        //   this.listRemoveShape.push(...body.shapeList)
        //   this.listRemoveBody.push(body)
        // }
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

  renderBody(body: Body) {
    // Render or update body rendering
    const ett: Entity = body.getUserData() as Entity
    const node = ett.getComponent(NodeComp)
    if (node) {
      node.x = body.getPosition().x
      node.y = body.getPosition().y
      node.angle = body.getAngle()
      // console.log('renderBody body', body.getPosition())
    }
  }

  renderFixture(fixture: Fixture) {
    // Render or update fixture rendering
    const shape = fixture.getShape()
    // console.log('renderFixture shape', shape.m_type)
  }

  renderJoint(joint) {
    // Render or update joint rendering
  }

  contactBegin(contact: Contact) {
    const ett1: NodeComp = contact.getFixtureA().getBody().getUserData() as NodeComp
    const ett2: NodeComp = contact.getFixtureB().getBody().getUserData() as NodeComp
    // this.world.addPostStepCallback(() => {
    //   // log('addPostStepCallback');
    //   this.listRemoveShape.forEach((s) => this.world.removeShape(s))
    //   this.listRemoveBody.forEach((b) => this.world.removeBody(b))
    //   this.listRemoveBody = []
    //   this.listRemoveShape = []
    // })
    const phys1 = ett1.getComponent(Collider)
    const phys2 = ett2.getComponent(Collider)
    if (phys1 && phys2) {
      if (Object.prototype.hasOwnProperty.call(phys1, '_onCollisionEnter')) {
        phys1._onCollisionEnter(phys2)
      }
      if (Object.prototype.hasOwnProperty.call(phys2, '_onCollisionEnter')) {
        phys2._onCollisionEnter(phys1)
      }
    }
  }

  preSolve(contact: Contact, oldManifold: Manifold) {
    // log('preSolve');
  }

  postSolve(contact: Contact, contactImpulse) {
    // log('collisionPost');
  }

  contactEnd(contact: Contact) {
    // log('collisionSeparate');
    const ett1: Entity = contact.getFixtureA().getBody().getUserData() as Entity
    const ett2: Entity = contact.getFixtureB().getBody().getUserData() as Entity
    const event1 = ett1.getComponent(NodeComp)
    const phys1 = ett1.getComponent(Collider)
    const phys2 = ett2.getComponent(Collider)
    const event2 = ett2.getComponent(NodeComp)
    if (event1) {
      if (phys1 && phys2) {
        event1.emit('onCollisionExit', contact, ett1.getComponent(Collider), ett2.getComponent(Collider))
      }
    }
    if (event2) {
      if (phys1 && phys2) {
        event2.emit('onCollisionExit', contact, ett2.getComponent(Collider), ett1.getComponent(Collider))
      }
    }
  }

  setupDebugNode(currentScene: Container) {
    // const currentScene = director.getRunningScene();
    this._debugNode = new Graphics()
    this._debugNode.visible = true
    currentScene.addChild(this._debugNode)
  }

  set enabled(val) {
    if (val) {
      this.world.setGravity(Vec2(0, -300))
      // this.world.iterations = 60
      // this.world.collisionSlop = 0.5
    }
  }
}
