import remove from 'lodash/remove'
import { ColorSource, Container, Point, Sprite } from 'pixi.js'
import { Entity } from '../../exts/entity'
import { Constructor } from '../../exts/global'
import { Action, actionManager, callFuncAction, delayTimeAction, repeatAction, sequenceAction } from '../../../lib/action'

export class EnhancedComponent {
  node: NodeComp
  actionsMap: { [key: string]: Action } = {}
  addComponent<T extends ComponentType>(instance): T {
    return this.node.addComponent(instance)
  }
  getComponent<T extends ComponentType>(component: Constructor<T>): T {
    return this.node.getComponent(component)
  }
  schedule(callback: (dt?: number) => void, interval: number, repeat: number = -1, delay: number = 0, key?: string) {
    const action = sequenceAction(delayTimeAction(interval), callFuncAction(callback))
    const repeatAct = repeatAction(action, repeat)
    const seq = sequenceAction(delayTimeAction(delay), repeatAct)
    const animation = actionManager.runAction(this.node.instance, seq)
    this.actionsMap[key] = animation
  }
  unschedule(callback: (arg?: unknown) => void, key?: string) {
    // this.node.instance.unschedule(callback.bind(this))
    this.actionsMap[key].stop()
  }
  unscheduleAllCallbacks() {
    Object.values(this.actionsMap).forEach((action: Action) => {
      action.stop()
    })
  }
  scheduleOnce(callback: (arg?: unknown) => void, delay: number, key?: string) {
    const action = sequenceAction(delayTimeAction(delay), callFuncAction(callback))
    this.actionsMap[key] = action
    actionManager.runAction(this.node.instance, action)
  }
  getComponentsInChildren<T extends ComponentType>(component: Constructor<T>): T[] {
    return this.node.getComponentsInChildren(component)
  }
  getComponentInChildren<T extends ComponentType>(component: Constructor<T>): T {
    return this.node.getComponentInChildren(component)
  }
  isEqual(other: EnhancedComponent) {
    return this.node.entity.id === other.node.entity.id
  }
}

export type EventCallbackType = (...args) => void
export interface EventMap {
  [key: string]: [EventCallbackType]
}

export class NodeComp {
  entity: Entity
  instance: Container
  events: EventMap = {}
  parent: NodeComp
  children: NodeComp[] = []
  // offset: cc.Point = cc.v2(0, 0);
  name: string
  private lastMove: { x: number; y: number }
  private _group

  static EventType = {
    TOUCH_START: 'NODE_TOUCH_START',
    TOUCH_MOVE: 'NODE_TOUCH_MOVE',
    TOUCH_END: 'NODE_TOUCH_END',
    TOUCH_CANCEL: 'NODE_TOUCH_CANCEL',
  }

  constructor(instance: Container, entity: Entity) {
    this.entity = entity
    this.instance = instance
  }

  get uuid() {
    return this.entity.id
  }

  get position(): Point {
    return this.getPosition()
  }

  set position(val: Point) {
    this.setPosition(val.x, val.y)
  }

  get x() {
    return this.instance.x
  }

  set x(val: number) {
    this.instance.x = val
  }

  get y() {
    return this.instance.y
  }

  set y(val: number) {
    this.instance.y = val
  }

  // get scale() {
  //   return this.instance.scale
  // }

  set scale(val: number) {
    this.instance.scale = new Point(val, val)
  }

  get scaleX() {
    return this.instance.scale.x
  }

  set scaleX(val: number) {
    this.instance.scale.x = val
  }

  get scaleY() {
    return this.instance.y
  }

  set scaleY(val: number) {
    this.instance.y = val
  }

  get anchorX() {
    return (this.instance as Sprite).anchor.x
  }

  set anchorX(val: number) {
    ;(this.instance as Sprite).anchor.x = val
  }

  get anchorY() {
    return (this.instance as Sprite).anchor.y
  }

  set anchorY(val: number) {
    ;(this.instance as Sprite).anchor.y = val
  }

  get rotation() {
    return this.instance.rotation
  }

  set rotation(val: number) {
    this.instance.rotation = val
  }

  get angle() {
    return this.instance.angle
  }

  set angle(val: number) {
    this.instance.angle = val
  }

  get color() {
    return (this.instance as Sprite).tint
  }

