import { BoxCollider, ButtonComp, ComponentX, instantiate, LabelComp, SceneComponent, SpineSkeleton, SpriteRender, v2 } from 'safex'
import { defaultFont, sf_crash, sp_spineboy_pro } from '../assets'
import { BackButton } from '../components/BackButton'
import { Hero } from '../components/Hero'
import { Monster } from '../components/Monster'
import { Home } from './Home'

export class Game extends ComponentX {
  score = 0
  // uiRef: UIController = null
  hero: Hero

  onStart() {
    console.log('you win')
  }

  // onUpdate(dt: number) {}
  onPress(event: ButtonComp) {
    console.log('Clicked')
    instantiate(Home)
  }

  render() {
    return (
      <SceneComponent>
        <LabelComp node={{ x: 106, y: 240 }} string="Game" font={defaultFont} />
        <BackButton />
        <SpriteRender node={{ x: 200, y: 420, anchorY: 1 }} spriteFrame={sf_crash} >
          <ButtonComp onPress={this.onPress} />
        </SpriteRender>
        <Monster node={{ x: 10, y: 240 }}></Monster>
        <Hero $ref={this.hero} node={{ x: 550, y: 430 }} gameNode={this.node} >
          <BoxCollider width={100} height={100} offset={v2(10, 10)} />
        </Hero>
        <Hero $ref={this.hero} node={{ x: 550, y: 130, rotation: 180 }}>
          <BoxCollider width={100} height={100} offset={v2(10, 10)} />
        </Hero>
        <SpineSkeleton node={{ x: 306, y: 940 }} data={sp_spineboy_pro} animation="idle" loop={true} />
      </SceneComponent>
    )
  }
}
