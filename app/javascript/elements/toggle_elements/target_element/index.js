import ToggleElement from '../toggle_element'
import './focus'

export default class ToggleTargetElement extends ToggleElement {
  connectedCallback () {
    super.connectedCallback()

    this.addEventListener('mouseenter', () =>
      clearTimeout(this.collapseTimeout)
    )

    this.collapseOn.forEach(name =>
      this.addEventListener(name, () => this.collapse())
    )
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

  collapse (delay = 250) {
    if (delay > 0) {
      clearTimeout(this.collapseTimeout)
      return (this.collapseTimeout = setTimeout(() => this.collapse(0), delay))
    }

    this.innerHTML = ''
    try {
      this.currentTriggerElement.expanded = false
      this.currentTriggerElement.hideDevtool()
    } catch {}
  }

  collapseMatches () {
    document.querySelectorAll(this.collapseSelector).forEach(el => {
      if (el === this) return
      if (el.collapse) el.collapse(0)
    })
  }

  get collapseSelector () {
    if (
      this.currentTriggerElement &&
      this.currentTriggerElement.collapseSelector
    )
      return this.currentTriggerElement.collapseSelector
    return this.getAttribute('collapse-selector')
  }

  focus () {
    clearTimeout(this.focusTimeout)
    this.focusTimeout = setTimeout(() => {
      if (this.focusElement) this.focusElement.focus()
    }, 50)
  }

  get focusSelector () {
    if (this.currentTriggerElement && this.currentTriggerElement.focusSelector)
      return this.currentTriggerElement.focusSelector
    return this.getAttribute('focus-selector')
  }

  get focusElement () {
    return this.querySelector(this.focusSelector)
  }

  get labeledBy () {
    return this.getAttribute('aria-labeledby')
  }

  get collapseOn () {
    const value = this.getAttribute('collapse-on')
    if (!value) return []
    return JSON.parse(value)
  }
}
