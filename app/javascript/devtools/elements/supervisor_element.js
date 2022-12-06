import { appendHTML } from '../dom'

export default class SupervisorElement extends HTMLElement {
  constructor () {
    super()
    this.enabledDevtools = {}
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = this.html
    this.shadowRoot
      .querySelector('button')
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
      if (el.checked) el.uncheck()
    })
    this.remove()
  }

  get devtoolElements () {
    return this.querySelectorAll('[slot="devtool"]')
  }

  get closeElement () {
    return this.querySelector('button')
  }

  get html () {
    return `
      <style>${this.stylesheet}</style>
      <div>
        <label>ReflexBehaviors</label>
        <slot name="devtool"></slot>
        <button>X</button>
      </div>
    `
  }

  get stylesheet () {
    return `
      :host {
        background-color: lavender;
        border-radius: 15px;
        bottom: 20px;
        display: block;
        filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.3));
        left: 50%;
        outline-offset: 1px;
        outline: solid 3px indigo;
        padding: 5px 10px;
        position: fixed;
        transform: translateX(-50%);
        z-index: 100000;
      }

      :host, :host * {
        -webkit-user-select: none;
        font-family: helvetica, sans-serif;
        user-select: none;
      }

      :host:has( input) {
        outline-color: red;
        outline-width: 2px;
      }

      label {
        color: indigo;
        opacity: 0.5;
      }

      div {
        display: flex;
        gap: 0 5px;
        position: relative;
      }

      button {
        background-color: thistle;
        border-radius: 50%;
        border: none;
        color: indigo;
        cursor: pointer;
        font-size: 10px;
        height: 18px;
        line-height: 18px;
        margin: 0 -5px 0 10px;
        outline: solid 1px indigo;
        padding: 0 2px;
        position: relative;
        top: 1px;
        width: 18px;
      }

      button:hover {
        outline-width: 2px;
      }
    `
  }
}
