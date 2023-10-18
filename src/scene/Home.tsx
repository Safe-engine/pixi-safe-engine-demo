import { Vec2 } from 'planck'
import { SpineAssets, SpriteSourceAssets } from '../assets'
import { Hero } from '../components/Hero'
import { Monster } from '../components/Monster'
import { ButtonComp, LabelComp } from '../lib/gworld/components/GUIComponent'
import { BoxCollider, Collider, RigidBody } from '../lib/gworld/components/PhysicsComponent'
import { SpineSkeleton, SpriteRender } from '../lib/gworld/components/RenderComponent'
import { SceneComponent } from '../lib/gworld/core/Scene'
import { Game } from './Game'

export class Home extends SceneComponent {
  score = 0
  // uiRef: UIController = null
  hero: Hero = null

  onStart() {
    //   schedule((dt) => {
    //     const monster = instantiate(Monster)
    //     const box = monster.getComponent(BoxCollider)
    //     box.width = 123
    //     monster.on(DEATH, (point) => {
    //       this.score += point
    //       this.uiRef.updateScore(this.score)
    //       if (this.score > 1000) {
    console.log('you win')
    //         loadScene('game')
    //       }
    //     })
    //     this.addChild(monster)
    //   }, 2)
  }

  // onUpdate(dt: number) {}
  onPress(event) {
    console.log('Clicked')
    // this.uiRef.showDialog(true)
    Game.boot()
  }

  onCollisionEnter(other: Collider) {
    console.log(other.tag)
  }

  static boot() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="hello" font="LilitaOne" />
        <SpriteRender node={{ x: 200, y: 1200, anchorY: 1 }} spriteFrame={SpriteSourceAssets.crash}>
          <ButtonComp $onPress="onPress" />
        </SpriteRender>
        <Monster node={{ x: 10, y: 240 }}></Monster>
        <Hero $ref="hero" node={{ x: 550, y: 1130 }}>
          <RigidBody type="dynamic" />
          <BoxCollider $onCollisionEnter="onCollisionEnter" width={100} height={100} offset={Vec2(10, 10)} />
        </Hero>
        <Hero $ref="hero" node={{ x: 550, y: 930, rotation: 180 }}>
          <RigidBody type="static" />
          <BoxCollider width={100} height={100} offset={Vec2(10, 10)} />
        </Hero>
        <SpineSkeleton node={{ x: 306, y: 140 }} data={SpineAssets.boss01} animation="Walk" loop={true} />
      </SceneComponent>
    )
  }
}
