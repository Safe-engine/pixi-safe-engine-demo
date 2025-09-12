import {
  ButtonComp,
  ComponentX,
  GraphicsRender,
  LabelComp,
  MaskRender,
  NodeComp,
  NodeRender,
  RED,
  SceneComponent,
  Size,
  SpriteRender,
  Vec2,
} from '@safe-engine/cocos'

import { sf_crash, sf_dialog_name, sf_progress_bar } from '../assets'
import { BackButton } from '../components/BackButton'
import { WHITE } from '../helper/constant'

export default class SpriteTest extends ComponentX {
  $cases: NodeComp[] = []
  stencil: GraphicsRender
  mask: MaskRender
  indexCase = 0

  start() {
    this.nextCase()
    this.nextCase()
    this.stencil.drawDot(Vec2(50, 50), 1450)
  }

  onPressNext() {
    this.nextCase()
  }

  nextCase() {
    this.indexCase = (this.indexCase + 1) % this.$cases.length
    this.$cases.forEach((node, i) => {
      node.active = i === this.indexCase
    })
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp string="Next Test" node={{ xy: [540, 200] }}>
          <ButtonComp onPress={this.onPressNext} />
        </LabelComp>
        <NodeRender $pushNode={this.$cases}>
          <LabelComp string="Sprite Test loop" node={{ xy: [540, 2000] }} />
          {Array(4).map((i = 1) => (
            <SpriteRender spriteFrame={sf_crash} node={{ xy: [115, 350 + i * 275] }} />
          ))}
        </NodeRender>
        <NodeRender $pushNode={this.$cases}>
          <LabelComp string="9-slice Sprite" node={{ xy: [540, 2000] }} />
          <SpriteRender
            spriteFrame={sf_dialog_name}
            node={{ xy: [500, 800], contentSize: Size(200, 600) }}
            capInsets={[10, 10, 20, 10]}
          ></SpriteRender>
        </NodeRender>
        <NodeRender $pushNode={this.$cases}>
          <LabelComp string="Sprite Mask" node={{ xy: [540, 2000] }} />
          <SpriteRender spriteFrame={sf_crash} node={{ xy: [330, 500] }}>
            <MaskRender $ref={this.mask} spriteFrame={sf_dialog_name} node={{ xy: [330, 800], scale: 2 }}>
              <SpriteRender spriteFrame={sf_crash} node={{ xy: [0, 10] }}></SpriteRender>
            </MaskRender>
          </SpriteRender>
          <MaskRender cropSize={Size(200, 50)} node={{ xy: [330, 1500], scale: 2 }}>
            <GraphicsRender $ref={this.stencil} lineWidth={5} strokeColor={RED} fillColor={WHITE} node={{ xy: [100, 100] }} />
            <SpriteRender spriteFrame={sf_progress_bar} node={{ xy: [1, 10] }}></SpriteRender>
          </MaskRender>
        </NodeRender>
        <NodeRender $pushNode={this.$cases}>
          <LabelComp string="Tiled Sprite" node={{ xy: [540, 2000] }} />
          <SpriteRender spriteFrame={sf_crash} tiledSize={Size(400, 800)} node={{ xy: [330, 1200] }}></SpriteRender>
        </NodeRender>
        <BackButton />
      </SceneComponent>
    )
  }
}
