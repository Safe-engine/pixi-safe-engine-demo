declare type Float = number
declare type Integer = number

interface HMR {
  accept: (cb?: () => void) => void
  dispose: (cb?: () => void) => void
}

declare const module = {
  hot: HMR,
}

declare let process: Process
