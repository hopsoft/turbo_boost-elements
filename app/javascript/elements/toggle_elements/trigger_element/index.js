import ToggleElement, { busyDuration } from '../toggle_element'
import Devtool from './devtool'
import focus from './focus'

let currentFocusSelector

export default class ToggleTriggerElement extends ToggleElement {
  connectedCallback () {
    super.connectedCallback()

    const { start: commandStartEvent } = TurboBoost.Commands.events
    this.commandStartHandler = this.onCommandStart.bind(this)
    this.addEventListener(commandStartEvent, this.commandStartHandler)

    const { before: beforeInvokeEvent } = TurboBoost.Streams.invokeEvents
    this.beforeInvokeHandler = this.onBeforeInvoke.bind(this)
    addEventListener(beforeInvokeEvent, this.beforeInvokeHandler)

    // fires after receiving the toggle morph Turbo Stream but before it is executed
    // this.addEventListener(TurboBoost.Commands.events.success, event => {
    //   // TODO: imlement cache, this.targetElement.cacheHTML()
    // })

    this.initializeDevtool()
  }

  disconnectedCallback () {
    // delay cleanup because the trigger may have been morphed out fo the DOM,
    // but it's needed to apply behavior like focus etc...
    setTimeout(() => {
      const { start: commandStartEvent } = TurboBoost.Commands.events
      this.removeEventListener(commandStartEvent, this.commandStartHandler)

      const { before: beforeInvokeEvent } = TurboBoost.Streams.invokeEvents
      removeEventListener(beforeInvokeEvent, this.beforeInvokeHandler)

      this.devtool.hide({ active: false })
      this.devtool.unregisterEventListeners()
      delete this.devtool
    }, 1000)
  }

  initializeDevtool () {
    const mouseenter = () => this.devtool.show()

    addEventListener('turbo-boost:devtools-start', () => {
      this.devtool = new Devtool(this)
      this.addEventListener('mouseenter', mouseenter)
    })

    addEventListener('turbo-boost:devtools-stop', () => {
      this.removeEventListener('mouseenter', mouseenter)
      this.devtool.hide({ active: false })
      this.devtool.unregisterEventListeners()
      delete this.devtool
    })

    this.dispatchEvent(
      new CustomEvent('turbo-boost:devtools-connect', { bubbles: true })
    )
  }

  hideDevtool () {
    if (this.devtool) this.devtool.hide({ active: false })
  }

  onCommandStart (event) {
    currentFocusSelector = this.focusSelector
    this.targetElement.labeledBy = this.id
    this.targetElement.collapseMatches()
    this.targetElement.busy = true
    this.busy = true
    // TODO: implement cache - this.targetElement.renderCachedHTML()
  }

  // runs before an invoke turbo stream is executed
  onBeforeInvoke (event) {
    // return early if we're not the element responsible for this invoke
    if (event.detail.method !== 'morph') return
    if (event.target.id !== this.morphs) return
    const selector = `turbo-boost-toggle-target[aria-labeledby="${this.id}"]`
    if (!event.target.querySelector(selector)) return

    // ensure the busy element is shown long enough for a good user experience
    // we accomplish this by modifying the event.detail with invoke instructions i.e. { delay }
    // SEE: the TurboBoost Streams library for details on how this works
    const duration = Date.now() - this.busyStartedAt
    let delay = busyDuration - duration
    if (delay < 10) delay = 10
    event.detail.invoke = { delay }

    // runs before the morph is executed
    setTimeout(() => {
      this.busy = false
      this.targetElement.busy = false
      this.morphToggleElements.forEach(el => (el.busy = false))
    }, delay - 10)

    // runs after the morph is executed
    setTimeout(
      () => focus(this.targetElement.querySelector(currentFocusSelector)),
      delay + 100
    )
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

  // all toggle elements contained by the `morphElement`
  get morphToggleElements () {
    return Array.from(
      this.morphElement.querySelectorAll(
        'turbo-boost-toggle-trigger,turbo-boost-toggle-target'
      )
    )
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
    return (
      this.getAttribute('focus-selector') || this.targetElement.focusSelector
    )
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
