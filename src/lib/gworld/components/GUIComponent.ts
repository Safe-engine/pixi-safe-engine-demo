import { Text } from 'pixi.js'
import { EnhancedComponent, NodeComp } from './EnhancedComponent'

export class ButtonComp extends EnhancedComponent {
  normalImage: string
  selectedImage: string
  disableImage: string
  zoomScale: number
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
  font: FontResource
  text: string
  size: number
  constructor(font: FontResource, size: number, string?: string) {
    super()
    this.font = font
    this.size = size
    this.text = string
  }

  get string() {
    return this.text
  }

  set string(val: string) {
    this.text = val
    if (this.node.instance instanceof Text) {
      this.node.instance.setString(val)
    }
  }
}
export class BlockInputEventsComp extends EnhancedComponent {}