  set color(val: ColorSource) {
    ;(this.instance as Sprite).tint = val
  }

  get opacity() {
    return this.instance.alpha
  }

  set opacity(val: number) {
    this.instance.alpha = val
  }

  get active() {
    return this.instance.visible
  }

  set active(val: boolean) {
    this.instance.visible = val
  }

  get group() {
    return this._group
  }

  set group(val: number) {
    this._group = val
  }

  get width() {
    return this.instance.width
  }

  set width(val) {
    this.instance.width = val
  }

  get height() {
    return this.instance.height
  }

  set height(val) {
    this.instance.height = val
  }

  get zIndex() {
    return this.instance.zIndex
  }

  set zIndex(val) {
    this.instance.zIndex = val
  }

  get childrenCount() {
    return this.children.length
  }

  destroy() {
    this.removeFromParent(true)
  }

  addComponent<T extends ComponentType>(instance): T {
    return this.entity.assign(instance)
  }

  getComponent<T extends ComponentType>(component: Constructor<T> | string): T {
    return this.entity.getComponent(component)
  }

  getComponentsInChildren<T extends ComponentType>(component: Constructor<T>): T[] {
    if (!this.children.length) {
      return []
    }
    const listHave = this.children.filter((child) => {
      return child.getComponent(component)
    })
    return listHave.map((node) => node.getComponent(component))
  }

  getComponentInChildren<T extends ComponentType>(component: Constructor<T>): T {
    return this.getComponentsInChildren(component)[0]
  }

  // getPercent() {
  //   if (this.instance instanceof ccui.LoadingBar) {
  //     return this.instance.getPercent()
  //   }
  //   return 0
  // }

  // setPercent(val: number) {
  //   if (this.instance instanceof ccui.LoadingBar) {
  //     return this.instance.setPercent(val)
  //   }
  // }

  // setTouchEnabled(enabled: boolean) {
  //   if (!cc.sys.isObjectValid(this.instance)) {
  //     return
  //   }
  //   if (this.instance instanceof ccui.Widget) {
  //     this.instance.setTouchEnabled(enabled)
  //   }
  // }

  // addTouchEventListener(cb) {
  //   if (!cc.sys.isObjectValid(this.instance)) {
  //     return
  //   }
  //   if (this.instance instanceof ccui.Widget) {
  //     this.instance.addTouchEventListener(cb)
  //   }
  // }

  convertToNodeSpace(point: Point) {
    return this.instance.toLocal(point)
  }

  convertToNodeSpaceAR(point: Point) {
    return this.instance.toLocal(point)
  }

  convertToWorldSpaceAR(point: Point) {
    return this.instance.toGlobal(point)
  }

  getPosition() {
    return this.instance.position
  }

  setPosition(x: number | Point, y?: number) {
    if (typeof x !== 'number') {
      this.x = x.x
      this.y = x.y
    } else {
      this.x = x
      this.y = y
    }
  }

  setRotation(deg: number) {
    this.instance.rotation = deg
  }

  getRotation() {
    return this.instance.rotation
  }

  // setAnchorPoint(point: number | cc.Point, y?: number) {
  //   this.instance.setAnchorPoint(point, y)
  // }

  // getAnchorPoint() {
  //   return this.instance.getAnchorPoint()
  // }

  // getBoundingBox() {
  //   const box = this.instance.getBoundingBox()
  //   box.contains = function (point) {
  //     return this.x <= point.x && this.x + this.width >= point.x && this.y <= point.y && this.y + this.height >= point.y
  //   }
  //   return box
  // }

  // getContentSize() {
  //   return this.instance.getContentSize()
  // }

  // setContentSize(size: cc.Size | number, height?: number) {
  //   this.instance.setContentSize(size, height)
  //   if (this.instance instanceof cc.ClippingNode) {
  //     const hw = ((size as any).width || size) * 0.5
  //     const hh = ((size as any).height || height) * 0.5
  //     const stencil = new cc.DrawNode()
  //     const rectangle = [cc.p(-hw, -hh), cc.p(hw, -hh), cc.p(hw, hh), cc.p(-hw, hh)]
  //     stencil.drawPoly(rectangle, cc.Color.WHITE, 0, cc.Color.WHITE)
  //     // stencil.drawDot(cc.p(-height * 0.5, -height * 0.5), height, cc.Color.WHITE);
  //     this.instance.stencil = stencil
  //   }
  // }

