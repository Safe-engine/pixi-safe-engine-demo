import { ButtonComp, ComponentX, LabelComp, loadScene, SceneComponent, SpriteRender } from '@safe-engine/pixi'

import { BoxCollider } from '@safe-engine/pixi/dist/collider'
import { SpineSkeleton } from '@safe-engine/pixi/dist/spine'
import { defaultFont, sf_crash, sp_spineboy_pro } from '../assets'
import { BackButton } from '../components/BackButton'
import { Hero } from '../components/Hero'
import { Monster } from '../components/Monster'
import { Home } from './Home'

export class Game extends ComponentX {
  score = 0
  // uiRef: UIController = null
  hero: Hero

  start() {
    console.log('you win')
  }

  // onUpdate(dt: number) {}
  onPress(event: ButtonComp) {
    console.log('Clicked')
    loadScene(Home)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ xy: [454, 265] }} string="Game" font={defaultFont} />
        <BackButton />
        <SpriteRender node={{ xy: [260, 668], anchorY: 1 }} spriteFrame={sf_crash}>
          <ButtonComp onPress={this.onPress} />
        </SpriteRender>
        <Monster node={{ xy: [10, 240] }} />
        <Hero $ref={this.hero} node={{ xy: [595, 895] }} gameNode={this.node}>
          <BoxCollider width={100} height={100} offset={[10, 10]} />
        </Hero>
        <Hero $ref={this.hero} node={{ xy: [245, 973], rotation: 180 }}>
          <BoxCollider width={100} height={100} offset={[10, 10]} />
        </Hero>
        <SpineSkeleton node={{ xy: [306, 940] }} data={sp_spineboy_pro} animation="idle" loop={true} />
      </SceneComponent>
    )
  }
}
