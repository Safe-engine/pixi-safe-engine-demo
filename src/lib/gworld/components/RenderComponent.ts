import { EnhancedComponent, NodeComp } from './EnhancedComponent';
export class NodeRender extends EnhancedComponent {
  nodeName: string;
  constructor(name?: string) {
    super();
    this.nodeName = name;
  }
}

export class SpriteRender extends EnhancedComponent {
  private frameName: string;
  texType: number;
  type: number;
  fillType: number;
  _fillRange: number;
  fillCenter: cc.Vec2;
  static FillType = {
    HORIZONTAL: 0,
    VERTICAL: 1,
    RADIAL: 2,
  };

  constructor(frameName: string, texType?: number, type?: number,
    fillType?: number, fillRange?: number, fillCenter?: cc.Vec2) {
    super();
    this.frameName = frameName;
    this.texType = texType;
    this.type = type;
    this.fillType = fillType;
    this._fillRange = fillRange;
    this.fillCenter = fillCenter;
  }

  set fillStart(val: number) {
    if (this.node.instance instanceof cc.ProgressTimer) {
      this.node.instance.setMidpoint(cc.v2(val, val));
    }
  }

  set fillRange(val: number) {
    if (this.node.instance instanceof cc.ProgressTimer) {
      this.node.instance.setPercentage(val * 100);
    }
  }

  get spriteFrame() {
    return this.frameName;
  }

  set spriteFrame(frame) {
    this.frameName = frame;
    if (this.node.instance instanceof cc.Sprite) {
      this.node.instance.setTexture(frame);
    } else if (this.node.instance instanceof ccui.ImageView) {
      if (this.texType) {
        this.node.instance.loadTexture(frame, this.texType);
      } else {
        this.node.instance.loadTexture(frame);
      }
      const sprite = new cc.Sprite(frame);
      this.node.setContentSize(sprite.getContentSize());
    } else if (this.node.instance instanceof ccui.Button) {
      this.node.instance.loadTextureNormal(frame);
    }
  }
}

export class ImageRender extends EnhancedComponent {
  spriteFrame: string;
  texType: number;
  constructor(spriteFrame: string, texType?: number) {
    super();
    this.spriteFrame = spriteFrame;
    this.texType = texType;
  }

}

export class MaskRender extends EnhancedComponent {
  type: number;
  segments: number;
  inverted: boolean;
  constructor(type: number, segments: number, inverted: boolean) {
    super();
    this.type = type;
    this.segments = segments;
    this.inverted = inverted;
  }
}

}
