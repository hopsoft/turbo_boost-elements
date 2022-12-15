import ReflexElement from './reflex_element'

export default class ToggleTargetElement extends ReflexElement {
  connectedCallback () {
    super.connectedCallback()

    this.addEventListener('mouseenter', () =>
      clearTimeout(this.collapseTimeout)
    )

    this.collapseOn.forEach(name =>
      this.addEventListener(name, () => this.collapse())
    )
  }

  cacheHTML () {
    //this.cachedHTML = this.innerHTML
  }

  renderCachedHTML () {
    //if (!this.cachedHTML) return
    //this.innerHTML = this.cachedHTML
  }

  collapse () {
    clearTimeout(this.collapseTimeout)
    this.collapseTimeout = setTimeout(() => {
      if (this.triggerElement) this.triggerElement.expanded = false
      this.innerHTML = ''
    }, 250)
  }

  focus () {
    clearTimeout(this.focusTimeout)
    this.focusTimeout = setTimeout(() => {
      if (!this.focusElement) return
      this.focusElement.focus()
      this.focusElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }, 50)
  }

  get focusSelector () {
    return (
      this.triggerElement.focusSelector || this.getAttribute('focus-selector')
    )
  }

  set focusSelector (value) {
    this.setAttribute('focus-selector', value)
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
