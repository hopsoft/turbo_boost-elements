import { appendHTML } from '../html'
import DevtoolElement from './elements/devtool_element'
import SupervisorElement from './elements/supervisor_element'
import TooltipElement from './elements/tooltip_element'

customElements.define('reflex-behaviors-devtool', DevtoolElement)
customElements.define('reflex-behaviors-devtool-supervisor', SupervisorElement)
customElements.define('reflex-behaviors-devools-tooltip', TooltipElement)

let supervisorElement

function stop () {
  if (!supervisorElement) return
  supervisorElement.close()
  const stopEvent = new CustomEvent('reflex-behaviors:devtools-stop', {
    bubbles: true
  })
  supervisorElement.dispatchEvent(stopEvent)
}

function start () {
  appendHTML(
    '<reflex-behaviors-devtool-supervisor></reflex-behaviors-devtool-supervisor>'
  )
  supervisorElement = document.body.querySelector(
    'reflex-behaviors-devtool-supervisor'
  )
  const startEvent = new CustomEvent('reflex-behaviors:devtools-start', {
    bubbles: true
  })
  supervisorElement.dispatchEvent(startEvent)
}

function register (name, label) {
  if (!supervisorElement) return
  return appendHTML(
    `
      <reflex-behaviors-devtool name="${name}" slot="devtool">
        <span slot="label">${label}</span>
      </reflex-behaviors-devtool>
    `,
    supervisorElement
  )
}

function isEnabled (name) {
  if (!supervisorElement) return false
  return supervisorElement.enabledNames.includes(name)
}

export default {
  isEnabled,
  register,
  start,
  stop
}
