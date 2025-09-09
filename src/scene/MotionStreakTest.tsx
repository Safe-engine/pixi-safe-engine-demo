import { ComponentX, MotionStreak, SceneComponent } from '@safe-engine/cocos'
import { sf_streak } from '../assets'
import { BackButton } from '../components/BackButton'

export default class MotionStreakTest extends ComponentX {
  streak: MotionStreak
  streak2: MotionStreak

  update() {
    this.streak.node.posY += 10
    if (this.streak.node.posY > 1800) {
      this.streak.node.posY = 0
      this.streak.reset()
    }
    this.streak2.node.posY += 4
    if (this.streak2.node.posY > 1800) {
      this.streak2.node.posY = 0
    }
  }

  render() {
    return (
      <SceneComponent>
        <MotionStreak $ref={this.streak} spriteFrame={sf_streak} node={{ posX: 540 }} />
        <MotionStreak $ref={this.streak2} spriteFrame={sf_streak} node={{ posX: 340 }} />
        <BackButton />
      </SceneComponent>
    )
  }
}
