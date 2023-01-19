import ToggleElement from '../toggle_element'
import Devtool from './devtool'

export default class ToggleTriggerElement extends ToggleElement {
  connectedCallback () {
    super.connectedCallback()

    if (this.targetElement) {
      this.targetElement.setAttribute('aria-labeledby', this.id)
    }

    this.addEventListener(TurboBoost.Commands.events.start, () => {
      this.busy = true
      this.targetElement.currentTriggerElement = this
      this.targetElement.renderCachedHTML()
    })

    this.addEventListener(TurboBoost.Commands.events.success, () => {
      this.busy = false
      this.targetElement.focus()
      this.targetElement.collapseMatches()
      this.targetElement.cacheHTML()
    })

    this.addEventListener(
      TurboBoost.Commands.events.finish,
      () => (this.busy = false)
    )

    this.initializeDevtool()
  }

  initializeDevtool () {
    const mouseenter = () => this.devtool.show()

    addEventListener('turbo-boost:devtools-start', () => {
      this.devtool = new Devtool(this)
      this.addEventListener('mouseenter', mouseenter)
    })

    addEventListener('turbo-boost:devtools-stop', () => {
      this.removeEventListener('mouseenter', mouseenter)
      delete this.devtool
    })

    this.dispatchEvent(
      new CustomEvent('turbo-boost:devtools-connect', { bubbles: true })
    )
  }

  hideDevtool () {
    if (this.devtool) this.devtool.hide(true)
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

  get collapseSelector () {
    return this.getAttribute('collapse-selector')
  }

  get focusSelector () {
    return this.getAttribute('focus-selector')
  }

  // indicates if the toggle state should be remembered across requests
  get remember () {
    return this.getAttribute('remember') === 'true'
  }

  set remember (value) {
    return this.setAttribute('remember', !!value)
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
}