  // setColor(color: cc.Color) {
  //   this.instance.setColor(color)
  // }

  // setScale(scaleX: number, scaleY?: number) {
  //   this.instance.setScale(scaleX, scaleY || scaleX)
  // }

  runAction(atc: Action) {
    actionManager.runAction(this.instance, atc)
  }

  stopAllActions() {
    // this.instance.stopAllActions()
    // actionManager.cancelAction
  }

  // pauseAllActions() {
  //   this.instance.pause()
  // }

  // resumeAllActions() {
  //   this.instance.resume()
  // }

  removeFromParent(cleanup?: boolean) {
    this.children.forEach((child) => {
      child.entity.destroy()
    })
    if (this.parent) {
      remove(this.parent.children, ({ entity }) => entity.id === this.entity.id)
    }
    this.parent = null
    this.entity.destroy()
    this.instance.removeFromParent()
  }

  addChild(child: NodeComp, zOrder?: number, tag?: number) {
    child.parent = this
    this.children.push(child)
    this.instance.addChild(child.instance)
    // child.instance.tag = tag;
  }

  removeAllChildren(cleanup?) {
    this.instance.removeChildren(cleanup)
  }

  // addTouchEvent() {
  //   this.setTouchEnabled(true)
  //   this.addTouchEventListener((sender: ccui.Widget, type: ccui.Widget.TouchEventType) => {
  //     switch (type) {
  //       case ccui.Widget.TOUCH_BEGAN: {
  //         // cc.log('TOUCH_BEGAN', sender._touchBeganPosition.x);
  //         const { x, y } = sender.getTouchBeganPosition()
  //         this.emit(cc.Node.EventType.TOUCH_START, {
  //           getLocationX: () => x,
  //           getLocationY: () => y,
  //           getLocation: () => cc.v2(x, y),
  //         })
  //         break
  //       }
  //       case ccui.Widget.TOUCH_MOVED: {
  //         // cc.log('TOUCH_MOVED', sender._touchMovePosition);
  //         const touchMove = sender.getTouchMovePosition()
  //         const { x, y } = touchMove
  //         const { x: sx, y: sy } = this.lastMove || sender.getTouchBeganPosition()
  //         this.emit(cc.Node.EventType.TOUCH_MOVE, {
  //           getDelta: () => cc.v2(x - sx, y - sy),
  //           getDeltaX: () => x - sx,
  //           getDeltaY: () => y - sy,
  //           getLocation: () => cc.v2(x, y),
  //         })
  //         this.lastMove = touchMove
  //         break
  //       }
  //       case ccui.Widget.TOUCH_ENDED:
  //         // cc.log('TOUCH_ENDED', sender._touchEndPosition);
  //         const { x, y } = sender.getTouchEndPosition()
  //         this.emit(cc.Node.EventType.TOUCH_END, { getLocation: () => cc.v2(x, y) })
  //         // ccui.helper.doLayout(this._baseLayer);
  //         break
  //       case ccui.Widget.TOUCH_CANCELED:
  //         this.emit(cc.Node.EventType.TOUCH_CANCEL, sender.getTouchEndPosition())
  //         // cc.log('TOUCH_CANCELED', sender);
  //         break
  //       default:
  //         break
  //     }
  //   })
  // }

  on(name: string, callback: EventCallbackType, target?: any) {
    // if (
    //   [cc.Node.EventType.TOUCH_START, cc.Node.EventType.TOUCH_MOVE, cc.Node.EventType.TOUCH_END, cc.Node.EventType.TOUCH_CANCEL].includes(
    //     name,
    //   )
    // ) {
    //   this.addTouchEvent()
    // }
    const bound = target ? callback.bind(target) : callback
    if (this.events[name]) {
      this.events[name].push(bound)
    } else {
      this.events[name] = [bound]
    }
  }

  off(name: string, callback?: EventCallbackType, target?: any) {
    this.events[name] = undefined
  }

  emit(name: string, ...params: any) {
    if (this.events[name]) {
      this.events[name].forEach((fc) => fc(...params))
    }
  }
}

export type ComponentType = EnhancedComponent | NodeComp
