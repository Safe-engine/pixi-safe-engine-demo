import { ComponentX, LabelComp, SceneComponent, SpriteRender } from '@safe-engine/pixi'

import { BoxCollider, Collider } from '@safe-engine/pixi/dist/collider'
import { DragonBonesComp } from '@safe-engine/pixi/dist/dragonbones'
import { db_mecha_1004d_show, defaultFont, sf_crash } from '../assets'
import { BackButton } from '../components/BackButton'

export class CollidersScene extends ComponentX {
  dragon: DragonBonesComp

  onCollisionEnter(other: Collider) {
    console.log(other.props.tag)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex Collide" font={defaultFont} />
        <BackButton />
        <DragonBonesComp $ref={this.dragon} node={{ xy: [640, 1140] }} data={db_mecha_1004d_show} animation="idle" playTimes={3}>
          <Collider onCollisionEnter={this.onCollisionEnter} />
          <BoxCollider height={200} width={200} offset={[-100, -200]}></BoxCollider>
        </DragonBonesComp>
        <SpriteRender node={{ xy: [640, 360] }} spriteFrame={sf_crash}>
          <BoxCollider height={100} width={100}></BoxCollider>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
