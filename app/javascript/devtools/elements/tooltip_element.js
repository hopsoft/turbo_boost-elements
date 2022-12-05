export default class TooltipElement extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = this.html
  }

  get color () {
    return this.getAttribute('color') || 'darkslategray'
  }

  get emphasisColor () {
    return this.getAttribute('emphasis-color') || 'black'
  }

  get backgroundColor () {
    return this.getAttribute('background-color') || 'gainsboro'
  }

  get position () {
    return this.getAttribute('position') || 'top'
  }

  get cssArrow () {
    switch (this.position) {
      case 'bottom':
        return `transparent transparent ${this.emphasisColor} transparent`
      default:
        return `${this.emphasisColor} transparent transparent transparent;`
    }
  }

  get html () {
    return `
      <style>${this.stylesheet}</style>
      <div role="tooltip">
        <slot name="title"></slot>
        <hr>
        <slot name="normal"></slot>
        <slot name="emphasis"></slot>
      </div>
    `
  }

  get stylesheet () {
    return `
      :host {
        display: block;
        position: absolute;
        z-index: 10000;
      }

      * {
        color: ${this.color}
      }

      [role="tooltip"] {
        background-color: ${this.backgroundColor};
        border-radius: 5px;
        filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.3));
        font-family: monospace;
        left: 50px;
        min-height: 30px;
        min-width: 100px;
        opacity: 0.9;
        outline: solid 2px ${this.emphasisColor};
        padding: 8px 12px 8px 12px;
        white-space: nowrap;
      }

      [role="tooltip"]::after {
        border-color: ${this.cssArrow};
        border-style: solid;
        border-width: 5px;
        content: "";
        margin-left: -5px;
        position: absolute;
        top: ${this.position === 'bottom' ? '-10px' : '100%'};
      }

      slot[name="title"] {
        color: ${this.emphasisColor};
        font-weight: bold;
      }

      slot[name="emphasis"] {
        color: ${this.emphasisColor};
        font-weight: normal;
        opacity: 0.7;
      }

      hr {
        background-color: ${this.emphasisColor};
        border: none;
        height: 1px;
        margin-bottom: 4px;
        margin-top: 4px;
        opacity: 0.3;
      }
    `
  }
}
