import { BoxCollider, Collider, ComponentX, DragonBones, LabelComp, SceneComponent, SpriteRender, v2 } from '@safe-engine/pixi'

import { db_mecha_1004d_show, defaultFont, sf_crash } from '../assets'
import { BackButton } from '../components/BackButton'

export class CollidersScene extends ComponentX {
  dragon: DragonBones

  onCollisionEnter(other: Collider) {
    console.log(other.props.tag)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [106, 240] }} string="Hello safex Collide" font={defaultFont} />
        <BackButton />
        <DragonBones $ref={this.dragon} node={{ xy: [640, 1140] }} data={db_mecha_1004d_show} animation="idle" playTimes={3}>
          <BoxCollider height={200} width={200} offset={v2(-100, -200)}></BoxCollider>
        </DragonBones>
        <SpriteRender node={{ xy: [640, 360] }} spriteFrame={sf_crash}>
          <BoxCollider height={100} width={100}></BoxCollider>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
