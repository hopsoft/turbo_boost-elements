import TurboBoostElement from './turbo_boost_element'

export default class ToggleTargetElement extends TurboBoostElement {
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

  cacheHTML () {
    // this.cachedHTML = this.innerHTML
  }

  renderCachedHTML () {
    // if (!this.cachedHTML) return
    // this.innerHTML = this.cachedHTML
  }

  collapse () {
    clearTimeout(this.collapseTimeout)
    this.collapseTimeout = setTimeout(() => {
      this.innerHTML = ''
      try {
        this.currentTriggerElement.expanded = false
        this.currentTriggerElement.hideDevtool()
      } catch {}
    }, 250)
  }

  collapseMatches () {
    document.querySelectorAll(this.collapseSelector).forEach(el => {
      if (el === this) return
      if (el.collapse) el.collapse()
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
      if (!this.focusElement) return
      this.focusElement.focus()
      this.focusElement.scrollIntoView({ block: 'center', behavior: 'smooth' })
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
