import { appendHTML } from './dom'
import DevtoolElement from './elements/devtool_element'
import SupervisorElement from './elements/supervisor_element'
import TooltipElement from './elements/tooltip_element'

customElements.define('reflex-behaviors-devtool', DevtoolElement)
customElements.define('reflex-behaviors-devtool-supervisor', SupervisorElement)
customElements.define('reflex-behaviors-devools-tooltip', TooltipElement)

let supervisorElement

function stop () {
  if (stopped()) return
  supervisorElement.close()
  supervisorElement.dispatchEvent(
    new CustomEvent('reflex-behaviors:devtools-stop', {
      bubbles: true
    })
  )
  supervisorElement = null
}

function start () {
  if (started()) return
  appendHTML(
    '<reflex-behaviors-devtool-supervisor></reflex-behaviors-devtool-supervisor>'
  )
  supervisorElement = document.body.querySelector(
    'reflex-behaviors-devtool-supervisor'
  )
  supervisorElement.dispatchEvent(
    new CustomEvent('reflex-behaviors:devtools-start', {
      bubbles: true
    })
  )
}

function restart () {
  const enabledList = supervisorElement
    ? Object.keys(supervisorElement.enabledDevtools)
    : []

  stop()
  start()

  supervisorElement.devtoolElements.forEach(el => {
    if (enabledList.includes(el.name)) el.check()
  })
}

function started () {
  return !!supervisorElement
}

function stopped () {
  return !started()
}

let restartTimeout
function debouncedRestart () {
  clearTimeout(restartTimeout)
  restartTimeout = setTimeout(restart, 25)
}

function autoRestart () {
  if (started()) debouncedRestart()
}

addEventListener('turbo:load', autoRestart)
addEventListener('turbo-frame:load', autoRestart)
addEventListener('turbo-reflex:success', autoRestart)
addEventListener('turbo-reflex:finish', autoRestart)

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

function enabled (name) {
  if (!supervisorElement) return false
  return supervisorElement.enabledDevtools[name]
}

export default {
  enabled,
  register,
  start,
  stop,
  restart: debouncedRestart,
  get started () {
    return started()
  },
  get stopped () {
    return stopped()
  }
}
