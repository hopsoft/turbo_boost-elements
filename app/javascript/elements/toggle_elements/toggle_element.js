import TurboBoostElement from '../turbo_boost_element'

const html = `
  <turbo-boost>
    <slot name="busy" hidden></slot>
    <slot></slot>
  </turbo-boost>
`

export default class ToggleElement extends TurboBoostElement {
  constructor () {
    super(html)
  }

  // Activity Indicator Best Practices
  //
  // 0.1 second is the limit for having the user feel that the system is reacting instantaneously
  // 1.0 second is the limit for the user's flow of thought to stay uninterrupted, even though the user will notice the delay
  // 10 seconds is the limit for keeping the user's attention focused on the task at hand
  //
  // SEE: https://www.nngroup.com/articles/response-times-3-important-limits/
  // SEE: https://www.smashingmagazine.com/2016/12/best-practices-for-animated-progress-indicators/
  //
  // QUESTION: what about server or network errors?
  //           should we automatically hide the busy element after a timeout?
  //           should there be a fallback message or event for something that takes too long?
  showBusyElement (delay = 120) {
    if (!this.busyElement) return

    clearTimeout(this.showBusyElementTimeout)

    this.showBusyElementTimeout = setTimeout(() => {
      this.busyStartedAt = Date.now()
      this.busySlotElement.hidden = false
      this.defaultSlotElement.hidden = true
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
  }
}
