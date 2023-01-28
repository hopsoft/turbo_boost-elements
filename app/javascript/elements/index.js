import TurboBoostElement from './turbo_boost_element'
import ToggleTargetElement from './toggle_elements/target_element'
import ToggleTriggerElement from './toggle_elements/trigger_element'

// Valid custom element names: https://html.spec.whatwg.org/#valid-custom-element-name

customElements.define('turbo-boost', TurboBoostElement)
customElements.define('turbo-boost-toggle-target', ToggleTargetElement)
customElements.define('turbo-boost-toggle-trigger', ToggleTriggerElement)
