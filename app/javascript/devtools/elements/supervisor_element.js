import { appendHTML } from '../../dom'

export default class SupervisorElement extends HTMLElement {
  constructor () {
    super()
    this.enabledDevtools = {}
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = this.html
    this.shadowRoot
      .querySelector('button[data-role="closer"]')
      .addEventListener('click', () => this.close())

    this.addEventListener('change', event => {
      const devtoolElement = event.target
      const { checked, name } = devtoolElement
      checked ? this.enableDevtool(name) : this.disableDevtool(name)
    })
  }

  enableDevtool (name) {
    if (this.enabledDevtools[name]) return
    this.enabledDevtools[name] = true
    this.dispatchEvent(
      new CustomEvent('reflex-behaviors:devtool-enable', {
        bubbles: true,
        detail: { name: name }
      })
    )
  }

  disableDevtool (name) {
    if (!this.enabledDevtools[name]) return
    delete this.enabledDevtools[name]
    this.dispatchEvent(
      new CustomEvent('reflex-behaviors:devtool-disable', {
        bubbles: true,
        detail: { name: name }
      })
    )
  }

  close () {
    this.devtoolElements.forEach(el => {
      if (el.checked) el.click()
    })
    this.remove()
  }

  get devtoolElements () {
    return this.querySelectorAll('[slot="devtool"]')
  }

  get closeElement () {
    return this.querySelector('button[data-role="closer"]')
  }

  get html () {
    return `
      <style>${this.stylesheet}</style>
      <div data-role="container">
        <strong>ReflexBehaviors</strong>
        <slot name="devtool"></slot>
        <button data-role='closer'>X</button>
      </div>
    `
  }

  get stylesheet () {
    return `
      :host {
        background-color: ghostwhite;
        border-radius: 10px;
        outline: solid 1px gainsboro;
        bottom: 20px;
        display: block;
        filter: drop-shadow(0 4px 3px rgba(0,0,0,.07));
        left: 50%;
        padding: 5px 10px;
        position: fixed;
        transform: translateX(-50%);
        z-index: 10000;
      }

      :host, :host * {
        -webkit-user-select: none;
        user-select: none;
      }

      strong {
        color: silver;
        font-weight: 600;
      }

      div[data-role="container"] {
        display: flex;
        gap: 0 5px;
      }

      button[data-role="closer"] {
        border: none;
        background-color: gainsboro;
        border-radius: 50%;
        color: white;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        margin: 0 -5px 0 10px;
        padding: 0 3px;
        width: 18px;
      }
    `
  }
}
