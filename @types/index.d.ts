declare type Float = number
declare type bool = boolean
declare type Integer = number
declare type Destructor = any
declare type ComponentEvent = any

interface HMR {
  accept: (cb?: () => void) => void
  dispose: (cb?: () => void) => void
}

declare namespace module {
  const hot: HMR
}
