import ReflexElement from './reflex_element'
import DevtoolSupervisor from '../devtools/supervisor'
import ToggleDevtool from '../devtools/toggle'

export default class ToggleTriggerElement extends ReflexElement {
  connectedCallback () {
    super.connectedCallback()

    if (this.targetElement)
      this.targetElement.setAttribute('aria-labeledby', this.id)

    // activity
    this.addEventListener(TurboReflex.events.start, () => {
      this.active = true
      if (this.targetElement && this.cachedContent)
        this.targetElement.innerHTML = this.cachedContent
    })
    this.addEventListener(TurboReflex.events.success, () => {
      this.targetElement.active = false
      this.cachedContent = this.targetElement.innerHTML
    })
    this.addEventListener(TurboReflex.events.finish, () => {
      this.targetElement.active = false
    })

    this.initializeDevtool()
  }

  initializeDevtool () {
    const mouseenter = () => this.devtool.show()

    addEventListener('reflex-behaviors:devtools-start', () => {
      this.devtool = new ToggleDevtool(this)
      this.addEventListener('mouseenter', mouseenter)
    })

    addEventListener('reflex-behaviors:devtools-stop', () => {
      this.removeEventListener('mouseenter', mouseenter)
      delete this.devtool
    })

    if (DevtoolSupervisor.started) DevtoolSupervisor.restart()
  }

  // a list of views shared between the trigger and target
  get sharedViews () {
    if (!this.targetElement) return []
    if (!this.targetElement.viewStack) return []
    const reducer = (memo, view) => {
      if (this.targetElement.viewStack.includes(view)) memo.push(view)
      return memo
    }
    return this.viewStack.reduce(reducer.bind(this), [])
  }

  // the partial to render
  get renders () {
    return this.getAttribute('renders')
  }

  // the renderered partial's top wrapping dom_id
  get morphs () {
    return this.getAttribute('morphs')
  }

  // the morph element
  get morphElement () {
    if (!this.morphs) return null
    return document.getElementById(this.morphs)
  }

  // the target's dom_id
  get controls () {
    return this.getAttribute('aria-controls')
  }

  // the target element
  get targetElement () {
    if (!this.controls) return null
    return document.getElementById(this.controls)
  }

  // indicates if the target is expanded
  get expanded () {
    return this.getAttribute('aria-expanded') === 'true'
  }

  set expanded (value) {
    this.setAttribute('aria-expanded', !!value)
  }

  // indicates if the target is expanded
  get collapsed () {
    return !this.expanded
  }

  // indicates if an rpc call is active
  get active () {
    return this.getAttribute('active') === 'true'
  }

  set active (value) {
    this.setAttribute('active', !!value)
  }
}
