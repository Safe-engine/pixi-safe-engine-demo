import { Constructor } from '../lib/exts/global'
import { ComponentType } from '../lib/gworld/components/EnhancedComponent'

export function instantiate(component: Constructor<ComponentType>) {
  return new component().render().node
}
