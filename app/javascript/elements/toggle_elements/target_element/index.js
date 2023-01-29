import ToggleElement from '../toggle_element'
import './focus'

export default class ToggleTargetElement extends ToggleElement {
  connectedCallback () {
    super.connectedCallback()

    this.mouseenterHandler = this.onMouseenter.bind(this)
    this.addEventListener('mouseenter', this.mouseenterHandler)

    this.collapseHandler = this.collapse.bind(this)
    this.collapseNowHandler = this.collapseNow.bind(this)

    this.collapseOn.forEach(entry => {
      const parts = entry.split('@')
      const name = parts[0]

      if (parts.length > 1) {
        const target = parts[1].match(/^self|window$/) ? self : self[parts[1]]
        target.addEventListener(name, this.collapseNowHandler)
      } else {
        this.addEventListener(name, this.collapseHandler)
      }
    })
  }

  disconnectedCallback () {
    this.removeEventListener('mouseenter', this.mouseenterHandler)

    this.collapseOn.forEach(entry => {
      const parts = entry.split('@')
      const name = parts[0]

      if (parts.length > 1) {
        const target = parts[1].match(/^self|window$/) ? self : self[parts[1]]
        target.removeEventListener(name, this.collapseNowHandler)
      } else {
        this.removeEventListener(name, this.collapseHandler)
      }
    })
  }

  // TODO: get cached content working properly
  //       perhaps use a mechanic other than morph

  // TODO: implement cache (similar to Turbo Drive restoration visit)
  cacheHTML () {
    // this.cachedHTML = this.innerHTML
  }

  // TODO: implement cache (similar to Turbo Drive restoration visit)
  renderCachedHTML () {
    // if (!this.cachedHTML) return
    // this.innerHTML = this.cachedHTML
  }

  onMouseenter () {
    clearTimeout(this.collapseTimeout)
  }

  collapse (delay = 250) {
    clearTimeout(this.collapseTimeout)
    if (typeof delay !== 'number') delay = 250

    if (delay > 0)
      return (this.collapseTimeout = setTimeout(() => this.collapse(0), delay))

    this.innerHTML = ''
    try {
      this.expanded = false
      this.triggerElement.hideDevtool()
    } catch {}
  }

  collapseNow (event) {
    if (event.target.closest('turbo-boost-devtool-tooltip')) return
    this.collapse(0)
  }

  collapseMatches () {
    document.querySelectorAll(this.collapseSelector).forEach(el => {
      if (el === this) return
      if (el.collapse) el.collapse(0)
    })
  }

  get collapseSelector () {
    return (
      this.triggerElement.collapseSelector ||
      this.getAttribute('collapse-selector')
    )
  }

  focus () {
    clearTimeout(this.focusTimeout)
    this.focusTimeout = setTimeout(() => {
      if (this.focusElement) this.focusElement.focus()
    }, 50)
  }

  get focusSelector () {
    let value = this.getAttribute('focus-selector')
    if (this.triggerElement)
      value = this.triggerElement.getAttribute('focus-selector') || value
    return value
  }

  get focusElement () {
    return this.querySelector(this.focusSelector)
  }

  get triggerElement () {
    return (
      document.getElementById(this.labeledBy) ||
      document.querySelector(
        `turbo-boost-toggle-trigger[aria-controls="${this.id}"]`
      )
    )
  }

  get labeledBy () {
    return this.getAttribute('aria-labeledby')
  }

  get collapseOn () {
    const value = this.getAttribute('collapse-on')
    if (!value) return []
    return JSON.parse(value)
  }

  get expanded () {
    return this.triggerElement.expanded
  }

  set expanded (value) {
    return (this.triggerElement.expanded = value)
  }
}
