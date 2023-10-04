export class ChangeSpriteFrame extends NodeComponent {
  hp = 100
  spine: Spine = null

  attack() {
    this.spine.play('attack')
    const bullet = instantiate(Bullet)
    bullet.speed = 100
    bullet.move()
    bullet.active(true)
  }

  render() {}
}
