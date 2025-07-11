import { ButtonComp, ComponentX, LabelComp, loadScene, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/cocos'
import { SpineSkeleton } from '@safe-engine/cocos/dist/spine'
import { BoxCollider } from '@safe-engine/cocos/src/collider/CollideComponent'

import { defaultFont, sf_crash, sp_spineboy_pro } from '../assets'
import { Hero } from '../components/Hero'
import { Home } from './Home'

export class Game extends ComponentX {
  score = 0
  // uiRef: UIController = null
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
  onPress() {
    console.log('Clicked')
    // this.uiRef.showDialog(true)
    loadScene(Home)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ position: Vec2(106, 240) }} string="Game" font={defaultFont} />
        <SpriteRender node={{ position: Vec2(200, 420), anchorY: 1 }} spriteFrame={sf_crash}>
          <ButtonComp onPress={this.onPress} />
        </SpriteRender>
        <Hero $ref={this.hero} node={{ position: Vec2(550, 430) }} gameNode={this.node}>
          <BoxCollider width={100} height={100} offset={Vec2(10, 10)} />
        </Hero>
        <Hero $ref={this.hero} node={{ position: Vec2(550, 130), rotation: 180 }} gameNode={this.node}>
          <BoxCollider width={100} height={100} offset={Vec2(10, 10)} />
        </Hero>
        <SpineSkeleton node={{ position: Vec2(306, 940) }} data={sp_spineboy_pro} animation="idle" loop={true} />
      </SceneComponent>
    )
  }
}
