import { ButtonComp, LabelComp, SceneComponent, SpriteRender, v2 } from '@safe-engine/pixi'
import { BoxCollider, Collider } from '@safe-engine/pixi-collider'
import { SpineSkeleton } from '@safe-engine/pixi-spine'
import { defaultFont } from '../assets/FontAssets'
import { sp_spineboy_pro } from '../assets/SpineAssets'
import { sf_crash } from '../assets/TextureAssets'
import { Hero } from '../components/Hero'
import { Monster } from '../components/Monster'
import { Game } from './Game'

export class Home extends SceneComponent {
  score = 0
  hero: Hero

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
    Game.create()
  }

  onCollisionEnter(other: Collider) {
    console.log(other.tag)
  }

  static create(): Home {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="hello" font={defaultFont} />
        <SpriteRender node={{ x: 200, y: 1200, anchorY: 1 }} spriteFrame={sf_crash}>
          <ButtonComp $onPress="onPress" />
        </SpriteRender>
        <Monster node={{ x: 10, y: 240 }}></Monster>
        <Hero $ref="hero" node={{ x: 550, y: 1130 }}>
          <BoxCollider $onCollisionEnter="onCollisionEnter" width={100} height={100} offset={v2(10, 10)} />
        </Hero>
        <Hero $ref="hero" node={{ x: 550, y: 930, rotation: 180 }}>
          <BoxCollider width={100} height={100} offset={v2(10, 10)} />
        </Hero>
        <SpineSkeleton node={{ x: 306, y: 140 }} data={sp_spineboy_pro} animation="Walk" loop={true} />
      </SceneComponent>
    )
  }
}
