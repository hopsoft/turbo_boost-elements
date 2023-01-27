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
        // TODO: detect that the cursor is NOT over the devtool before collapsing
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

  hideDevtool () {
    this.currentTriggerElement.hideDevtool()
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
      this.hideDevtool()
    } catch {}
  }

  collapseNow () {
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
      this.currentTriggerElement.collapseSelector ||
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

  get expanded () {
    return this.currentTriggerElement.expanded
  }

  set expanded (value) {
    return (this.currentTriggerElement.expanded = value)
  }
}
