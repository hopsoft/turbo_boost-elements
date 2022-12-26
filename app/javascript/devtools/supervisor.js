import { appendHTML } from '../utils/dom'
import DevtoolElement from './elements/devtool_element'
import SupervisorElement from './elements/supervisor_element'
import TooltipElement from './elements/tooltip_element'
import dependencies from './dependencies'

customElements.define('turbo-boost-devtool', DevtoolElement)
customElements.define('turbo-boost-devtool-supervisor', SupervisorElement)
customElements.define('turbo-boost-devtool-tooltip', TooltipElement)

let supervisorElement

function makeDraggable () {
  if (!supervisorElement) return
  try {
    new PlainDraggable(supervisorElement)
  } catch {
    setTimeout(makeDraggable, 200)
  }
}

function stop () {
  if (stopped()) return
  supervisorElement.close()
  supervisorElement.dispatchEvent(
    new CustomEvent('turbo-boost:devtools-stop', {
      bubbles: true
    })
  )
  supervisorElement = null
  dependencies.removeAll()
}

function start () {
  if (started()) return
  dependencies.add(dependencies.LeaderLine)
  dependencies.add(dependencies.PlainDraggable)
  supervisorElement = appendHTML(
    '<turbo-boost-devtool-supervisor></turbo-boost-devtool-supervisor>'
  )
  setTimeout(makeDraggable, 200)
  supervisorElement.dispatchEvent(
    new CustomEvent('turbo-boost:devtools-start', {
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
addEventListener(TurboBoost.Commands.events.success, autoRestart)
addEventListener(TurboBoost.Commands.events.finish, autoRestart)
addEventListener('turbo-boost:devtools-close', stop)

function register (name, label) {
  if (!supervisorElement) return
  return appendHTML(
    `
      <turbo-boost-devtool name="${name}" slot="devtool">
        <span slot="label">${label}</span>
      </turbo-boost-devtool>
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
