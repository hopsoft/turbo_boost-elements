import '@turbo-boost/commands'
import devtools from '@turbo-boost/dev-tools'
import './elements'

self.TurboBoost = self.TurboBoost || {}
self.TurboBoost.devtools = devtools
self.TurboBoost.Elements = {}

export default self.TurboBoost.Elements
