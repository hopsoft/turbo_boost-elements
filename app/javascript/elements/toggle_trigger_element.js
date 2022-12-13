import ReflexElement from './reflex_element'
import DevtoolSupervisor from '../devtools/supervisor'
import ToggleDevtool from '../devtools/toggle'

export default class ToggleTriggerElement extends ReflexElement {
  connectedCallback () {
    super.connectedCallback()
    const mouseenter = () => this.devtool.show()

    document.addEventListener('reflex-behaviors:devtools-start', () => {
      this.devtool = new ToggleDevtool(this)
      this.addEventListener('mouseenter', mouseenter)
    })

    document.addEventListener('reflex-behaviors:devtools-stop', () => {
      this.removeEventListener('mouseenter', mouseenter)
      delete this.devtool
    })

    if (DevtoolSupervisor.started) DevtoolSupervisor.restart()
  }

  collapse () {
    try {
      this.target.remove()
      this.setAttribute('aria-expanded', false)
    } catch (error) {
      console.error('Failed to collapse toggle-trigger target!', error)
    }
  }

  get sharedViews () {
    if (!this.target) return []
    if (!this.target.viewStack) return []
    const reducer = (memo, view) => {
      if (this.target.viewStack.includes(view)) memo.push(view)
      return memo
    }
    return this.viewStack.reduce(reducer.bind(this), [])
  }

  get renderingInfo () {
    const value = this.getAttribute('render')
    if (!value) return {}
    return JSON.parse(value)
  }

  get renderingPartial () {
    return this.renderingInfo.partial
  }

  get renderingElement () {
    const { id } = this.renderingInfo
    if (!id) return null
    return document.getElementById(id)
  }

  get expanded () {
    return this.getAttribute('aria-expanded') === 'true'
  }

  get controls () {
    return this.getAttribute('aria-controls')
  }

  get target () {
    return document.getElementById(this.controls)
  }

  get active () {
    return this.getAttribute('active') === 'true'
  }

  set active (value) {
    this.setAttribute('active', !!value)
  }
}

addEventListener(
  TurboReflex.events.start,
  event => (event.target.active = true)
)
addEventListener(
  TurboReflex.events.success,
  event => (event.target.active = false)
)
addEventListener(
  TurboReflex.events.finish,
  event => (event.target.active = false)
)

addEventListener('click', event => {
  if (event.target.tagName.match(/reflex-behaviors-devtool/i)) return
  setTimeout(() => {
    const selector =
      'toggle-trigger[aria-controls][aria-expanded="true"][auto-collapse="true"]'
    document.querySelectorAll(selector).forEach(trigger => trigger.collapse())
  })
})
