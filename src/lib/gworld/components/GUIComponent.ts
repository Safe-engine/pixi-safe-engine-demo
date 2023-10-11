import { Text } from 'pixi.js'
import { EnhancedComponent, NodeComp } from './EnhancedComponent'
import { GameWorld } from '../../../gworld'

export class ButtonComp extends EnhancedComponent {
  normalImage: string
  selectedImage: string
  disableImage: string
  zoomScale: number
  onPress
  // texType: ccui.Widget.TextureType
  // clickEvents = []

  // constructor(
  //   normalImage: string,
  //   customData = [],
  //   zoomScale = 1.2,
  //   texType?: ccui.Widget.TextureType,
  //   selectedImage?: string,
  //   disableImage?: string,
  // ) {
  //   super()
  //   this.normalImage = normalImage
  //   this.selectedImage = selectedImage
  //   this.disableImage = disableImage
  //   this.texType = texType
  //   this.zoomScale = zoomScale
  //   this.clickEvents = customData.map((customEventData) => ({ customEventData }))
  // }

  // addClickEventListener(callback: (event: any) => void) {
  //   if (this.node.instance instanceof ccui.Widget) {
  //     this.node.instance.addClickEventListener((sender: ccui.Widget) => {
  //       callback({ target: this.node })
  //     })
  //   }
  // }

  // set enabled(val) {
  //   this.node.setTouchEnabled(val)
  // }
}

// export class LoadingBarComp extends EnhancedComponent {
//   texture: string
//   texType: ccui.Widget.TextureType
//   constructor(texture: string, texType?: ccui.Widget.TextureType) {
//     super()
//     this.texture = texture
//     this.texType = texType
//   }

//   get progress() {
//     return this.node.getPercent()
//   }

//   set progress(val: number) {
//     this.node.setPercent(val)
//   }
// }

// export class ProgressBarComp extends EnhancedComponent {
//   mode: number
//   totalLength: number
//   isReverse: boolean
//   barSprite: LoadingBarComp
//   constructor(barSprite: LoadingBarComp, mode: number, len: number, progress: number, isReverse: boolean) {
//     super()
//     this.mode = mode
//     this.barSprite = barSprite
//     this.totalLength = len
//     this.isReverse = isReverse
//     this.progress = progress
//   }

//   get progress() {
//     return this.barSprite.node.getPercent() * 0.01
//   }

//   set progress(val: number) {
//     this.barSprite.node.setPercent(val * 100)
//   }
// }

interface FontResource {
  type: string
  name: string
  srcs: Array<string>
}
export class LabelComp extends EnhancedComponent {
  // font: FontResource
  text: string
  // size: number

  get string() {
    return (this.node.instance as Text).text
  }

  set string(val: string) {
    this.text = val
    if (this.node.instance instanceof Text) {
      this.node.instance.text = val
    }
  }

  get size() {
    return (this.node.instance as Text).style.fontSize
  }
  set size(val) {
    ;(this.node.instance as Text).style.fontSize = val
  }

  get font() {
    return (this.node.instance as Text).style.fontFamily
  }
  set font(val) {
    ;(this.node.instance as Text).style.fontFamily = val
  }
  static create() {
    const root = GameWorld.Instance.entities.create()
    const label = root.assign(new LabelComp())
    return label
  }
}
export class BlockInputEventsComp extends EnhancedComponent {}
