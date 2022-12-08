export default class ReflexElement extends HTMLElement {
  constructor () {
    super()
    this.devtool = 'unknown'
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = '<slot></slot>'
  }

  connectedCallback () {
    this.ensureId()
    this.dataset.elementOrigin = 'hopsoft/reflex_behaviors'
  }

  ensureId () {
    if (this.id.trim().length) return
    this.id = `${this.tagName}-${this.uuidv4()}`.toLowerCase()
  }

  // SEE: https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
  uuidv4 () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    )
  }

  get viewStack () {
    if (!this.dataset.viewStack) return []
    return JSON.parse(this.dataset.viewStack)
  }

  get partial () {
    return this.viewStack[0]
  }
}
