import TurboBoostElement from '../turbo_boost_element'

const stylesheet = ``

const html = `
  <style>${stylesheet}</style>
  <turbo-boost>
    <slot name="busy"></slot>
    <slot></slot>
  </turbo-boost>
`

export default class ToggleElement extends TurboBoostElement {
  constructor (html) {
    super(html)
  }

  // indicates if an rpc call is active/busy
  get busy () {
    return this.getAttribute('busy') === 'true'
  }

  // indicates if an rpc call is active/busy
  set busy (value) {
    this.setAttribute('busy', !!value)
  }
}
