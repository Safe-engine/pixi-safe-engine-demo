import { NodeComp } from '../components/EnhancedComponent'
import { ButtonComp, ProgressBarComp, LoadingBarComp, LabelComp, BlockInputEventsComp } from '../components/GUIComponent'
import { SpriteRender } from '../components/RenderComponent'
import { EntityManager } from '../../exts/entity'
import { ComponentAddedEvent, ComponentRemovedEvent, EventManager, EventReceive } from '../../exts/event'
import { System } from '../../exts/system'
import { Button } from '@pixi/ui'

export class GUISystem implements System {
  configure(event_manager: EventManager) {
    event_manager.subscribe(ComponentAddedEvent(ButtonComp), this)
    // event_manager.subscribe(ComponentAddedEvent(ProgressBarComp), this);
    // event_manager.subscribe(ComponentAddedEvent(LoadingBarComp), this);
    // event_manager.subscribe(ComponentAddedEvent(LabelComp), this);
    // event_manager.subscribe(ComponentAddedEvent(BlockInputEventsComp), this);
  }
  receive(type: string, event: EventReceive) {
    switch (type) {
      case ComponentAddedEvent(ButtonComp): {
        console.log('ComponentAddedEvent', event)
        const ett = event.entity
        const button = ett.getComponent(ButtonComp)
        const nodeComp = ett.getComponent(NodeComp)
        // const { normalImage, selectedImage, disableImage, texType, zoomScale } = button
        const node = new Button(nodeComp.instance)
        // node.setZoomScale(zoomScale - 1)
        button.node = nodeComp
        // button.node = ett.assign(new NodeComp(node, ett))
        node.onPress.connect(() => {
          console.log('onPress.connect')
          button.onPress()
        })
        break
      }
      // case ComponentAddedEvent(LoadingBarComp): {
      //   // cc.log(event);
      //   const ett = event.entity
      //   const bar = ett.getComponent(LoadingBarComp)
      //   const { texture, texType } = bar
      //   const node = new ccui.LoadingBar()
      //   node.loadTexture(texture, texType || ccui.Widget.LOCAL_TEXTURE)
      //   bar.node = ett.assign(new NodeComp(node, ett))
      //   break
      // }
      // case ComponentAddedEvent(ProgressBarComp): {
      //   const bar = event.entity.getComponent(ProgressBarComp)
      //   // bar.progress = 50;
      //   break
      // }
      // case ComponentAddedEvent(BlockInputEventsComp): {
      //   // cc.log('BlockInputEventsComp', event);
      //   const node = event.entity.getComponent(NodeComp)
      //   if (node.instance instanceof ccui.ImageView) {
      //     node.instance.setTouchEnabled(true)
      //     node.instance.setScale9Enabled(true)
      //   }
      //   break
      // }
      // case ComponentAddedEvent(LabelComp): {
      //   // cc.log(event);
      //   const ett = event.entity
      //   const label = ett.getComponent(LabelComp)
      //   const { string, font, size } = label
      //   const fontName = cc.sys.isNative ? font.srcs[0] : font.name
      //   const node = new ccui.Text(string, fontName, size)
      //   node.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM)
      //   label.node = ett.assign(new NodeComp(node, ett))
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
