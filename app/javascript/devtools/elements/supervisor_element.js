import { appendHTML } from '../../utils/dom'

export default class SupervisorElement extends HTMLElement {
  constructor () {
    super()
    this.enabledDevtools = {}
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = this.html
    this.shadowRoot.querySelector('button').addEventListener('click', () =>
      this.dispatchEvent(
        new CustomEvent('turbo-boost:devtools-close', {
          bubbles: true
        })
      )
    )

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
      new CustomEvent('turbo-boost:devtool-enable', {
        bubbles: true,
        detail: { name: name }
      })
    )
  }

  disableDevtool (name) {
    if (!this.enabledDevtools[name]) return
    delete this.enabledDevtools[name]
    this.dispatchEvent(
      new CustomEvent('turbo-boost:devtool-disable', {
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
        <img src="https://ik.imagekit.io/hopsoft/turbo-boost-logo_zHiiimlvT.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1671722004342">
        <slot name="devtool"></slot>
        <button>✕</button>
      </div>
    `
  }

  get stylesheet () {
    return `
      :host {
        background-color: gainsboro;
        border-radius: 5px;
        bottom: 20px;
        display: block;
        filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.3));
        left: 50%;
        outline-offset: 1px;
        outline: solid 2px black;
        padding: 5px 10px;
        position: fixed;
        transform: translateX(-50%);
        z-index: 8999;
      }

      * {
        -webkit-user-select: none;
        font-family: helvetica, sans-serif;
        font-size: 1rem;
        user-select: none;
      }

      img {
        align-self: center;
        cursor: grab;
        height: 25px;
        margin-left: -5px;
        vertical-align: middle;
      }

      div {
        display: flex;
        gap: 0 5px;
        position: relative;
      }

      [slot="devtool"] {
        align-self: center;
      }

      button {
        align-self: center;
        background-color: darkgray;
        border-radius: 50%;
        border: none;
        color: black;
        cursor: pointer;
        font-size: 10px;
        height: 18px;
        line-height: 18px;
        margin-right: -5px;
        opacity: 0.5;
        outline: solid 1px black;
        padding: 0 2px;
        width: 18px;
      }

      button:hover {
        opacity: 1;
      }
    `
  }
}
