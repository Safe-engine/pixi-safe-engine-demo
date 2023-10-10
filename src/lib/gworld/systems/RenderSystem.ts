import { EntityManager } from '../../exts/entity'
import { ComponentAddedEvent, ComponentRemovedEvent, EventManager, EventReceive } from '../../exts/event'
import { System } from '../../exts/system'
import { NodeComp } from '../components/EnhancedComponent'
import { Graphics, ImageRender, MaskRender, NodeRender, SpineSkeleton, SpriteRender } from '../components/RenderComponent'
import { Container, Sprite, Assets, SpriteSource } from 'pixi.js'
import { SceneComponent } from '../core/Scene'

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
    // event_manager.subscribe(ComponentAddedEvent(SpineSkeleton), this)
    // event_manager.subscribe(ComponentAddedEvent(Graphics), this)
    // event_manager.subscribe(ComponentRemovedEvent(NodeRender), this);
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
        // cc.log('NodeRender', event);
        const ett = event.entity
        const nodeRenderComp = ett.getComponent(NodeRender)
        const node = new Container()
        nodeRenderComp.node = ett.assign(new NodeComp(node, ett))
        break
      }

      case ComponentAddedEvent(SpriteRender): {
        console.log('SpriteRender', event)
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
        console.log('spriteComp', spriteComp)
        spriteComp.node = ett.assign(new NodeComp(node, ett))
        break
      }

      // case ComponentAddedEvent(ImageRender): {
      //   // cc.log('ImageRender', event);
      //   const imageComp = event.entity.getComponent(ImageRender)
      //   const { spriteFrame, texType } = imageComp
      //   const node = new ccui.ImageView(spriteFrame, texType)
      //   const ett = event.entity
      //   node.setScale9Enabled(true)
      //   imageComp.node = ett.assign(NodeComp, new NodeComp(node, ett))
      //   break
      // }

      // case ComponentAddedEvent(MaskRender): {
      //   // cc.log('MaskRender', event.component);
      //   const ett = event.entity
      //   const maskComp = event.entity.getComponent(MaskRender)
      //   const { type, segments, inverted } = maskComp
      //   const node = new cc.ClippingNode()
      //   node.setInverted(inverted)
      //   maskComp.node = ett.assign(NodeComp, new NodeComp(node, ett))
      //   break
      // }

      // case ComponentAddedEvent(SpineSkeleton): {
      //   // cc.log('MaskRender', event.component);
      //   const ett = event.entity
      //   const spine = event.entity.getComponent(SpineSkeleton)
      //   const { data, skin, _animation, loop, timeScale } = spine
      //   const atlas = data.replace('.json', '.atlas')
      //   // cc.log(data, atlas);
      //   const node = sp.SkeletonAnimation.createWithJsonFile(data, atlas, timeScale)
      //   if (skin) {
      //     node.setSkin(skin)
      //   }
      //   if (_animation) {
      //     node.setAnimation(0, _animation, loop)
      //   }
      //   spine.node = ett.assign(NodeComp, new NodeComp(node, ett))
      //   break
      // }

      // case ComponentAddedEvent(Graphics): {
      //   // cc.log('MaskRender', event.component);
      //   const ett = event.entity
      //   const graphics = event.entity.getComponent(Graphics)
      //   const { lineWidth, strokeColor, fillColor } = graphics
      //   const node = new cc.DrawNode()
      //   node.setColor(strokeColor)
      //   node.setDrawColor(fillColor)
      //   node.setLineWidth(lineWidth)
      //   graphics.node = ett.assign(NodeComp, new NodeComp(node, ett))
      //   break
      // }

      default:
        break
    }
  }
  update(entities: EntityManager, events: EventManager, dt: number) {
    // throw new Error('Method not implemented.');
  }
}
