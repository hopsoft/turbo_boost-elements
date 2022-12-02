import TurboReady from 'turbo_ready'
TurboReady.initialize(Turbo.StreamActions)

import 'turbo_reflex'
import './elements'
import devtools from './devtools'

const { enable, disable, start, stop } = devtools

self.ReflexBehaviors = {
  devtools: { enable, disable, start, stop }
}
