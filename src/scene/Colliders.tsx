import { BoxCollider, Collider, ComponentX, DragonBones, LabelComp, SceneComponent, SpriteRender, v2 } from "safex";
import { db_mecha_1004_d, defaultFont, sf_crash } from "../assets";
import { BackButton } from "../components/BackButton";

export class CollidersScene extends ComponentX {

  dragon: DragonBones

  onCollisionEnter(other: Collider) {
    console.log(other.tag)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="Hello safex Collide" font={defaultFont} />
        <BackButton />
        <DragonBones $ref={this.dragon} node={{ x: 640, y: 1140 }} data={db_mecha_1004_d} animation="idle" playTimes={3} >
          <BoxCollider height={200} width={200} offset={v2(-100, -200)}></BoxCollider>
        </DragonBones>
        <SpriteRender node={{ x: 640, y: 360 }} spriteFrame={sf_crash} >
          <BoxCollider height={100} width={100}></BoxCollider>
        </SpriteRender>
      </SceneComponent>
    )
  }
}
