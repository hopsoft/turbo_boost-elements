import TurboBoostElement from '../turbo_boost_element'

const html = `
  <turbo-boost>
    <slot name="busy" hidden></slot>
    <slot></slot>
  </turbo-boost>
`

export const busyDelay = 100 // milliseconds - time to wait before showing busy element
export const busyDuration = 400 // milliseconds - minimum time that busy element is shown

export default class ToggleElement extends TurboBoostElement {
  constructor () {
    super(html)
  }

  // TODO: Should we timeout after a theoretical max wait time?
  //       The idea being that a server error occurred and the toggle failed.
  showBusyElement () {
    clearTimeout(this.showBusyElementTimeout)
    clearTimeout(this.hideBusyElementTimeout)

    if (!this.busyElement) return

    this.busyStartedAt = Date.now() + busyDelay
    this.showBusyElementTimeout = setTimeout(() => {
      this.busySlotElement.hidden = false
      this.defaultSlotElement.hidden = true
    }, busyDelay)
  }

  hideBusyElement () {
    clearTimeout(this.showBusyElementTimeout)
    clearTimeout(this.hideBusyElementTimeout)

    if (!this.busyElement) return

    let delay = busyDuration - (Date.now() - this.busyStartedAt)
    if (delay < 0) delay = 0

    delete this.busyStartedAt
    this.hideBusyElementTimeout = setTimeout(() => {
      this.busySlotElement.hidden = true
      this.defaultSlotElement.hidden = false
    }, delay)
  }

  get busyElement () {
    return this.querySelector(':scope > [slot="busy"]')
  }

  get busySlotElement () {
    return this.shadowRoot.querySelector('slot[name="busy"]')
  }

  get defaultSlotElement () {
    return this.shadowRoot.querySelector('slot:not([name])')
  }

  // indicates if an rpc call is active/busy
  get busy () {
    return this.getAttribute('busy') === 'true'
  }

  // indicates if an rpc call is active/busy
  set busy (value) {
    value = !!value
    if (this.busy === value) return
    this.setAttribute('busy', value)
    if (value) this.showBusyElement()
    else this.hideBusyElement()
  }

  get busyStartedAt () {
    if (!this.dataset.busyStartedAt) return 0
    return Number(this.dataset.busyStartedAt)
  }

  set busyStartedAt (value) {
    this.dataset.busyStartedAt = value
  }
}
