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

  // TODO: set explicit size of busy element to match the size of the default element
  showBusyElement () {
    if (!this.busyElement) return
    this.busySlotElement.hidden = false
    this.defaultSlotElement.hidden = true
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
    if (!!value) this.showBusyElement()
  }
}
