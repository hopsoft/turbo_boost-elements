import '@turbo-boost/commands'
import './elements'
import devtools from './devtools'

self.TurboBoost = self.TurboBoost || {}
self.TurboBoost.devtools = devtools
self.TurboBoost.Elements = {}

export default self.TurboBoost.Elements
