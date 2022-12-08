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
      <div>
        <slot name="title"></slot>
        <slot name="content"></slot>
        <ol>
          <slot name="li-top"></slot>
          <slot name="li-bottom"></slot>
        </ol>
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

      div {
        background-color: ${this.backgroundColor};
        border-radius: 15px;
        filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.3));
        font-family: monospace;
        min-height: 30px;
        min-width: 100px;
        opacity: 0.9;
        outline-offset: 1px;
        outline: dashed 3px ${this.color};
        padding: 8px 12px 8px 12px;
        position: relative;
        white-space: nowrap;
      }

      slot[name="title"] {
        border-bottom: dotted 1px ${this.color};
        color: ${this.color};
        display: inline-block;
        font-weight: bold;
        margin-bottom: 8px;
        padding-bottom: 8px;
        width: 100%;
      }

      slot[name="li-top"] {
        color: red;
        font-weight: normal;
        opacity: 0.7;
      }

      slot[name="content"],
      slot[name="li-bottom"] {
        color: ${this.color};
        font-weight: normal;
        opacity: 0.7;
      }
    `
  }
}
