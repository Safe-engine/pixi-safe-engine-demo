import {
  MoveTo,
  MoveBy,
  ScaleTo,
  ScaleBy,
  RotateTo,
  RotateBy,
  FadeIn,
  FadeOut,
  SkewTo,
  SkewBy,
  PivotTo,
  PivotBy,
  Blink,
  TintTo,
  TintBy,
  AlphaTo,
  AlphaBy,
  Repeat,
  Sequence,
  Spawn,
  DelayTime,
  CallFunc,
  Action,
} from '../../action'

export function moveToAction(x: number, y: number, t: number) {
  return new MoveTo(x, y, t)
}
export function moveByAction(x: number, y: number, t: number) {
  return new MoveBy(x, y, t)
}
export function scaleToAction(x: number, y: number, t: number) {
  return new ScaleTo(x, y, t)
}
export function scaleByAction(x: number, y: number, t: number) {
  return new ScaleBy(x, y, t)
}
export function rotateToAction(r: number, t: number) {
  return new RotateTo(r, t)
}
export function rotateByAction(r: number, t: number) {
  return new RotateBy(r, t)
}
export function fadeInAction(t: number) {
  return new FadeIn(t)
}
export function fadeOutAction(x: number, y: number, t: number) {
  return new FadeOut(t)
}
export function skewToAction(x: number, y: number, t: number) {
  return new SkewTo(x, y, t)
}
export function skewByAction(x: number, y: number, t: number) {
  return new SkewBy(x, y, t)
}
export function pivotToAction(x: number, y: number, t: number) {
  return new PivotTo(x, y, t)
}
export function pivotByAction(x: number, y: number, t: number) {
  return new PivotBy(x, y, t)
}
export function blinkAction(count: number, t: number) {
  return new Blink(count, t)
}
export function tintToAction(tint: any, t: number) {
  return new TintTo(tint, t)
}
export function tintByAction(tint: number, t: number) {
  return new TintBy(tint, t)
}
export function alphaToAction(alpha: number, t: number) {
  return new AlphaTo(alpha, t)
}
export function alphaByAction(alpha: number, t: number) {
  return new AlphaBy(alpha, t)
}
export function repeatAction(action: Action, count: number) {
  return new Repeat(action, count)
}
export function sequenceAction(...action: Action[]) {
  return new Sequence(...action)
}
export function spawnAction(...action: Action[]) {
  return new Spawn(...action)
}
export function delayTimeAction(t: number) {
  return new DelayTime(t)
}
export function callFuncAction(func: () => void) {
  return new CallFunc(func)
}
