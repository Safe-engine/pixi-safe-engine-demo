import { ComponentX, NodeComp, SpriteRender, Vec2 } from '@safe-engine/cocos'
import { BaseComponentProps } from '@safe-engine/cocos/@types/safex'

import { sf_progress_bg } from '../assets/TextureAssets'

interface HeroProps extends BaseComponentProps<Hero> {
  gameNode?: NodeComp
}
export class Hero extends ComponentX<HeroProps> {
  hp = 100
  sprite: SpriteRender
  gameNode?: NodeComp

  start() {
    console.log('hero', this.gameNode)
  }
  render() {
    return <SpriteRender node={{ position: Vec2(500, 240) }} $ref={this.sprite} spriteFrame={sf_progress_bg}></SpriteRender>
  }
}
