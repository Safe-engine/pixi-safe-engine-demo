import { Vec2 } from 'planck'
import { SpineAssets, SpriteSourceAssets } from '../assets'
import { Hero } from '../components/Hero'
import { Monster } from '../components/Monster'
import { BoxCollider, ButtonComp, LabelComp, RigidBody, SceneComponent, SpineSkeleton, SpriteRender } from '../lib/safex'
import { Home } from './Home'

export class Game extends SceneComponent {
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
  onPress(event: ButtonComp) {
    console.log('Clicked')
    // this.uiRef.showDialog(true)
    Home.boot()
  }

  static boot() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="Game" font="LilitaOne" />
        <SpriteRender node={{ x: 200, y: 420, anchorY: 1 }} spriteFrame={SpriteSourceAssets.crash}>
          <ButtonComp $onPress="onPress" />
        </SpriteRender>
        <Monster node={{ x: 10, y: 240 }}></Monster>
        <Hero $ref="hero" node={{ x: 550, y: 430 }}>
          <RigidBody type="dynamic" />
          <BoxCollider width={100} height={100} offset={Vec2(10, 10)} />
        </Hero>
        <Hero $ref="hero" node={{ x: 550, y: 130, rotation: 180 }}>
          <RigidBody type="static" />
          <BoxCollider width={100} height={100} offset={Vec2(10, 10)} />
        </Hero>
        <SpineSkeleton node={{ x: 306, y: 940 }} data={SpineAssets.boss01} animation="Walk" loop={true} />
      </SceneComponent>
    )
  }
}
