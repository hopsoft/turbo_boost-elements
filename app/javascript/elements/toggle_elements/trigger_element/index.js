import { Devtool, decorateElementWithDevtool } from '@turbo-boost/devtools'

import ToggleElement, { busyDuration } from '../toggle_element'
import focus from './focus'

document.addEventListener('turbo-boost:devtools-start', () => Devtool.register('toggle', 'toggles'))

let currentFocusSelector

export default class ToggleTriggerElement extends ToggleElement {
  constructor() {
    super()

    decorateElementWithDevtool(this, 'toggle', 'toggles')
  }

  connectedCallback() {
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

  disconnectedCallback() {
    // delay cleanup because the trigger may have been morphed out of the DOM,
    // but it's needed to apply behavior like focus etc...
    setTimeout(() => {
      const { start: commandStartEvent } = TurboBoost.Commands.events
      this.removeEventListener(commandStartEvent, this.commandStartHandler)

      const { before: beforeInvokeEvent } = TurboBoost.Streams.invokeEvents
      removeEventListener(beforeInvokeEvent, this.beforeInvokeHandler)

      this.removeDevtool()
    }, 1000)
  }

  onCommandStart(event) {
    currentFocusSelector = this.focusSelector
    this.targetElement.labeledBy = this.id
    this.targetElement.collapseMatches()
    this.busy = true
    // TODO: implement cache - this.targetElement.renderCachedHTML()
  }

  // runs before an invoke turbo stream is executed
  onBeforeInvoke(event) {
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
      this.morphToggleTriggerElements.forEach(el => (el.busy = false))
    }, delay - 10)

    // runs after the morph is executed
    setTimeout(() => focus(this.targetElement.querySelector(currentFocusSelector)), delay + 100)
  }

  // a list of views shared between the trigger and target
  get sharedViews() {
    if (!this.targetElement) return []
    if (!this.targetElement.viewStack) return []
    const reducer = (memo, view) => {
      if (this.targetElement.viewStack.includes(view)) memo.push(view)
      return memo
    }
    return this.viewStack.reduce(reducer.bind(this), [])
  }

  // the partial to render
  get renders() {
    return this.getAttribute('renders')
  }

  // the renderered partial's top wrapping dom_id
  get morphs() {
    return this.getAttribute('morphs')
  }

  // all toggle elements contained by the `morphElement`
  get morphToggleTriggerElements() {
    return Array.from(this.morphElement.querySelectorAll('turbo-boost-toggle-trigger'))
  }

  // the target's dom_id
  get controls() {
    return this.getAttribute('aria-controls')
  }

  get collapseSelector() {
    return this.getAttribute('collapse-selector')
  }

  get focusSelector() {
    return this.getAttribute('focus-selector') || this.targetElement.focusSelector
  }

  // indicates if the toggle state should be remembered across requests
  get remember() {
    return this.getAttribute('remember') === 'true'
  }

  set remember(value) {
    return this.setAttribute('remember', !!value)
  }

  // indicates if the target is expanded
  get expanded() {
    return this.getAttribute('aria-expanded') === 'true'
  }

  set expanded(value) {
    this.setAttribute('aria-expanded', !!value)
  }

  // indicates if the target is expanded
  get collapsed() {
    return !this.expanded
  }

  // ------ DevToolDelegate ------
  get command() {
    return this.dataset.turboCommand
  }

  get renderingLineLabel() {
    return 'renders & morphs'
  }

  // the morph element
  get morphElement() {
    if (!this.morphs) return null
    return document.getElementById(this.morphs)
  }

  // the target element
  get targetElement() {
    if (!this.controls) return null
    return document.getElementById(this.controls)
  }

  get triggerTooltipData() {
    let content = this.triggerElement.viewStack
      .reverse()
      .map((view, index) => {
        return this.triggerElement.sharedViews.includes(view)
          ? `<div slot="content">${index + 1}. ${view}</div>`
          : `<div slot="content-bottom">${index + 1}. ${view}</div>`
      }, this)
      .join('')

    return {
      subtitle: `
      <b>id</b>: ${this.triggerElement.id}<br>
      <b>aria-controls</b>: ${this.triggerElement.controls}<br>
      <b>aria-expanded</b>: ${this.triggerElement.expanded}<br>
      <b>remember</b>: ${this.triggerElement.remember}<br>
    `,
      content: `
      <div slot="content-top">
        <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        <b>View Stack</b>
      </div>
      ${content}
    `
    }
  }

  get targetTooltipData() {
    let content = this.targetElement.viewStack
      .reverse()
      .map((view, index) => {
        return this.triggerElement.sharedViews.includes(view)
          ? `<div slot="content">${index + 1}. ${view}</div>`
          : `<div slot="content-bottom">${index + 1}. ${view}</div>`
      }, this)
      .join('')

    return {
      subtitle: `<b>id</b>: ${this.targetElement.id}<br>
      <b>aria-labeled-by</b>: ${this.targetElement.labeledBy}<br>
`,
      content: `
      <div slot="content-top">
        <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        <b>View Stack</b>
      </div>
      ${content}
    `
    }
  }
}
