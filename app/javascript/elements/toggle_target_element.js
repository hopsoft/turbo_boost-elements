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

  collapse () {
    clearTimeout(this.collapseTimeout)
    this.collapseTimeout = setTimeout(() => {
      if (this.triggerElement) this.triggerElement.expanded = false
      this.innerHTML = ''
    }, 250)
  }

  get triggerElement () {
    return (
      document.getElementById(this.labeledBy) ||
      document.querySelector(`[aria-controls="${this.id}"]`)
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
}
