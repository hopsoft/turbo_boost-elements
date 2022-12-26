export default class TooltipElement extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = this.html
  }

  get color () {
    return this.getAttribute('color') || 'darkslategray'
  }

  get backgroundColor () {
    return this.getAttribute('background-color') || 'gainsboro'
  }

  get position () {
    return this.getAttribute('position') || 'top'
  }

  get html () {
    return `
      <style>${this.stylesheet}</style>
      <div role="container">
        <div role="title">
          <slot name="title"></slot>
          <img src="https://ik.imagekit.io/hopsoft/turbo-boost-logo_zHiiimlvT.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1671722004342">
        </div>
        <slot name="subtitle"></slot>
        <slot name="content-top"></slot>
        <slot name="content"></slot>
        <slot name="content-bottom"></slot>
      </div>
    `
  }

  get stylesheet () {
    return `
      :host {
        display: block;
        position: absolute;
        z-index: 8999;
      }

      * {
        color: ${this.color}
        font-size: 1rem;
      }

      [role="container"] {
        background-color: ${this.backgroundColor};
        border-radius: 15px;
        filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.3));
        font-family: monospace;
        min-height: 30px;
        min-width: 100px;
        opacity: 0.9;
        outline-offset: 1px;
        outline: dashed 3px ${this.color};
        padding: 12px;
        position: relative;
        white-space: nowrap;
      }

      [role="title"] {
        display: flex;
      }

      [role="title"] slot[name="title"] {
        color: ${this.color};
        display: block;
        flex-grow: 1;
        font-weight: bold;
      }

      [role="title"] img {
        height: 25px;
        vertical-align: middle;
      }

      slot[name="subtitle"] {
        border-bottom: dotted 1px ${this.color};
        border-top: dotted 1px ${this.color};
        color: ${this.color};
        display: block;
        font-size: 0.8rem;
        font-weight: lighter;
        margin-bottom: 8px;
        margin-top: 4px;
        padding-bottom: 4px;
        padding-top: 4px;
        width: 100%;
      }

      slot[name="content-top"] {
        color: ${this.color};
        font-weight: normal;
        opacity: 0.7;
      }

      slot[name="content"] {
        color: ${this.color};
        font-weight: normal;
        opacity: 0.7;
      }

      slot[name="content-bottom"] {
        color: red;
        font-weight: normal;
        opacity: 0.7;
      }
    `
  }
}
