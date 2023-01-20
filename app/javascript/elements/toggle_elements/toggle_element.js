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

  // SEE: https://www.nngroup.com/articles/response-times-3-important-limits/
  showBusyElement (delay = 250) {
    clearTimeout(this.showBusyElementTimeout)
    if (!this.busyElement) return
    this.showBusyElementTimeout = setTimeout(() => {
      let style = {
        display: 'inline-block',
        height: `${this.offsetHeight}px`,
        lineHeight: `${this.offsetHeight}px`,
        margin: 0
      }
      Object.assign(this.busyElement.style, style)
      this.busySlotElement.hidden = false
      this.defaultSlotElement.hidden = true
    }, delay)
  }

  hideBusyElement () {
    clearTimeout(this.showBusyElementTimeout)
    if (!this.busyElement) return
    this.busySlotElement.hidden = true
    this.defaultSlotElement.hidden = false
  }

  get busyElement () {
    return this.querySelector('[slot="busy"]')
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
    this.setAttribute('busy', !!value)
    if (!!value) {
      this.showBusyElement()
    } else {
      this.hideBusyElement()
    }
  }
}
