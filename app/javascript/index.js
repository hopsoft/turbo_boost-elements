import '@turbo-boost/commands'
import devtools from '@turbo-boost/devtools'
import VERSION from './version'
import './elements'

self.TurboBoost = self.TurboBoost || {}
self.TurboBoost.devtools = devtools
self.TurboBoost.Elements = { VERSION }

export default self.TurboBoost.Elements
