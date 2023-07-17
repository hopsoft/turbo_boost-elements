import ToggleElement from '../toggle_element'

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
    if (this.busy) return
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
      if (el.id === this.id) return
      if (el.collapse) el.collapse(0)
    })
  }

  get collapseSelector () {
    return (
      this.triggerElement.collapseSelector ||
      this.getAttribute('collapse-selector')
    )
  }

  get focusSelector () {
    return this.getAttribute('focus-selector')
  }

  // the active trigger
  get triggerElement () {
    return document.getElementById(this.labeledBy)
  }

  // all triggers
  get triggerElements () {
    // TODO we'll have to improve this to find any trigger element that contains this ID in its space separated LIST of aria-controls
    return document.querySelectorAll(`[aria-controls="${this.id}"]`)
  }

  // the dom id of the active trigger
  get labeledBy () {
    return this.getAttribute('aria-labeledby')
  }

  set labeledBy (value) {
    return this.setAttribute('aria-labeledby', value)
  }

  get collapseOn () {
    const value = this.getAttribute('collapse-on')
    if (!value) return []
    return JSON.parse(value)
  }

  get expanded () {
    return this.triggerElement ? this.triggerElement.expanded : false
  }

  set expanded (value) {
    this.triggerElements.forEach(el => (el.expanded = value))
  }

  get busy () {
    return this.triggerElement && this.triggerElement.busy
  }
}
