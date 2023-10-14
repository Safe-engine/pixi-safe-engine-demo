import { EntityManager } from '../../exts/entity'
import { ComponentAddedEvent, ComponentRemovedEvent, EventManager, EventReceive } from '../../exts/event'
import { System } from '../../exts/system'
import { NodeComp } from '../components/EnhancedComponent'
import { Graphics, ImageRender, MaskRender, NodeRender, SpineSkeleton, SpriteRender } from '../components/RenderComponent'
import { Container, Sprite, Assets, SpriteSource } from 'pixi.js'
import { SceneComponent } from '../core/Scene'
import { Spine } from 'pixi-spine'

enum SpriteTypes {
  SIMPLE,
  SLICED,
  TILED,
  FILLED,
  MESH,
  ANIMATION,
}

export class RenderSystem implements System {
  configure(event_manager: EventManager) {
    event_manager.subscribe(ComponentAddedEvent(SceneComponent), this)
    event_manager.subscribe(ComponentAddedEvent(NodeRender), this)
    event_manager.subscribe(ComponentAddedEvent(SpriteRender), this)
    // event_manager.subscribe(ComponentAddedEvent(ImageRender), this)
    // event_manager.subscribe(ComponentAddedEvent(MaskRender), this)
    event_manager.subscribe(ComponentAddedEvent(SpineSkeleton), this)
    // event_manager.subscribe(ComponentAddedEvent(Graphics), this)
    event_manager.subscribe(ComponentAddedEvent(NodeComp), this)
    event_manager.subscribe(ComponentRemovedEvent(NodeComp), this)
  }

  receive(type: string, event: EventReceive) {
    switch (type) {
      case ComponentAddedEvent(SceneComponent): {
        const ett = event.entity
        const sceneComp = ett.getComponent(SceneComponent)
        sceneComp.node = ett.getComponent(NodeComp)
        break
      }
      case ComponentAddedEvent(NodeRender): {
        console.log('NodeRender', event)
        const ett = event.entity
        const nodeRenderComp = ett.getComponent(NodeRender)
        const node = new Container()
        nodeRenderComp.node = ett.assign(new NodeComp(node, ett))
        break
      }

      case ComponentAddedEvent(SpriteRender): {
        console.log('ComponentAddedEvent SpriteRender', event)
        const ett = event.entity
        const spriteComp = ett.getComponent(SpriteRender)
        // const { spriteFrame, texType, type, fillType, _fillRange, fillCenter } = spriteComp
        // let node
        // if (type === SpriteTypes.ANIMATION) {
        // node = Sprite.from(spriteFrame)
        const node = new Sprite()
        // } else if (type === SpriteTypes.FILLED) {
        //   const sprite = new cc.Sprite(spriteFrame)
        //   node = new cc.ProgressTimer(sprite)
        //   const ptt = fillType === SpriteRender.FillType.RADIAL ? cc.ProgressTimer.TYPE_RADIAL : cc.ProgressTimer.TYPE_BAR
        //   node.setType(ptt)
        //   if (fillType !== SpriteRender.FillType.RADIAL) {
        //     const rate = fillType === SpriteRender.FillType.HORIZONTAL ? cc.p(1, 0) : cc.p(0, 1)
        //     node.setBarChangeRate(rate)
        //   }
        //   node.setPercentage(_fillRange * 100)
        //   node.setMidpoint(fillCenter)
        // } else {
        //   const sprite = new cc.Sprite(spriteFrame)
        //   node = new ccui.ImageView(spriteFrame, texType)
        //   // node.setScale9Enabled(true);
        //   ;(node as ccui.ImageView).setContentSize(sprite.getContentSize())
        //   // node.ignoreContentAdaptWithSize(true);
        // }
        spriteComp.node = ett.assign(new NodeComp(node, ett))
        break
      }

      // case ComponentAddedEvent(ImageRender): {
      //   console.log('ImageRender', event);
      //   const imageComp = event.entity.getComponent(ImageRender)
      //   const { spriteFrame, texType } = imageComp
      //   const node = new ccui.ImageView(spriteFrame, texType)
      //   const ett = event.entity
      //   node.setScale9Enabled(true)
      //   imageComp.node = ett.assign(new NodeComp(node, ett))
      //   break
      // }

      // case ComponentAddedEvent(MaskRender): {
      //   console.log('MaskRender', event.component);
      //   const ett = event.entity
      //   const maskComp = event.entity.getComponent(MaskRender)
      //   const { type, segments, inverted } = maskComp
      //   const node = new cc.ClippingNode()
      //   node.setInverted(inverted)
      //   maskComp.node = ett.assign(new NodeComp(node, ett))
      //   break
      // }

      case ComponentAddedEvent(SpineSkeleton): {
        console.log('SpineSkeleton', event.component)
        const ett = event.entity
        const spine = ett.getComponent(SpineSkeleton)
        const { data, skin, animation, loop, timeScale } = spine
        const node = new Spine(data)
        if (skin) {
          node.skeleton.setSkinByName(skin)
        }
        if (animation) {
          node.state.setAnimation(0, animation, loop)
        }
        if (timeScale) {
          node.state.timeScale = timeScale
        }
        spine.node = ett.assign(new NodeComp(node, ett))
        break
      }

      // case ComponentAddedEvent(Graphics): {
      //   console.log('MaskRender', event.component);
      //   const ett = event.entity
      //   const graphics = event.entity.getComponent(Graphics)
      //   const { lineWidth, strokeColor, fillColor } = graphics
      //   const node = new cc.DrawNode()
      //   node.setColor(strokeColor)
      //   node.setDrawColor(fillColor)
      //   node.setLineWidth(lineWidth)
      //   graphics.node = ett.assign(new NodeComp(node, ett))
      //   break
      // }
      case ComponentAddedEvent(NodeComp): {
        const node = event.component as NodeComp
        if (node) {
          node.instance.scale.y = -1
        }
        break
      }
      case ComponentRemovedEvent(NodeComp): {
        const node = event.component as NodeComp
        if (node) {
          node.instance.removeFromParent()
        }
        break
      }
      default:
        break
    }
  }
  update(entities: EntityManager, events: EventManager, dt: number) {
    // throw new Error('Method not implemented.');
  }
}
