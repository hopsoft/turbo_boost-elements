import TurboReady from 'turbo_ready'
TurboReady.initialize(Turbo.StreamActions)

import 'turbo_reflex'
import './elements'
import devtools from './devtools'

self.ReflexBehaviors = { devtools }
