import { colliderMatrix, groupList } from '../../../settings'
import { NodeComp } from '../components/EnhancedComponent'
import { BoxCollider, CircleCollider, Collider, PolygonCollider, SpriteComp, RigidBody } from '../components/PhysicsComponent'
import { Entity, EntityManager } from '../../exts/entity'
import { ComponentAddedEvent, ComponentRemovedEvent, EventManager, EventReceive } from '../../exts/event'
import { System } from '../../exts/system'
import { World, Vec2, Box, Contact, Manifold, Body, Fixture, Shape } from 'planck'
import { Container, Graphics, Sprite } from 'pixi.js'

export class PhysicsSystem implements System {
  world: World
  _debugNode: Graphics
  listRemoveBody: Body[] = []
  listRemoveShape: Shape[] = []

  configure(event_manager: EventManager) {
    this.world = new World()
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
    this.world.setGravity(Vec2(0, 1))
  }

  receive(type: string, event: EventReceive) {
    // const currentScene = director.getRunningScene();
    switch (type) {
      // case ComponentAddedEvent(SpriteComp): {
      //   log(event);
      //   break;
      // }

      case ComponentAddedEvent(BoxCollider): {
        console.log('ComponentAddedEvent BoxCollider', event);
        const ett = event.entity
        const rigidBody = ett.getComponent(RigidBody)
        const box = ett.getComponent(BoxCollider)
        const node = ett.getComponent(NodeComp)
        const body = this.world.createBody({
          position: Vec2(110, 22), // the body's origin position.
          angle: 0.25 * Math.PI, // the body's angle in radians.
          userData: ett,
          type: 'kinematic',
        })
        const { density, width, height, offset, restitution, friction, tag } = box
        // const { x, y } = offset
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
    node.x = body.getPosition().x
    node.y = body.getPosition().y
  }

  renderFixture(fixture: Fixture) {
    // Render or update fixture rendering
    const shape = fixture.getShape()
    console.log('renderFixture shape', shape.m_type)
  }

  renderJoint(joint) {
    // Render or update joint rendering
  }

  contactBegin(contact: Contact) {
    const ett1: Entity = contact.getFixtureA().getBody().getUserData() as Entity
    const ett2: Entity = contact.getFixtureB().getBody().getUserData() as Entity
    // this.world.addPostStepCallback(() => {
    //   // log('addPostStepCallback');
    //   this.listRemoveShape.forEach((s) => this.world.removeShape(s))
    //   this.listRemoveBody.forEach((b) => this.world.removeBody(b))
    //   this.listRemoveBody = []
    //   this.listRemoveShape = []
    // })
    const event1 = ett1.getComponent(NodeComp)
    const phys1 = ett1.getComponent(Collider)
    const phys2 = ett2.getComponent(Collider)
    const event2 = ett2.getComponent(NodeComp)
    if (event1) {
      if (phys1 && phys2) {
        event1.emit('onContactBegin', contact, phys1, phys2)
      }
    }
    if (event2) {
      if (phys1 && phys2) {
        event2.emit('onContactBegin', contact, phys2, phys1)
      }
    }
    return false
  }

  preSolve(contact: Contact, oldManifold: Manifold) {
    // log('preSolve');
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
        event1.emit('onContactEnd', contact, ett1.getComponent(Collider), ett2.getComponent(Collider))
      }
    }
    if (event2) {
      if (phys1 && phys2) {
        event2.emit('onContactEnd', contact, ett2.getComponent(Collider), ett1.getComponent(Collider))
      }
    }
    return true
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
