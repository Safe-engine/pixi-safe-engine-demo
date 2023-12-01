import { FontAssets, SpriteSourceAssets } from '../assets'
import { Bullet } from '../components/Bullet'
import { BulletTypeEnum } from '../helper/constant'
import { instantiate, LabelComp, NodeComp } from '../lib/safex'
import { NodePool } from './NodePool'

export default class BulletManager {
  private static _instance: BulletManager
  private constructor() {}
  public static get Instance() {
    if (!BulletManager._instance) {
      BulletManager._instance = new BulletManager()
      BulletManager._instance.bulletPoolMap.set(BulletTypeEnum.BulletSprite, new NodePool())
      BulletManager._instance.bulletPoolMap.set(BulletTypeEnum.BulletParticle, new NodePool())
      BulletManager._instance.bulletPoolMap.set(BulletTypeEnum.EnemyBullet, new NodePool())
    }
    return BulletManager._instance
  }

  bulletsPrefabs = [SpriteSourceAssets.grass, SpriteSourceAssets.fire, SpriteSourceAssets.water]
  bulletPoolMap = new Map<BulletTypeEnum, NodePool>()
  damageLabelPool = new NodePool()
  getBullet(type: BulletTypeEnum, id: number): NodeComp {
    const pool = this.bulletPoolMap.get(type)
    if (pool!.size() > 0) {
      // console.log('getBullet', pool.size())
      const node = pool!.get()
      return node
    }
    const bullet = instantiate(Bullet, { bulletFrame: this.bulletsPrefabs[id] })
    return bullet.node
  }

  putBullet(type: BulletTypeEnum, value: NodeComp) {
    const pool = this.bulletPoolMap.get(type)
    value.getComponent(Bullet).elapsed = 0
    pool!.put(value)
  }

  getLabelDamage(): NodeComp {
    // console.log('getLabelDamage', this.damageLabelPool.size())
    if (this.damageLabelPool.size() > 0) {
      const node = this.damageLabelPool.get()
      return node
    }
    const labelDamage = instantiate(LabelComp, { font: FontAssets.defaultFont })
    return labelDamage.node
  }

  putLabelDamage(value: NodeComp) {
    this.damageLabelPool.put(value)
  }

  resetAllPool() {
    this.bulletPoolMap.get(BulletTypeEnum.BulletSprite)!.clear()
    this.bulletPoolMap.get(BulletTypeEnum.BulletParticle)!.clear()
    this.bulletPoolMap.get(BulletTypeEnum.EnemyBullet)!.clear()
  }
}
